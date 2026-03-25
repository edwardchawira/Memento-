"use client";
import { useTheme } from "@/context/ThemeContext";
import HomeAtelier from "./HomeAtelier";
import HomeConference from "./HomeConference";

export default function Home() {
  const { activeTheme } = useTheme();
  
  if (activeTheme === "CONFERENCE") return <HomeConference />;
  return <HomeAtelier />;
}
