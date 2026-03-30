"use client";
import { useTheme } from "@/context/ThemeContext";
import InviteDefault from "./InviteDefault";
import ConferenceInvite from "./ConferenceInvite";

export default function GuestInvite() {
  const { activeTheme } = useTheme();
  if (activeTheme === "CONFERENCE") return <ConferenceInvite />;
  return <InviteDefault />;
}
