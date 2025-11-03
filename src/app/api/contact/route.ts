import { NextResponse } from "next/server";
import { ContactSchema } from "@/features/contact/schema";
import { createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs"; // service role için Node runtime

// Basit rate limit (in-memory)
type Bucket = { count: number; resetAt: number };
const RATE = { windowMs: 60_000, max: 5 };
const rlStore: Map<string, Bucket> = (globalThis).__contactRL ?? new Map();
(globalThis as any).__contactRL = rlStore;

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}
function rateLimitOk(req: Request): boolean {
  const ip = getClientIp(req);
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

const WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL; // optional

export async function POST(req: Request): Promise<NextResponse> {
  try {
    if (!rateLimitOk(req)) {
      return NextResponse.json({ message: "Too many requests" }, { status: 429 });
    }

    const json = await req.json();
    const parsed = ContactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { company, name, email, subject, message } = parsed.data;

    // Honeypot
    if (company && company.trim().length > 0) {
      return NextResponse.json({ message: "Spam detected" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const ua = req.headers.get("user-agent") ?? null;

    const supabase = createServerClient();
    const { error } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        subject,
        message,
        ip: ip !== "unknown" ? ip : null,
        user_agent: ua,
        is_spam: false,
        meta: null,
      });

    if (error) {
      console.error("[contact] supabase insert error:", error);
      return NextResponse.json({ message: "Database error" }, { status: 502 });
    }

    // Opsiyonel: webhook bildirimi (Discord/Slack vb.)
    if (WEBHOOK_URL) {
      // İnsan gibi kısa bir text
      const text = [
        `📩 New contact message`,
        `• Name: ${name}`,
        `• Email: ${email}`,
        `• Subject: ${subject}`,
        ``,
        message.length > 500 ? message.slice(0, 500) + " …" : message,
      ].join("\n");

      // Discord/Slack tek satır JSON text’i yutar
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
      } catch (e) {
        console.warn("[contact] webhook failed:", e);
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] server error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
