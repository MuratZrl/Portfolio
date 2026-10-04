// src/app/api/contact/route.ts
import { NextResponse, type NextRequest } from "next/server";

import { resolveIp, submitContact } from "@/features/contact/submit";

export const runtime = "nodejs";

type OkPayload = { ok: true };

/**
 * The JS path, and now the only thing this route serves: JSON in, JSON out.
 * ContactForm's fetch call is unchanged, and so are the status codes and
 * payload shapes it reads.
 *
 * It used to carry a second path as well. A native form POST arrives
 * urlencoded, and a browser doing one cannot read a JSON body, it renders it
 * as text on a blank page; so a form-encoded request was answered with a 303
 * back to /contact?sent=1 or ?error=<code>. That is gone. The no-JS path is a
 * Server Action (src/features/contact/actions.ts), which renders its result
 * into the page directly, so there is no redirect, no query parameter, and
 * nothing left to force /contact to render dynamically.
 *
 * Both paths still run the same validation, honeypot and rate limiting:
 * submitContact is the shared half.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    // Left null. submitContact answers it as "badrequest", after the rate
    // limiter, so a flood of unparseable posts is throttled too.
  }

  const ip = resolveIp(req.headers.get("x-forwarded-for"), req.headers.get("x-real-ip"));
  const outcome = await submitContact(body, ip);

  if (!outcome.ok) {
    return NextResponse.json(outcome.payload, { status: outcome.status });
  }
  return NextResponse.json({ ok: true } satisfies OkPayload, { status: 200 });
}
