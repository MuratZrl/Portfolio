// src/features/contact/schema.ts
import { z } from "zod";

export const SUBJECTS = ["general", "project", "hiring"] as const;
export type Subject = typeof SUBJECTS[number];

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(80, { message: "Name is too long" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(120, { message: "Email is too long" }),

  // Burada asıl düzeltme: as const + { message }
  subject: z.enum(SUBJECTS, { message: "Invalid subject" }),

  message: z
    .string()
    .min(12, { message: "Message should be at least 12 characters" })
    .max(2000, { message: "Message is too long" }),
  company: z.string().optional(), // honeypot
});

export type ContactInput = z.infer<typeof ContactSchema>;
