"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { getTheme, cn } from "@/lib/themeMapping";

export default function Footer() {
  const { activeTheme } = useTheme();
  const theme = getTheme(activeTheme);

  return (
    <footer className={cn("w-full mt-auto py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 transition-colors duration-500", theme.classes.surfaceAlt)}>
      <div className={cn("text-lg", theme.classes.navLogo)}>Memento</div>
      <div className="flex gap-8">
        <Link className={cn("font-label text-sm uppercase tracking-[0.2em] transition-all", theme.classes.navLink)} href="#">Privacy Policy</Link>
        <Link className={cn("font-label text-sm uppercase tracking-[0.2em] transition-all", theme.classes.navLink)} href="#">Contact Us</Link>
        <Link className={cn("font-label text-sm uppercase tracking-[0.2em] transition-all", theme.classes.navLink)} href="#">Terms of Service</Link>
      </div>
      <div className={cn("font-label text-sm uppercase tracking-[0.2em]", theme.classes.textMuted)}>
        &copy; 2024 Memento Digital Atelier
      </div>
    </footer>
  );
}
