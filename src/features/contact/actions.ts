// src/features/contact/actions.ts
"use server";

import { headers } from "next/headers";

import { resolveIp, submitContact, type ErrorCode } from "@/features/contact/submit";
import type { ContactFormState } from "@/features/contact/form-state";

/**
 * Result copy for the no-JS path, moved here from src/app/contact/page.tsx.
 * It used to be keyed off a ?error=<code> query parameter the page read
 * server-side, which is what kept /contact out of static rendering. The codes
 * survive as the Outcome discriminant; only the lookup moved.
 *
 * The JS path never reaches any of this. It renders its own status from the
 * route handler's JSON, and both sets of wording are left exactly as they
 * were rather than merged, so neither path's copy changes.
 *
 * Not exported: a "use server" module may only export async functions. The
 * state type and its initial value live in ./form-state for the same reason.
 */
const ERROR_COPY: Record<ErrorCode, string> = {
  rate: "Too many messages from this connection. Wait a minute, then try again.",
  badrequest: "That submission could not be read. Please try again.",
  invalid:
    "Some fields need another look. Every field is required, and the message needs at least 12 characters.",
  spam: "That submission was flagged as automated.",
  send: "The message could not be sent. You can email me directly at me@muratzorlu.dev.",
};

/**
 * Progressive-enhancement submit target. Replaces the old arrangement where
 * the form's `action` attribute pointed at /api/contact and the handler
 * answered a native POST with a 303 to /contact?sent=1.
 *
 * Nothing is redirected now, so there is no query parameter for the page to
 * read and no reason for it to be dynamic. The POST response is the page
 * re-rendered with this state, which also keeps the property the 303 was
 * there to provide: the visitor's URL stays a plain /contact, so reloading
 * afterwards does not resubmit the message.
 */
export async function contactFormAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const h = await headers();
  const ip = resolveIp(h.get("x-forwarded-for"), h.get("x-real-ip"));

  const outcome = await submitContact(Object.fromEntries(formData), ip);

  if (outcome.ok) return { status: "success" };
  return { status: "error", message: ERROR_COPY[outcome.code] ?? ERROR_COPY.badrequest };
}
