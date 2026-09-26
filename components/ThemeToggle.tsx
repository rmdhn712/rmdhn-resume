"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="focus-ring w-9 h-9 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 hover:border-accent transition-colors"
    >
      {isDark ? (
        <Sun size={16} className="text-accent" aria-hidden="true" />
      ) : (
        <Moon size={16} className="text-accent" aria-hidden="true" />
      )}
    </button>
  );
}
