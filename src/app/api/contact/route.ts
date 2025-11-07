// src/app/api/contact/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { ContactSchema } from "@/features/contact/schema";
import { createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs"; // service role için Node runtime

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

/* --------------------------------- Types --------------------------------- */

type FieldKey = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldKey, string>>;

type OkPayload = { ok: true };
type ErrorPayload =
  | { message: "Invalid JSON" | "Too many requests" | "Spam detected" | "Database error" }
  | { message: "Invalid payload"; issues: unknown }
  | { message: "Validation error"; fieldErrors: FieldErrors };

/* --------------------------------- Route --------------------------------- */

export async function POST(req: NextRequest): Promise<NextResponse<OkPayload | ErrorPayload>> {
  // rate limit
  if (!rateLimitOk(req)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  // json parse
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  // zod validate
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

  // Normalize (DB'deki email/message check'lerine takılmamak için)
  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject,
    message: message.trim(),
  };

  // Insert
  const supabase = createServerClient(); // server-side, service role key ile
  const { error } = await supabase.from("contacts").insert(payload);

  if (error) {
    const blob = `${error.message ?? ""} ${error.details ?? ""}`;

    if (error.code === "23514") {
      const fieldErrors: FieldErrors = {};
      if (blob.includes("contacts_email_check")) {
        fieldErrors.email = "Please enter a valid email address.";
      }
      if (blob.includes("contacts_message_check")) {
        fieldErrors.message = "Message must be 2000 characters or fewer.";
      }
      if (blob.includes("contacts_subject_check")) {
        fieldErrors.subject = "Invalid subject value.";
      }
      if (Object.keys(fieldErrors).length > 0) {
        return NextResponse.json(
          { message: "Validation error", fieldErrors },
          { status: 422 }
        );
      }
    }

    console.error("[contact] insert error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return NextResponse.json({ message: "Database error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
