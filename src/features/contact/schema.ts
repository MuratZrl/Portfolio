// src/features/contact/schema.ts
import { z } from "zod";

export const SUBJECTS = ["general", "project", "hiring"] as const;
export type Subject = typeof SUBJECTS[number];

/** Hidden field so the no-JS redirect lands on the locale the form came from. */
export const LOCALES = ["tr", "en"] as const;

/**
 * Validation messages for the client-side schema. The server never shows a
 * message to a visitor (it answers with a status and a short code), so it
 * builds the schema without them.
 */
export type ContactMessages = {
  nameMin: string;
  nameMax: string;
  emailInvalid: string;
  emailMax: string;
  subjectInvalid: string;
  messageMin: string;
  messageMax: string;
};

export function createContactSchema(m?: ContactMessages) {
  return z.object({
    name: z.string().trim().min(2, { message: m?.nameMin }).max(80, { message: m?.nameMax }),
    email: z.string().trim().email({ message: m?.emailInvalid }).max(120, { message: m?.emailMax }),
    subject: z.enum(SUBJECTS, { message: m?.subjectInvalid }),
    message: z.string().trim().min(12, { message: m?.messageMin }).max(2000, { message: m?.messageMax }),

    company: z.string().optional(), // honeypot
    locale: z.enum(LOCALES).optional(),
  });
}

export const ContactSchema = createContactSchema();

export type ContactInput = z.infer<typeof ContactSchema>;
