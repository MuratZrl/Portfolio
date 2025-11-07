// src/features/about/types/faq.ts

/** Category tabs for the FAQ section. */
export type FaqCategory = "General" | "Process" | "Quality" | "Technical" | "Delivery";

/** One question–answer pair in the FAQ. */
export type QA = {
  question: string;
  answer: string;
  category: FaqCategory;
  /** Optional stable id; component slugify edebilir. */
  id?: string;
};
