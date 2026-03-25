"use client";
import { useTheme } from "@/context/ThemeContext";
import AtelierInvite from "./AtelierInvite";
import ConferenceInvite from "./ConferenceInvite";

import RevealInvite from "./RevealInvite";

export default function GuestInvite() {
  const { activeTheme } = useTheme();
  if (activeTheme === "CONFERENCE") return <ConferenceInvite />;
  if (activeTheme === "REVEAL") return <RevealInvite />;
  return <AtelierInvite />;
}
