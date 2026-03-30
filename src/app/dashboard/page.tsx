"use client";
import { useTheme } from "@/context/ThemeContext";
import DashboardDefault from "./DashboardDefault";
import ConferenceDashboard from "./ConferenceDashboard";

export default function DashboardPage() {
  const { activeTheme } = useTheme();
  if (activeTheme === "CONFERENCE") return <ConferenceDashboard />;
  return <DashboardDefault />;
}
