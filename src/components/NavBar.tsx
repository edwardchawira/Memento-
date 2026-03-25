"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { getTheme, cn } from "@/lib/themeMapping";

export default function NavBar() {
  const pathname = usePathname();
  const { activeTheme } = useTheme();
  const theme = getTheme(activeTheme);

  return (
    <nav className={cn("fixed top-0 w-full z-50 backdrop-blur-md flex justify-between items-center px-8 py-6 max-w-full mx-auto transition-colors duration-500", theme.classes.nav)}>
      <Link href="/" className={cn("text-2xl no-underline", theme.classes.navLogo)}>
        Memento
      </Link>
      <div className="hidden md:flex gap-10">
        <Link 
          href="/" 
          className={cn("font-label text-sm uppercase tracking-[0.2em] transition-colors", pathname === "/" ? cn("border-b pb-1", theme.classes.navLinkActive) : theme.classes.navLink)}
        >
          Create Event
        </Link>
        <Link 
          href="/dashboard" 
          className={cn("font-label text-sm uppercase tracking-[0.2em] transition-colors", pathname === "/dashboard" ? cn("border-b pb-1", theme.classes.navLinkActive) : theme.classes.navLink)}
        >
          Dashboard
        </Link>
        <Link 
          href="/booklet" 
          className={cn("font-label text-sm uppercase tracking-[0.2em] transition-colors", pathname === "/booklet" ? cn("border-b pb-1", theme.classes.navLinkActive) : theme.classes.navLink)}
        >
          Gallery
        </Link>
        <Link 
          href="/invite" 
          className={cn("font-label text-sm uppercase tracking-[0.2em] transition-colors", pathname === "/invite" ? cn("border-b pb-1", theme.classes.navLinkActive) : theme.classes.navLink)}
        >
          RSVP
        </Link>
      </div>
      <div className={cn("flex items-center gap-4", theme.classes.primaryText)}>
        <span className="material-symbols-outlined cursor-pointer hover:opacity-80 transition-opacity">account_circle</span>
      </div>
    </nav>
  );
}
