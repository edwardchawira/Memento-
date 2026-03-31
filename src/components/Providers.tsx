"use client";

import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { EventProvider } from "@/context/EventContext";
import { getTheme, cn } from "@/lib/themeMapping";
import { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import QueryProvider from "./QueryProvider";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { activeTheme } = useTheme();
  const theme = getTheme(activeTheme);

  useEffect(() => {
    const id = "memento-theme-font";
    const existing = document.getElementById(id);
    if (existing && existing.getAttribute("href") === theme.fontUrl) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = theme.fontUrl;
    link.crossOrigin = "anonymous";

    if (existing) existing.remove();
    document.head.appendChild(link);
  }, [theme.fontUrl]);

  return (
    <div className={cn("min-h-full flex flex-col", theme.fontBody)}>
      <NavBar />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <EventProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </EventProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

