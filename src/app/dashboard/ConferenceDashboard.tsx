"use client";

// Stitch "Conference Host Dashboard (Desktop)" — screen faa1992248b54d529456b10f1e52dca8
// Project: Digital Memory Booklet (5929816749829680234)
// Design System: Memento Summit (assets/4f02613b68334037a398ab43ad1932e8)

import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { supabase } from "@/lib/supabase/client";

function formatAgo(iso: string) {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function tagForUpload(mime: string | null | undefined) {
  if (!mime) return { label: "UPLOAD", style: "bg-[#3f465c] text-[#adb4ce]" };
  if (mime.startsWith("image/")) return { label: "PHOTO", style: "bg-[#2e5bff] text-[#efefff]" };
  if (mime.startsWith("video/")) return { label: "VIDEO", style: "bg-[#b8c3ff]/20 text-[#b8c3ff]" };
  if (mime.startsWith("audio/")) return { label: "VOICE", style: "bg-[#007d55]/30 text-[#4edea3]" };
  return { label: "FILE", style: "bg-[#3f465c] text-[#adb4ce]" };
}

const HISTOGRAM = [40, 65, 85, 100, 70, 55, 45, 30, 20];

const ACTIVITY = [
  { title: "Keynote Broadcaster Active", meta: "Stage Alpha • Now", color: "bg-[#2e5bff]" },
  { title: "500th Attendee Checked In", meta: "South Lobby • 14m ago", color: "bg-[#4edea3]" },
  { title: "WiFi Load Balanced", meta: "System • 32m ago", color: "bg-[#434656]" },
  { title: "Morning Breakout Concluded", meta: "Hall D • 45m ago", color: "bg-[#2e5bff]" },
];

export default function ConferenceDashboard() {
  const qc = useQueryClient();
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const id = localStorage.getItem("memento_event_id");
      if (id) setEventId(id);
    } catch {
      // ignore
    }
  }, []);

  const { data: guestUploads = [] } = useQuery({
    queryKey: ["uploads", eventId],
    enabled: Boolean(eventId && isSupabaseConfigured() && supabase),
    queryFn: async () => {
      if (!supabase || !eventId) return [];
      const { data, error } = await supabase
        .from("uploads")
        .select("id,created_at,bucket_id,object_path,mime_type,caption,guest_id")
        .eq("event_id", eventId)
        .order("created_at", { ascending: false })
        .limit(24);
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5_000,
  });

  useEffect(() => {
    const client = supabase;
    if (!client || !eventId) return;
    const ch = client
      .channel(`dashboard-uploads:${eventId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "uploads", filter: `event_id=eq.${eventId}` },
        () => qc.invalidateQueries({ queryKey: ["uploads", eventId] })
      )
      .subscribe();
    return () => {
      ch.unsubscribe();
      client.removeChannel(ch);
    };
  }, [eventId, qc]);

  const urlFor = (bucket: string | null | undefined, path: string | null | undefined) => {
    if (!supabase || !bucket || !path) return null;
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };

  return (
    <div className="pb-20 px-8 max-w-[1440px] mx-auto pt-8">
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-headline text-xs font-bold uppercase tracking-widest text-[#b8c3ff] mb-2 block">
            Executive Control Center
          </span>
          <h1 className="font-headline text-5xl font-black tracking-tighter text-[#dae2fd] leading-none">
            Future Horizons Summit
          </h1>
          <p className="text-[#c4c5d9] mt-4 max-w-xl font-medium">
            Real-time engagement telemetry and logistical oversight for the global innovation plenary.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-[#060e20] text-[#dae2fd] px-6 py-3 text-sm font-headline font-bold rounded-sm border border-[#434656]/15 hover:bg-[#31394d] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">upload_file</span>
            Export Participant List
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-br from-[#2e5bff] to-[#b8c3ff] text-[#efefff] px-6 py-3 text-sm font-headline font-bold rounded-sm shadow-lg shadow-[#2e5bff]/20 active:scale-95 transition-all cursor-pointer border-none">
            <span className="material-symbols-outlined text-sm">campaign</span>
            Broadcast Announcement
          </button>
        </div>
      </header>

      {/* Bento Grid Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Metric Cards Column */}
        <div className="md:col-span-4 space-y-6">
          {/* Confirmed RSVPs */}
          <div className="bg-[#131b2e] p-8 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">groups</span>
            </div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-[#c4c5d9]">Confirmed RSVPs</span>
            <div className="flex items-end gap-3 mt-4">
              <span className="text-5xl font-black font-headline text-[#dae2fd] tracking-tighter leading-none">1,248</span>
              <span className="text-[#4edea3] font-bold text-sm mb-1">+12% vs LY</span>
            </div>
          </div>

          {/* Checked-In Status */}
          <div className="bg-[#131b2e] p-8 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">how_to_reg</span>
            </div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-[#c4c5d9]">Checked-In Status</span>
            <div className="flex items-end gap-3 mt-4">
              <span className="text-5xl font-black font-headline text-[#dae2fd] tracking-tighter leading-none">892</span>
              <span className="text-[#c4c5d9] font-bold text-sm mb-1">/ 1,248</span>
            </div>
            <div className="w-full h-1 bg-[#060e20] mt-6 overflow-hidden">
              <div className="h-full bg-[#2e5bff]" style={{ width: "71%" }} />
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="bg-[#131b2e] p-8 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">query_stats</span>
            </div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-[#c4c5d9]">Engagement Rate</span>
            <div className="flex items-end gap-3 mt-4">
              <span className="text-5xl font-black font-headline text-[#dae2fd] tracking-tighter leading-none">94.2%</span>
              <span className="text-[#4edea3] font-bold text-sm mb-1">Peak</span>
            </div>
          </div>
        </div>

        {/* Guest uploads — same event feed as invite page, realtime */}
        <div className="md:col-span-8 bg-[#131b2e] rounded-lg p-1">
          <div className="p-6 flex flex-wrap justify-between items-center gap-4 border-b border-[#434656]/10">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-[#4edea3] animate-pulse" />
              <div>
                <h3 className="font-headline font-bold text-lg text-[#dae2fd]">Summit Moments</h3>
                <p className="text-xs text-[#c4c5d9] mt-1 max-w-md">
                  Live guest photos, voice notes, and videos from the invite link — same feed guests see on RSVP.
                </p>
              </div>
            </div>
            <span className="text-xs font-headline font-bold text-[#c4c5d9] uppercase tracking-widest">
              {guestUploads.length} live
            </span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[200px]">
            {!eventId || !isSupabaseConfigured() || !supabase ? (
              <div className="col-span-full text-sm text-[#c4c5d9] py-8 text-center">
                Connect Supabase and open the dashboard after creating an event so guest uploads appear here.
              </div>
            ) : guestUploads.length === 0 ? (
              <div className="col-span-full text-sm text-[#c4c5d9] py-8 text-center">
                No uploads yet. Invited guests can add photos, voice, and video from their RSVP link — they will show up here in real time.
              </div>
            ) : (
              guestUploads.map((u: any) => {
                const tag = tagForUpload(u.mime_type);
                const url = urlFor(u.bucket_id, u.object_path);
                const isImage = typeof u.mime_type === "string" && u.mime_type.startsWith("image/");
                const isVideo = typeof u.mime_type === "string" && u.mime_type.startsWith("video/");
                const isAudio = typeof u.mime_type === "string" && u.mime_type.startsWith("audio/");
                const ago = u.created_at ? formatAgo(u.created_at) : "";
                return (
                  <div key={u.id} className="group relative overflow-hidden rounded-sm bg-[#060e20] border border-[#434656]/10">
                    {url && isImage ? (
                      <img
                        alt={u.caption || "Guest upload"}
                        className="w-full h-64 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        src={url}
                      />
                    ) : url && isVideo ? (
                      <video className="w-full h-64 object-cover bg-black" src={url} controls playsInline />
                    ) : (
                      <div className="w-full h-64 flex flex-col items-center justify-center gap-3 text-[#c4c5d9] bg-[#060e20]">
                        <span className="material-symbols-outlined text-5xl text-[#b8c3ff]">
                          {isAudio ? "graphic_eq" : "attach_file"}
                        </span>
                        {url && isAudio ? <audio src={url} controls className="max-w-[90%]" /> : null}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0b1326] to-transparent">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] px-2 py-0.5 font-bold rounded-sm ${tag.style}`}>{tag.label}</span>
                        <span className="text-xs text-[#dae2fd]/60">{ago}</span>
                      </div>
                      <p className="text-sm font-medium text-[#dae2fd] line-clamp-2">
                        {u.caption || (isAudio ? "Voice note" : isVideo ? "Video" : "Guest moment")}
                      </p>
                      {u.guest_id ? (
                        <span className="text-[10px] text-[#b8c3ff]/80 font-mono mt-2 block truncate">
                          guest {String(u.guest_id).slice(0, 8)}…
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#c4c5d9]/70 mt-2 block">Anonymous upload</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Bento Grid Row 2 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Attendance Flow Visualization */}
        <div className="md:col-span-8 bg-[#131b2e] rounded-lg p-8">
          <h3 className="font-headline font-bold text-lg text-[#dae2fd] mb-8">Attendance Flow Visualization</h3>
          <div className="h-64 flex items-end justify-between gap-4">
            {HISTOGRAM.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm transition-all relative group ${
                  i === 3 ? "bg-[#2e5bff]" : "bg-[#2e5bff]/30 hover:bg-[#2e5bff]"
                }`}
                style={{ height: `${h}%` }}
              >
                {i === 3 && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#b8c3ff] whitespace-nowrap">
                    PEAK (09:30)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="md:col-span-4 bg-[#131b2e] rounded-lg p-1 flex flex-col">
          <div className="p-6 border-b border-[#434656]/10">
            <h3 className="font-headline font-bold text-lg text-[#dae2fd]">Activity Log</h3>
          </div>
          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            {ACTIVITY.map((a) => (
              <div key={a.title} className="flex gap-4">
                <div className={`w-1 rounded-full flex-shrink-0 ${a.color}`} />
                <div>
                  <p className="text-sm font-bold text-[#dae2fd]">{a.title}</p>
                  <span className="text-xs text-[#c4c5d9]">{a.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
