// src/features/about/data/testimonials.ts
import type { Testimonial } from "@/features/about/types";

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "t1",
    name: "A. Yılmaz",
    role: "Product Owner",
    company: "Acme",
    companyLogo: { src: "/images/logos/acme.svg", alt: "Acme" },
    avatar: { src: "/images/avatars/ayilmaz.jpg", alt: "A. Yılmaz" },
    quote:
      "Kept the scope lean and delivered clearly. It’s the first time I’ve seen performance and accessibility metrics tracked this transparently.",
    rating: 5,
    link: { href: "https://www.linkedin.com/", label: "Source", ariaLabel: "LinkedIn reference" },
  },
  {
    id: "t2",
    name: "B. Demir",
    role: "Tech Lead",
    company: "Zenware",
    companyLogo: { src: "/images/logos/zenware.svg", alt: "Zenware" },
    avatar: { src: "/images/avatars/bdemir.jpg", alt: "B. Demir" },
    quote:
      "The component architecture reduced maintenance costs long term. PRs were small and reviews were fast.",
    rating: 5,
  },
  {
    id: "t3",
    name: "C. Kaya",
    role: "Marketing",
    company: "Northwind",
    avatar: { src: "/images/avatars/ckaya.jpg", alt: "C. Kaya" },
    quote:
      "We hit our SEO and LCP targets. The edge-first strategy made release smooth.",
    rating: 4,
  },
] as const;
