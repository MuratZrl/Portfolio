// src/features/contact/form-state.ts
//
// The useActionState shape, kept out of actions.ts deliberately. A "use server"
// module may only export async functions: exporting this object from there
// passes lint, tsc and the build, then throws "A 'use server' file can only
// export async functions, found object" on the first request that evaluates
// the module. Types are erased and would have been fine; the constant is not.

/**
 * What useActionState holds. "idle" is the prerendered state and the only one
 * a visitor with JS ever sees: React skips a form action when the submit
 * handler has already called preventDefault, which react-hook-form does on
 * every submit. Without JS there is no handler, the browser POSTs the form
 * natively, and the outcome is rendered into the response.
 */
export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export const CONTACT_FORM_INITIAL_STATE: ContactFormState = { status: "idle" };
