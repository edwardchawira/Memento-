"use client";

import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { EventProvider } from "@/context/EventContext";
import { getTheme, cn } from "@/lib/themeMapping";
import NavBar from "./NavBar";
import Footer from "./Footer";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { activeTheme } = useTheme();
  const theme = getTheme(activeTheme);

  return (
    <>
      <link href={theme.fontUrl} rel="stylesheet" precedence="default" crossOrigin="anonymous" />
      <body className={cn("min-h-screen flex flex-col pt-24 transition-colors duration-500 bg-[var(--color-surface)] text-[var(--color-on-surface)]", theme.fontBody)}>
        <NavBar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <EventProvider>
        <ThemeWrapper>{children}</ThemeWrapper>
      </EventProvider>
    </ThemeProvider>
  );
}

