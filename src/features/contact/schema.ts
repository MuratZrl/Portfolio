// src/features/contact/schema.ts
import { z } from "zod";

export const SUBJECTS = ["general", "project", "hiring"] as const;
export type Subject = typeof SUBJECTS[number];

export const ContactSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(80),
  email: z.string().trim().email().max(120, { message: "Email is too long" }),
  // Burada asıl düzeltme: as const + { message }
  subject: z.enum(SUBJECTS, { message: "Invalid subject" }),
  message: z.string().trim().min(12).max(2000),

  company: z.string().optional(), // honeypot
});

export type ContactInput = z.infer<typeof ContactSchema>;
