// src/constants/contact.ts
//
// The one phone number the Turkish pages call to action with, and the single
// builder for its wa.me links. It lived inside the Packages section until
// /ornekler needed the same number and the same CTA at the foot of its page;
// copying either would have left two places to edit when the number changes.

/**
 * `e164` is digits only, country code first, no plus and no spaces, which is
 * the form wa.me expects in the URL path. `display` is the printed form of
 * that same number and the only thing a reader ever sees.
 */
export const CONTACT_PHONE = {
  e164: "905416577925",
  display: "+90 541 657 79 25",
} as const;

/** `message` is prefilled into the chat and URL-encoded here, not at the call site. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${CONTACT_PHONE.e164}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:+${CONTACT_PHONE.e164}`;
}

/** Appended as sr-only text on every link that opens a new tab. */
export const NEW_TAB_NOTE = "yeni sekmede açılır";
