"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { getTheme, cn } from "@/lib/themeMapping";

export default function NavBar() {
  const pathname = usePathname();
  const { activeTheme } = useTheme();
  const theme = getTheme(activeTheme);

  // Stitch "Memento Summit" nav — exact replica of Conference Host Dashboard / Guest Invite exports
  if (activeTheme === "CONFERENCE") {
    return (
      <nav className="fixed top-0 w-full z-50 bg-[#0b1326]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(6,14,32,0.4)]">
        <div className="flex justify-between items-center px-8 h-20 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-black tracking-tighter text-[#dae2fd] no-underline" style={{ fontFamily: "'Inter', sans-serif" }}>
              Memento
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              {[
                { href: "/", label: "Schedule" },
                { href: "/invite", label: "Speakers" },
                { href: "/booklet", label: "Partners" },
                { href: "/dashboard", label: "Dashboard" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "font-bold tracking-tight uppercase text-xs transition-colors pb-1",
                    pathname === href
                      ? "text-[#b8c3ff] border-b-2 border-[#2e5bff]"
                      : "text-[#dae2fd]/60 hover:text-[#dae2fd]"
                  )}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-[#dae2fd]/60 hover:text-[#dae2fd] transition-colors cursor-pointer text-2xl">
              account_circle
            </span>
            <button className="bg-[#2e5bff] text-[#efefff] px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-sm active:scale-95 duration-200 border-none cursor-pointer" style={{ fontFamily: "'Inter', sans-serif" }}>
              Register Now
            </button>
          </div>
        </div>
      </nav>
    );
  }

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
