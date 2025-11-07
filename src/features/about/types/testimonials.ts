// src/features/about/types/testimonials.ts

export type TestimonialLink = {
  href: string;    // external or internal
  label?: string;
  ariaLabel?: string;
};

export type CompanyLogo = {
  src: string;     // /public/... path or full URL
  alt: string;
  width?: number;  // default 80
  height?: number; // default 24
};

export type Rating = 1 | 2 | 3 | 4 | 5;

export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  companyLogo?: CompanyLogo;
  avatar?: { src: string; alt?: string };
  quote: string;
  rating?: Rating;
  link?: TestimonialLink; // LinkedIn, case study, etc.
};
