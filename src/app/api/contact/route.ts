// src/app/api/contact/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { ContactSchema } from "@/features/contact/schema";

export const runtime = "nodejs";

/* ------------------------------ Rate limiting ----------------------------- */

type Bucket = { count: number; resetAt: number };
const RATE = { windowMs: 60_000, max: 5 };

declare global {
  var __contactRL: Map<string, Bucket> | undefined;
}

const rlStore: Map<string, Bucket> =
  (globalThis as unknown as { __contactRL?: Map<string, Bucket> }).__contactRL ??
  new Map<string, Bucket>();

(globalThis as unknown as { __contactRL: Map<string, Bucket> }).__contactRL = rlStore;

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimitOk(req: NextRequest): boolean {
  const ip = getIp(req);
  const now = Date.now();
  const b = rlStore.get(ip);
  if (!b || now > b.resetAt) {
    rlStore.set(ip, { count: 1, resetAt: now + RATE.windowMs });
    return true;
  }
  if (b.count < RATE.max) {
    b.count += 1;
    return true;
  }
  return false;
}

/* --------------------------------- Helpers -------------------------------- */

const SUBJECT_LABELS: Record<"general" | "project" | "hiring", string> = {
  general: "General",
  project: "Project",
  hiring: "Hiring",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(args: {
  name: string;
  email: string;
  subjectLabel: string;
  message: string;
}): { html: string; text: string } {
  const { name, email, subjectLabel, message } = args;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subjectLabel);
  const safeMessageHtml = escapeHtml(message).replace(/\n/g, "<br>");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#111;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
      <tr>
        <td style="padding:20px 24px;background:#0ea5e9;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">New contact message</div>
          <div style="font-size:18px;font-weight:600;margin-top:4px;">${safeSubject}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;line-height:1.5;">
            <tr>
              <td style="padding:6px 0;color:#666;width:80px;">From</td>
              <td style="padding:6px 0;color:#111;font-weight:500;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#666;">Email</td>
              <td style="padding:6px 0;"><a href="mailto:${safeEmail}" style="color:#0ea5e9;text-decoration:none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#666;">Subject</td>
              <td style="padding:6px 0;color:#111;">${safeSubject}</td>
            </tr>
          </table>
          <div style="margin:20px 0 8px;height:1px;background:#e5e5e5;"></div>
          <div style="font-size:12px;color:#666;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:8px;">Message</div>
          <div style="font-size:14px;line-height:1.6;color:#111;">${safeMessageHtml}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 24px;background:#fafafa;border-top:1px solid #e5e5e5;font-size:11px;color:#888;">
          Sent from muratzorlu.dev — reply directly to respond to ${safeName}.
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `New contact message — ${subjectLabel}`,
    ``,
    `From:    ${name}`,
    `Email:   ${email}`,
    `Subject: ${subjectLabel}`,
    ``,
    `Message:`,
    `--------`,
    message,
    ``,
    `--`,
    `Sent from muratzorlu.dev`,
  ].join("\n");

  return { html, text };
}

/* --------------------------------- Types --------------------------------- */

type OkPayload = { ok: true };
type ErrorPayload =
  | { message: "Invalid JSON" | "Too many requests" | "Spam detected" | "Failed to send message" }
  | { message: "Invalid payload"; issues: unknown };

/* --------------------------------- Route --------------------------------- */

export async function POST(req: NextRequest): Promise<NextResponse<OkPayload | ErrorPayload>> {
  if (!rateLimitOk(req)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { company, name, email, subject, message } = parsed.data;

  if (company && company.trim().length > 0) {
    return NextResponse.json({ message: "Spam detected" }, { status: 400 });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanMessage = message.trim();
  const subjectLabel = SUBJECT_LABELS[subject];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; cannot send email");
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }

  const { html, text } = buildEmail({
    name: cleanName,
    email: cleanEmail,
    subjectLabel,
    message: cleanMessage,
  });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <contact@muratzorlu.dev>",
      to: "me@muratzorlu.dev",
      replyTo: cleanEmail,
      subject: `[Portfolio] ${subjectLabel} — ${cleanName}`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] resend send error:", error);
      return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
    }
  } catch (err) {
    console.error("[contact] resend exception:", err);
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
