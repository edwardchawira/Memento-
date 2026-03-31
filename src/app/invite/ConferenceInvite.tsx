"use client";

// Stitch "Conference Guest Invite (Mobile)" — screen cf5ad8c847504d55b999a463bea010d4
// Project: Digital Memory Booklet (5929816749829680234)
// Design System: Memento Summit (assets/4f02613b68334037a398ab43ad1932e8)

import { useEvent } from "@/context/EventContext";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { supabase } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

type CaptureMode = "selfie" | "video" | "voice";

function extFromMime(mime: string) {
  if (mime.includes("jpeg")) return "jpg";
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("mp4")) return "mp4";
  if (mime.includes("quicktime")) return "mov";
  if (mime.includes("webm")) return "webm";
  if (mime.includes("mpeg")) return "mp3";
  if (mime.includes("wav")) return "wav";
  if (mime.includes("ogg")) return "ogg";
  return "bin";
}

const TIMELINE = [
  {
    time: "09:00",
    period: "AM EST",
    active: true,
    tag: "Main Stage",
    tagStyle: "bg-[#2e5bff]/10 text-[#b8c3ff]",
    duration: "60 MIN",
    title: "Opening Keynote: The Sovereign Cloud",
    desc: "An exploration of decentralized infrastructure and the future of data ownership in a hyper-connected world.",
  },
  {
    time: "10:30",
    period: "AM EST",
    active: false,
    tag: "Breakout A",
    tagStyle: "bg-[#3f465c]/20 text-[#adb4ce]",
    duration: "45 MIN",
    title: "Neural Interface Protocols",
    desc: "Technical deep dive into non-invasive BCI standards for professional enterprise software.",
  },
  {
    time: "12:00",
    period: "PM EST",
    active: false,
    tag: "Sky Garden",
    tagStyle: "bg-[#007d55]/20 text-[#4edea3]",
    duration: "90 MIN",
    title: "The Alchemist's Luncheon",
    desc: "Curated networking session over sustainable molecular gastronomy.",
  },
];

