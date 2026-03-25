"use client";
import { useTheme } from "@/context/ThemeContext";
import AtelierBooklet from "./AtelierBooklet";
import ConferenceBooklet from "./ConferenceBooklet";

export default function BookletPage() {
  const { activeTheme } = useTheme();
  if (activeTheme === "CONFERENCE") return <ConferenceBooklet />;
  return <AtelierBooklet />;
}
