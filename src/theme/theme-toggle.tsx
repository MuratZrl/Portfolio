// src/components/theme-toggle.tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle(): React.JSX.Element | null {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // SSR hydration sapıtmasın

  const isDark = resolvedTheme === "dark";

  function handleToggle(): void {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Temayı değiştir"
      onClick={handleToggle}
    >
      {/* Işık ve karanlık ikonlarını CSS ile çapraz göster */}
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Temayı değiştir</span>
    </Button>
  );
}
