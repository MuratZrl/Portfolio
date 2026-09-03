// src/features/home/types/final-cta.ts

/** Internal route ("/contact"), or an absolute URL when `external` is set. */
export type Href = "/" | `/${string}`;

export type CtaLink = {
  href: string;
  label: string;
  ariaLabel?: string;
  /** Absolute URL, opened in a new tab (the WhatsApp deep link). */
  external?: boolean;
};

export type CtaStep = {
  label: string;
  description: string;
};

export type FinalCtaProps = {
  /** Stable anchor id, so old in-page links keep working. */
  id?: string;
  badge: string;
  heading: string;
  subheading: string;
  /** Exactly three; the icons are fixed in the component. */
  steps: readonly [CtaStep, CtaStep, CtaStep];
  primary: CtaLink;
  className?: string;
};
