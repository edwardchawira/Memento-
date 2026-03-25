"use client";
import { useTheme } from "@/context/ThemeContext";
import AtelierDashboard from "./AtelierDashboard";
import ConferenceDashboard from "./ConferenceDashboard";

export default function DashboardPage() {
  const { activeTheme } = useTheme();
  if (activeTheme === "CONFERENCE") return <ConferenceDashboard />;
  return <AtelierDashboard />;
}
