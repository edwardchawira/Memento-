import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ThemeType = 'ATELIER' | 'CONFERENCE' | 'JUBILEE' | 'REVEAL';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const themeDefinitions: Record<ThemeType, any> = {
  ATELIER: {
    fontUrl: "https://fonts.googleapis.com/css2?family=Manrope:wght@300..700&family=Noto+Serif:ital,wght@0,400..700;1,400..700&display=swap",
    fontHeadline: "font-serif",
    fontBody: "font-sans",
    uiShape: "rounded-sm",
    classes: {
      body: "bg-[#fbf9f2] text-[#70615c]",
      nav: "bg-[#fbf9f2]/80 shadow-[#1b1c18]/5",
      navLogo: "text-[#735c00] italic font-serif",
      navLink: "text-[#70615c] hover:text-[#735c00]",
      navLinkActive: "text-[#735c00] border-[#d4af37]/40",
      primaryText: "text-[#735c00]",
      heroPrimaryBtn: "bg-gradient-to-br from-[#735c00] to-[#d4af37] text-white font-label",
      surface: "bg-[#fbf9f2]",
      surfaceAlt: "bg-[#f1efe6]",
      borderAccent: "border-[#d4af37]/40",
      hotspotIcon: "text-[#735c00]",
      hotspotContainer: "bg-white/20 border-white/40 group-hover:bg-white group-hover:text-[#735c00]"
    }
  },
  CONFERENCE: {
    fontUrl: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    fontHeadline: "font-sans font-bold",
    fontBody: "font-sans",
    uiShape: "rounded-md",
    classes: {
      body: "bg-[#0b1326] text-slate-300",
      nav: "bg-[#0b1326]/90 border-b border-[#2e5bff]/20 shadow-none",
      navLogo: "text-[#2e5bff] font-sans font-bold uppercase tracking-widest",
      navLink: "text-slate-400 hover:text-white",
      navLinkActive: "text-white border-[#2e5bff]",
      primaryText: "text-[#2e5bff]",
      heroPrimaryBtn: "bg-[#2e5bff] hover:bg-blue-600 text-white font-sans font-semibold tracking-wide",
      surface: "bg-[#131d38]",
      surfaceAlt: "bg-[#0b1326]",
      borderAccent: "border-[#2e5bff]/40",
      hotspotIcon: "text-[#2e5bff]",
      hotspotContainer: "bg-blue-900/40 border-blue-500/40 group-hover:bg-[#2e5bff] group-hover:text-white"
    }
  },
  JUBILEE: {
    fontUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap",
    fontHeadline: "font-sans font-black tracking-tighter",
    fontBody: "font-sans",
    uiShape: "rounded-full",
    classes: {
      body: "bg-[#210219] text-[#ff88b5]",
      nav: "bg-[#210219]/90 border-b border-[#ff2e97]/20 shadow-none",
      navLogo: "text-[#ff2e97] font-sans font-bold uppercase tracking-widest",
      navLink: "text-[#c26495] hover:text-[#ff2e97]",
      navLinkActive: "text-white border-[#ff2e97]",
      primaryText: "text-[#ff2e97]",
      heroPrimaryBtn: "bg-gradient-to-r from-[#ff2e97] to-[#ba005d] text-white font-sans font-bold tracking-widest",
      surface: "bg-[#330325]",
      surfaceAlt: "bg-[#210219]",
      borderAccent: "border-[#ff2e97]/30",
      hotspotIcon: "text-[#ff2e97]",
      hotspotContainer: "bg-[#ff2e97]/20 border-[#ff2e97]/40 group-hover:bg-[#ff2e97] group-hover:text-white"
    }
  },
  REVEAL: {
    fontUrl: "https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
    fontHeadline: "font-serif",
    fontBody: "font-sans",
    uiShape: "rounded-xl",
    classes: {
      body: "bg-[#f9f9f9] text-[#1a1c1c]",
      nav: "bg-[#f9f9f9]/80 shadow-sm",
      navLogo: "text-[#1a1c1c] italic font-serif",
      navLink: "text-[#42484a] hover:text-[#4b626a]",
      navLinkActive: "text-[#4b626a] border-[#4b626a]",
      primaryText: "text-[#4b626a]",
      heroPrimaryBtn: "bg-gradient-to-r from-[#4b626a] to-[#aec6cf] text-white font-sans font-semibold tracking-wide shadow-lg",
      surface: "bg-[#ffffff]",
      surfaceAlt: "bg-[#f3f3f3]",
      borderAccent: "border-[#aec6cf]/50",
      hotspotIcon: "text-[#aec6cf]",
      hotspotContainer: "bg-white/70 border-white/20 backdrop-blur-md group-hover:scale-95 transition-transform"
    }
  }
};

export function getTheme(theme: ThemeType) {
  return themeDefinitions[theme] || themeDefinitions['ATELIER'];
}
