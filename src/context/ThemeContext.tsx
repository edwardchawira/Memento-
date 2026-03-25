"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeType } from '@/lib/themeMapping';
import { themeVariables } from '@/lib/themeVariables';

interface ThemeContextType {
  activeTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<ThemeType>('ATELIER');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('memento_theme') as ThemeType;
    if (saved) setActiveTheme(saved);
  }, []);

  const changeTheme = async (theme: ThemeType) => {
    setActiveTheme(theme);
    localStorage.setItem('memento_theme', theme);

    // Mock Backend POST update
    console.log(`[POST] /api/events/theme - Update event theme to ${theme}`);
    try {
      await fetch('/api/theme', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme }) 
      }).catch(() => {});
    } catch {
      // Ignored for frontend demo
    }
  };

  if (!mounted) {
    // Render children with default theme to avoid hydration mismatch
    return <ThemeContext.Provider value={{ activeTheme: 'ATELIER', setTheme: () => {} }}>{children}</ThemeContext.Provider>;
  }

  const varsStr = Object.entries(themeVariables[activeTheme])
    .map(([k, v]) => `${k}: ${v};`)
    .join('\n');

  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme: changeTheme }}>
      <style dangerouslySetInnerHTML={{ __html: `:root { ${varsStr} }` }} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
