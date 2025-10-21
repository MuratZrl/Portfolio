// src/app/page.tsx
import Hero from "@/features/home/sections/Hero";

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Hero
        title={`Murat Zorlu
Fullstack Web Developer`}
        subtitle="Next.js + TypeScript + Shadcn UI ile hızlı, sürdürülebilir web projeleri."
        primary={{ href: "/about", label: "About" }}
        secondary={{ href: "/projects", label: "Projects" }}
      />
      {/* Sonraki section'lar buraya eklenecek */}
    </>
  );
}