export default function ConferenceInvite() {
  const { event, setPosterImage } = useEvent();
  const qc = useQueryClient();
  const sp = useSearchParams();

  const [eventId, setEventId] = useState<string | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [activeCapture, setActiveCapture] = useState<CaptureMode | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recordingForMs, setRecordingForMs] = useState(0);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    // Prefer the persisted event id from onboarding
    const qEventId = sp.get("eventId");
    const qGuestId = sp.get("guestId");
    if (qEventId) {
      localStorage.setItem("memento_event_id", qEventId);
      setEventId(qEventId);
    } else {
      const stored = localStorage.getItem("memento_event_id");
      if (stored) setEventId(stored);
      else if (event?.id) setEventId(event.id);
    }
    if (qGuestId) {
      localStorage.setItem("memento_guest_id", qGuestId);
      setGuestId(qGuestId);
    } else {
      const storedG = localStorage.getItem("memento_guest_id");
      if (storedG) setGuestId(storedG);
    }
  }, [event?.id, sp]);

  useEffect(() => {
    if (event?.posterImage) return;
    try {
      const storedPoster = localStorage.getItem("memento_poster_dataurl");
      if (storedPoster) setPosterImage(storedPoster);
    } catch {
      // ignore
    }
  }, [event?.posterImage, setPosterImage]);

  const { data: itineraryRows } = useQuery({
    queryKey: ["itinerary_items", eventId],
    enabled: Boolean(eventId && isSupabaseConfigured() && supabase),
    queryFn: async () => {
      if (!supabase || !eventId) return [];
      const { data, error } = await supabase
        .from("itinerary_items")
        .select("position,starts_at_text,title,description,location_text,speaker_name,duration_minutes")
        .eq("event_id", eventId)
        .order("position", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 10_000,
  });

  const { data: recentUploads } = useQuery({
    queryKey: ["uploads", eventId],
    enabled: Boolean(eventId && isSupabaseConfigured() && supabase),
    queryFn: async () => {
      if (!supabase || !eventId) return [];
      const { data, error } = await supabase
        .from("uploads")
        .select("id,created_at,bucket_id,object_path,mime_type,caption,guest_id")
        .eq("event_id", eventId)
        .order("created_at", { ascending: false })
        .limit(12);
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5_000,
  });

  // Live updates: itinerary changes
  useEffect(() => {
    const client = supabase;
    if (!client || !eventId) return;
    const ch = client
      .channel(`itinerary:${eventId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "itinerary_items", filter: `event_id=eq.${eventId}` },
        () => qc.invalidateQueries({ queryKey: ["itinerary_items", eventId] })
      )
      .subscribe();
    return () => {
      ch.unsubscribe();
      client.removeChannel(ch);
    };
  }, [eventId, qc]);

  // Live updates: uploads
  useEffect(() => {
    const client = supabase;
    if (!client || !eventId) return;
    const ch = client
      .channel(`uploads:${eventId}`)
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

  useEffect(() => {
    if (!recorder) return;
    const t = window.setInterval(() => setRecordingForMs((v) => v + 250), 250);
    return () => window.clearInterval(t);
  }, [recorder]);

  const uploadMedia = async (file: File, mode: CaptureMode) => {
    if (!supabase || !eventId) {
      showToast("Missing event context");
      return;
    }
    setIsUploading(true);
    try {
      const bucket = "guest_uploads";
      const ext = extFromMime(file.type);
      const gid = guestId || "guest";
      const path = `${eventId}/${gid}/${mode}-${Date.now()}.${ext}`;

      const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (upErr) throw upErr;

      const { error: rowErr } = await supabase.from("uploads").insert({
        event_id: eventId,
        guest_id: guestId,
        bucket_id: bucket,
        object_path: path,
        mime_type: file.type,
        caption:
          mode === "selfie" ? "Selfie" : mode === "video" ? "Video Toast" : "Voice Note",
      });
      if (rowErr) throw rowErr;

      showToast("Uploaded");
      setActiveCapture(null);
      qc.invalidateQueries({ queryKey: ["uploads", eventId] });
    } catch {
      showToast("Upload failed");
    }
    setIsUploading(false);
  };

  const startVoiceRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      showToast("Recording not supported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const r = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      r.ondataavailable = (e) => chunks.push(e.data);
      r.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: r.mimeType || "audio/webm" });
        const file = new File([blob], `voice-${Date.now()}.webm`, {
          type: blob.type,
        });
        setRecorder(null);
        setRecordingForMs(0);
        await uploadMedia(file, "voice");
      };
      setRecorder(r);
      setRecordingForMs(0);
      r.start();
    } catch {
      showToast("Mic permission denied");
    }
  };

  const stopVoiceRecording = () => {
    recorder?.stop();
  };

  const derivedTimeline = useMemo(() => {
    // 1) Supabase-backed itinerary (preferred)
    if (itineraryRows && itineraryRows.length > 0) {
      return itineraryRows.map((r: any, idx: number) => ({
        key: `db-${typeof r.position === "number" ? r.position : idx}`,
        time: r.starts_at_text || "—",
        period: "",
        active: idx === 0,
        tag: (r.location_text || "Session").toUpperCase(),
        tagStyle:
          typeof r.location_text === "string" && r.location_text.toLowerCase().includes("main")
            ? "bg-[#2e5bff]/10 text-[#b8c3ff]"
            : "bg-[#3f465c]/20 text-[#adb4ce]",
        duration: r.duration_minutes ? `${r.duration_minutes} MIN` : "",
        title: r.title,
        desc: r.description || "",
        speakerName: r.speaker_name || "",
      }));
    }

    // 2) In-memory itinerary (only if AI actually provided one)
    // Prevents showing the default wedding itinerary in Conference UI.
    if (Array.isArray(event?.extractedData?.itineraryItems) && event.extractedData.itineraryItems.length > 0) {
      return event.itinerary.map((i, idx) => ({
        key: `mem-${i.id ?? idx}`,
        time: i.time || "—",
        period: "",
        active: Boolean(i.isActive) || idx === 0,
        tag: (i.location || "Session").toUpperCase(),
        tagStyle:
          i.location?.toLowerCase().includes("main")
            ? "bg-[#2e5bff]/10 text-[#b8c3ff]"
            : "bg-[#3f465c]/20 text-[#adb4ce]",
        duration: i.durationMinutes ? `${i.durationMinutes} MIN` : "",
        title: i.title,
        desc: i.description,
        speakerName: i.speakerName ?? "",
      }));
    }

    // 3) Stitched fallback
    return TIMELINE.map((t, idx) => ({ ...t, key: `stitch-${idx}`, speakerName: "" }));
  }, [event?.itinerary, itineraryRows]);

  return (
    <main className="pt-20">
      {/* Toast */}
      {toast ? (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] px-8 py-3 bg-gradient-to-r from-[#2e5bff] to-[#b8c3ff] text-[#060e20] font-headline text-xs uppercase tracking-widest font-black shadow-2xl">
          {toast}
        </div>
      ) : null}

      {/* Capture Modal */}
      {activeCapture ? (
        <div className="fixed inset-0 z-[180] flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => (isUploading || recorder ? null : setActiveCapture(null))}
          />
          <div className="relative w-full max-w-md bg-[#0b1326] border border-[#434656]/20 shadow-[0_40px_100px_rgba(0,0,0,0.7)] p-8">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#b8c3ff]">
                  Guest Action
                </div>
                <div className="font-headline text-2xl font-black tracking-tight text-[#dae2fd] mt-2">
                  {activeCapture === "selfie"
                    ? "Take a Selfie"
                    : activeCapture === "video"
                      ? "Record Video Toast"
                      : "Record Voice Note"}
                </div>
              </div>
              <button
                type="button"
                className="material-symbols-outlined text-[#c4c5d9] hover:text-[#dae2fd] transition-colors bg-transparent border-none cursor-pointer text-2xl"
                onClick={() => (isUploading || recorder ? null : setActiveCapture(null))}
                aria-label="Close"
              >
                close
              </button>
            </div>

            {activeCapture === "voice" ? (
              <div className="space-y-4">
                <div className="text-[#c4c5d9] text-sm">
                  Keep it short and clear — it will be attached to your session memory.
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#adb4ce]">
                    {recorder ? `Recording • ${(recordingForMs / 1000).toFixed(1)}s` : "Ready"}
                  </div>
                  {recorder ? (
                    <button
                      type="button"
                      className="bg-[#ff3b3b] text-white px-5 py-3 font-headline font-black uppercase text-xs tracking-widest cursor-pointer border-none active:scale-95 transition-all"
                      onClick={stopVoiceRecording}
                    >
                      Stop
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-gradient-to-br from-[#2e5bff] to-[#b8c3ff] text-[#060e20] px-5 py-3 font-headline font-black uppercase text-xs tracking-widest cursor-pointer border-none active:scale-95 transition-all"
                      onClick={startVoiceRecording}
                      disabled={isUploading}
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-[#c4c5d9] text-sm">
                  {activeCapture === "selfie"
                    ? "Snap a photo to join the attendee mural."
                    : "Record a quick message for the summit."}
                </div>
                <label className="block cursor-pointer">
                  <div className="h-40 border border-dashed border-[#434656]/40 bg-[#060e20] flex flex-col items-center justify-center gap-2 hover:border-[#2e5bff]/60 transition-colors">
                    <span className="material-symbols-outlined text-4xl text-[#b8c3ff]">
                      {activeCapture === "selfie" ? "photo_camera" : "videocam"}
                    </span>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#adb4ce]">
                      Tap to {activeCapture === "selfie" ? "capture" : "record"}
                    </div>
                    <div className="text-xs text-[#c4c5d9]/70">
                      {isUploading ? "Uploading…" : "Mobile camera will open"}
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept={activeCapture === "selfie" ? "image/*" : "video/*"}
                    capture={activeCapture === "selfie" ? "environment" : "environment"}
                    disabled={isUploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadMedia(f, activeCapture);
                    }}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* Hero & Poster Section */}
      <section className="relative min-h-[795px] flex flex-col items-center justify-center px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1326] via-transparent to-[#0b1326] z-10" />
          <img
            className="w-full h-full object-cover opacity-40"
            alt="Abstract deep space visualization with glowing neural networks"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHhNsXxHOPwwMOWrwtz5mrfnaqg4Ti4kFjN83lD7AL0SR954qqMzSVgtZXnyXROHKPKgjmv6xrQtJSg94mGqY1JdL4tqvbHUhgcgDt9PWUbgys500Hvem9GDNC38YmTNJNPOyH8bJgeuiJb5XDeNdsNgwdRxeE5bRkb54x7cc7xhM_B1nOe0jnYp-h3n3NWaP8jJQfbhSF46BXnPXUUESj7UvLjYPhJL5XTeNRikzD8UuEq-Bc67JdA5K50OtKH4B6HnLvmATYiO8"
          />
        </div>

        <div className="relative z-20 w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — Text */}
          <div className="lg:col-span-7">
            <span className="inline-block py-1 px-3 bg-[#3f465c] text-[#adb4ce] font-headline text-[10px] tracking-[0.2em] uppercase mb-6">
              Exclusive Invitation
            </span>
            <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter text-[#dae2fd] leading-[0.9] mb-8">
              FUTURE<br />
              <span className="text-[#2e5bff]">HORIZONS</span><br />
              SUMMIT
            </h1>
            <p className="max-w-md text-[#c4c5d9] text-lg leading-relaxed mb-10">
              The architectural blueprint for the next decade of digital governance and cognitive computing.
              Join the elite cohort shaping tomorrow.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-br from-[#2e5bff] to-[#b8c3ff] text-[#efefff] px-8 py-4 font-headline font-extrabold uppercase text-sm tracking-widest shadow-2xl border-none cursor-pointer active:scale-95 transition-all">
                Accept Invite
              </button>
              <button className="border border-[#434656]/30 text-[#dae2fd] px-8 py-4 font-headline font-extrabold uppercase text-sm tracking-widest hover:bg-[#31394d]/20 transition-all bg-transparent cursor-pointer">
                Decline
              </button>
            </div>
          </div>

          {/* Right — Poster Card */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-[#2e5bff]/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-[3/4] bg-[#2d3449] shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-[#434656]/15 overflow-hidden">
              <img
                className="w-full h-full object-contain transition-all duration-1000"
                alt="Sleek high-tech conference poster"
                src={
                  event?.posterImage ??
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFP_184QIkiv72zjKnP2SQmm2z5Ss12dhRJLAzD3YrcF74x8jOwIGAIgGEzMjuSiQNNB_c-dL0hS2XLP9kGshalT81_A1Pmc95Atb23ITw-iHiPEbQ318UbY3BezIds1jy-X0WuQYqp_t-7fN7ZYBv5txpF5vICThQE9wgdt6HE31Q7jpSuPIon9LYrd-yyEzoqFeOjP8lq_GHWE5pOFasmS4VNByRQr5URJ1SVC2EHk0DUizaPr_JeCY1WOYIdjchABDGomc-IDM"
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hotspot Action Cards */}
      <section className="py-24 px-8 bg-[#060e20]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Voice Note */}
          <button
            type="button"
            onClick={() => setActiveCapture("voice")}
            className="group relative overflow-hidden bg-[#171f33] border border-[#434656]/10 p-10 h-64 flex flex-col justify-between hover:bg-[#31394d] transition-colors duration-500 cursor-pointer text-left"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2e5bff]/10 rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            <span className="material-symbols-outlined text-4xl text-[#b8c3ff]">mic_external_on</span>
            <div>
              <h3 className="font-headline font-bold text-2xl mb-2 text-[#dae2fd]">Voice Note</h3>
              <p className="text-[#c4c5d9] text-sm mb-6 max-w-xs">
                Leave a quick audio memory for the speakers and attendees.
              </p>
              <span className="flex items-center gap-2 font-headline text-xs uppercase tracking-widest font-bold text-[#b8c3ff] group-hover:gap-4 transition-all">
                Record <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </button>

          {/* Selfie */}
          <button
            type="button"
            onClick={() => setActiveCapture("selfie")}
            className="group relative overflow-hidden bg-[#171f33] border border-[#434656]/10 p-10 h-64 flex flex-col justify-between hover:bg-[#31394d] transition-colors duration-500 cursor-pointer text-left"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4edea3]/10 rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            <span className="material-symbols-outlined text-4xl text-[#4edea3]">photo_camera</span>
            <div>
              <h3 className="font-headline font-bold text-2xl mb-2 text-[#dae2fd]">Selfie Portal</h3>
              <p className="text-[#c4c5d9] text-sm mb-6 max-w-xs">
                Snap a selfie and join the live attendee mural.
              </p>
              <span className="flex items-center gap-2 font-headline text-xs uppercase tracking-widest font-bold text-[#4edea3] group-hover:gap-4 transition-all">
                Open Camera <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </button>

          {/* Video Toast */}
          <button
            type="button"
            onClick={() => setActiveCapture("video")}
            className="group relative overflow-hidden bg-[#171f33] border border-[#434656]/10 p-10 h-64 flex flex-col justify-between hover:bg-[#31394d] transition-colors duration-500 cursor-pointer text-left"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8c3ff]/10 rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            <span className="material-symbols-outlined text-4xl text-[#b8c3ff]">videocam</span>
            <div>
              <h3 className="font-headline font-bold text-2xl mb-2 text-[#dae2fd]">Video Toast</h3>
              <p className="text-[#c4c5d9] text-sm mb-6 max-w-xs">
                Record a short message — it appears in the live gallery instantly.
              </p>
              <span className="flex items-center gap-2 font-headline text-xs uppercase tracking-widest font-bold text-[#b8c3ff] group-hover:gap-4 transition-all">
                Record Video <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </button>
        </div>

        {/* Recent uploads strip */}
        {recentUploads && recentUploads.length > 0 ? (
          <div className="max-w-[1200px] mx-auto mt-12">
            <div className="flex items-end justify-between gap-6 mb-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#b8c3ff]">
                  Live Feed
                </div>
                <div className="font-headline text-2xl font-black tracking-tight text-[#dae2fd] mt-2">
                  Recent Guest Uploads
                </div>
              </div>
              <div className="text-xs text-[#c4c5d9] font-bold uppercase tracking-widest">
                {recentUploads.length} items
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {recentUploads.map((u: any) => {
                const isImage = typeof u.mime_type === "string" && u.mime_type.startsWith("image/");
                const isVideo = typeof u.mime_type === "string" && u.mime_type.startsWith("video/");
                const isAudio = typeof u.mime_type === "string" && u.mime_type.startsWith("audio/");
                const url =
                  supabase && u.bucket_id && u.object_path
                    ? supabase.storage.from(u.bucket_id).getPublicUrl(u.object_path).data.publicUrl
                    : null;
                return (
                  <div key={u.id} className="flex-none w-48 h-60 bg-[#131b2e] border border-[#434656]/10 overflow-hidden relative">
                    {url && isImage ? (
                      <img className="w-full h-full object-cover" alt={u.caption || "upload"} src={url} />
                    ) : url && isVideo ? (
                      <video className="w-full h-full object-cover" src={url} controls playsInline />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#c4c5d9]">
                        <span className="material-symbols-outlined text-4xl text-[#b8c3ff]">
                          {isAudio ? "graphic_eq" : "attach_file"}
                        </span>
                        <div className="text-[10px] uppercase tracking-widest font-bold">
                          {u.caption || "Upload"}
                        </div>
                        {url && isAudio ? (
                          <audio src={url} controls />
                        ) : null}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0b1326] to-transparent">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-[#adb4ce]">
                        {u.caption || "Upload"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>

      {/* Timeline / Itinerary */}
      <section className="py-32 px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="font-headline text-[10px] tracking-[0.3em] uppercase text-[#b8c3ff] font-bold">
                Strategic Itinerary
              </span>
              <h2 className="font-headline text-5xl font-black tracking-tight mt-4">PHASE 01: GENESIS</h2>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-[#222a3d] border border-[#2e5bff] text-[#b8c3ff] font-headline text-[10px] tracking-widest uppercase font-bold">
                Day 01
              </div>
              <div className="px-4 py-2 bg-[#131b2e] text-[#c4c5d9] font-headline text-[10px] tracking-widest uppercase hover:bg-[#31394d] cursor-pointer transition-colors">
                Day 02
              </div>
            </div>
          </div>

          <div className="space-y-0">
            {derivedTimeline.map((item) => (
              <div
                key={item.key}
                className="grid grid-cols-1 md:grid-cols-12 group cursor-pointer border-t border-[#434656]/10"
              >
                <div className="md:col-span-2 py-10 md:py-12 flex flex-col justify-center">
                  <span className="font-headline font-bold text-2xl">{item.time}</span>
                  <span className="font-headline text-[10px] text-[#c4c5d9] uppercase tracking-widest">
                    {item.period}
                  </span>
                </div>
                <div className="md:col-span-1 flex justify-center py-10 md:py-12 relative">
                  <div
                    className={`w-[4px] h-full ${
                      item.active
                        ? "bg-[#2e5bff]"
                        : "bg-[#434656]/30 group-hover:bg-[#2e5bff]/50 transition-colors"
                    }`}
                  />
                </div>
                <div className="md:col-span-9 py-10 md:py-12 md:pl-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-tighter ${item.tagStyle}`}>
                      {item.tag}
                    </span>
                    {item.duration ? (
                      <span className="text-[#c4c5d9] text-[10px] uppercase font-bold">{item.duration}</span>
                    ) : null}
                  </div>
                  <h4 className="font-headline text-2xl font-bold group-hover:text-[#b8c3ff] transition-colors">
                    {item.title}
                  </h4>
                  {item.speakerName ? (
                    <div className="mt-2 text-[10px] uppercase tracking-widest font-bold text-[#b8c3ff]">
                      Speaker: <span className="text-[#dae2fd]">{item.speakerName}</span>
                    </div>
                  ) : null}
                  <p className="text-[#c4c5d9] mt-4 text-sm leading-relaxed max-w-xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
