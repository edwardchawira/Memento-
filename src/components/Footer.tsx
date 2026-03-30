"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { getTheme, cn } from "@/lib/themeMapping";

export default function Footer() {
  const { activeTheme } = useTheme();
  const theme = getTheme(activeTheme);

  // Stitch "Memento Summit" footer — exact replica from Conference Host Dashboard / Guest Invite exports
  if (activeTheme === "CONFERENCE") {
    return (
      <footer className="w-full border-t border-[#434656]/15 bg-[#060e20]">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 w-full max-w-[1440px] mx-auto gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-black text-[#dae2fd] text-xl" style={{ fontFamily: "'Inter', sans-serif" }}>Memento</span>
            <p className="text-sm text-[#dae2fd]/50" style={{ fontFamily: "'Manrope', sans-serif" }}>
              © 2024 Memento Conference. Architectural Precision.
            </p>
          </div>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Contact", "Press Kit"].map((label) => (
              <Link
                key={label}
                className="text-sm text-[#dae2fd]/40 hover:text-[#4edea3] transition-colors"
                style={{ fontFamily: "'Manrope', sans-serif" }}
                href="#"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    );
  }

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
