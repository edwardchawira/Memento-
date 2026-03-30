"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useEvent } from "@/context/EventContext";
import { getTheme, cn, ThemeType } from "@/lib/themeMapping";
import { HotspotType, Hotspot } from "@/lib/eventTypes";

// Hotspot icon/label mapping
const HOTSPOT_META: Record<HotspotType, { icon: string; label: string }> = {
  selfie: { icon: "photo_camera", label: "Selfie Portal" },
  video: { icon: "videocam", label: "Video Toast" },
  voice: { icon: "mic", label: "Voice Note" },
};

export default function HomeDefault() {
  const { activeTheme, setTheme } = useTheme();
  const theme = getTheme(activeTheme);
  const {
    event, setPosterImage, setExtractedData,
    updateEventDetail, markFieldEdited,
    addHotspot, removeHotspot, updateHotspot,
    completedStep, setCompletedStep,
    isAnalysing, setIsAnalysing,
    showToast, triggerToast,
  } = useEvent();

  // Refs for smooth scroll targets
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const finalStepRef = useRef<HTMLDivElement>(null);
  const [highlightStep, setHighlightStep] = useState<number | null>(null);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // Poster canvas ref for hotspot drop
  const posterCanvasRef = useRef<HTMLDivElement>(null);
  const [draggingHotspotType, setDraggingHotspotType] = useState<HotspotType | null>(null);
  const [repositioningId, setRepositioningId] = useState<string | null>(null);

  // --- Feature 1: Smart CTA Scroll ---
  const scrollToNextStep = () => {
    const refs = [step1Ref, step2Ref, step3Ref, finalStepRef];
    const targetStep = Math.min(completedStep, 3);
    const targetRef = refs[targetStep];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setHighlightStep(targetStep + 1);
      setTimeout(() => setHighlightStep(null), 2000);
    }
  };

  // --- Feature 2: Poster Upload ---
  const handleFileSelect = async (file: File) => {
    if (!file.type.match(/image\/(jpeg|png)|application\/pdf/)) {
      triggerToast("Please upload a JPG, PNG, or PDF file");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setPosterImage(dataUrl);
      setCompletedStep(Math.max(completedStep, 1));
      // Trigger AI analysis
      await analyseImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const analyseImage = async (dataUrl: string) => {
    setIsAnalysing(true);
    try {
      const base64 = dataUrl.split(",")[1];
      const res = await fetch("/api/analyze-poster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });
      if (res.ok) {
        const data = await res.json();
        setExtractedData(data);
        setCompletedStep(Math.max(completedStep, 2));
        triggerToast("Poster analysed successfully");
        // Auto-scroll to Step 2
        setTimeout(() => {
          step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          setHighlightStep(2);
          setTimeout(() => setHighlightStep(null), 2000);
        }, 500);
      } else {
        triggerToast("Analysis failed — please try again");
      }
    } catch {
      triggerToast("Analysis failed — please try again");
    }
    setIsAnalysing(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelect(files[0]);
  };

  // --- Feature 2: AI Badge ---
  const isAiFilled = (field: string) => {
    return event.extractedData !== null && !event.aiFieldsEdited[field];
  };

  const handleFieldChange = (field: keyof typeof event.eventDetails, value: string) => {
    updateEventDetail(field, value);
    markFieldEdited(field);
  };

  // --- Feature 3: Hotspot Drag & Drop ---
  const handleHotspotDragStart = (type: HotspotType) => {
    setDraggingHotspotType(type);
  };

  const handlePosterDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handlePosterDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!posterCanvasRef.current) return;
    const rect = posterCanvasRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    if (repositioningId) {
      updateHotspot(repositioningId, { xPercent, yPercent });
      setRepositioningId(null);
    } else if (draggingHotspotType) {
      addHotspot({
        id: `hs-${Date.now()}`,
        type: draggingHotspotType,
        xPercent: Math.max(5, Math.min(95, xPercent)),
        yPercent: Math.max(5, Math.min(95, yPercent)),
      });
    }
    setDraggingHotspotType(null);
  };

  const handleHotspotRepositionStart = (e: React.DragEvent, id: string) => {
    setRepositioningId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  // Step completion helper
  const stepLabelClass = (step: number) =>
    cn(
      "font-label text-sm uppercase tracking-[0.3em] text-[var(--color-primary)] mb-4 block transition-all duration-700",
      highlightStep === step && "scale-110 text-[var(--color-primary-container)] drop-shadow-md"
    );

  return (
    <>
      <div className="w-full">
        {/* Toast */}
        {showToast && (
          <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-container)] text-white font-label text-sm uppercase tracking-widest rounded-sm shadow-2xl animate-[fadeInDown_0.3s_ease]">
            {showToast}
          </div>
        )}

        {/* Hero Section */}
        {activeTheme === "CONFERENCE" ? (
          /* Stitch "Memento Summit" hero — matches Conference Guest Invite imagery */
          <section className="relative h-[716px] flex items-center justify-center overflow-hidden px-6">
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover opacity-50"
                alt="Abstract deep space visualization with glowing neural network topology"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHhNsXxHOPwwMOWrwtz5mrfnaqg4Ti4kFjN83lD7AL0SR954qqMzSVgtZXnyXROHKPKgjmv6xrQtJSg94mGqY1JdL4tqvbHUhgcgDt9PWUbgys500Hvem9GDNC38YmTNJNPOyH8bJgeuiJb5XDeNdsNgwdRxeE5bRkb54x7cc7xhM_B1nOe0jnYp-h3n3NWaP8jJQfbhSF46BXnPXUUESj7UvLjYPhJL5XTeNRikzD8UuEq-Bc67JdA5K50OtKH4B6HnLvmATYiO8"
              />
              {/* Dark gradient overlay matching Stitch dark surface tokens */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/60 to-[#0b1326]/20" />
              {/* Cobalt radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(46,91,255,0.12)_0%,transparent_70%)]" />
            </div>
            <div className="relative z-10 text-center max-w-3xl">
              <span className="inline-block font-headline text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8c3ff] mb-6 px-3 py-1 bg-[#3f465c]/60 backdrop-blur-sm">
                Future Horizons Summit
              </span>
              <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-[#dae2fd]">
                Design the<br /><span className="text-[#2e5bff]">Future</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-[#c4c5d9] mb-12 max-w-xl mx-auto leading-relaxed">
                The architectural blueprint for the next decade of digital governance and cognitive computing. Configure your summit experience.
              </p>
              <button
                onClick={scrollToNextStep}
                className={cn("px-12 py-5 shadow-2xl shadow-[#2e5bff]/20 hover:brightness-110 active:scale-95 transition-all inline-block uppercase tracking-[0.2em] cursor-pointer border-none", theme.classes.heroPrimaryBtn, theme.fontHeadline, theme.uiShape)}
              >
                {completedStep > 0 ? "Continue Setup" : "Configure Summit"}
              </button>
            </div>
          </section>
        ) : (
          <section className="relative h-[716px] flex items-center justify-center overflow-hidden px-6">
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover opacity-60"
                alt="luxury event venue"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCViL53Txk6nPAn3wOYoP7C7TH6GzK5V8Yp2ZoQLHxBXeJveg7OZe8U4YW4NrYG1nPh9flNXLB6a8KaYO_QtOSr7RaZrcyQ0nKtVwjht9uwM3_CA1CdiAu9bcehJpdLviweXV7q_AwHcXCGJwwFxFUObE3qi7cqgyy63YaI7HVvB0KORg5SlirfnS4xJCdQ74KxA6h6RNsE8ZRtX7t3tu7gHqEKdzCAMNuY8sMRujBK6aXPp13NEJrRGOv8q-TFeGbCq2QdewBqOTY"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f2] via-[#fbf9f2]/70 to-[#fbf9f2]/30" />
            </div>
            <div className="relative z-10 text-center max-w-3xl">
              <h1 className="font-headline text-6xl md:text-8xl tracking-tight leading-tight mb-8">Host with <span className="italic">Intention</span></h1>
              <p className="font-body text-lg md:text-xl text-[var(--color-secondary)] mb-12 max-w-xl mx-auto tracking-wide leading-relaxed">
                Transform your gathering into a digital sanctuary of memories. Create an immersive experience for your guests.
              </p>
              <button
                onClick={scrollToNextStep}
                className={cn("px-12 py-5 shadow-xl hover:brightness-110 transition-all inline-block uppercase tracking-[0.2em] cursor-pointer border-none", theme.classes.heroPrimaryBtn, theme.fontHeadline, theme.uiShape)}
              >
                {completedStep > 0 ? "Continue Setup" : "Create your first event"}
              </button>
            </div>
          </section>
        )}

        {/* Onboarding Flow */}
        <section className="bg-[var(--color-surface-container-low)] py-24" id="onboarding">
          <div className="max-w-6xl mx-auto px-6">

            {/* Step 1: Upload Poster */}
            <div className="mb-32 grid md:grid-cols-2 gap-16 items-center" ref={step1Ref} id="step-1">
              <div>
                <span className={stepLabelClass(1)}>Step 1</span>
                <h2 className="font-headline text-4xl md:text-5xl mb-6">Upload Your Poster</h2>
                <p className="text-[var(--color-secondary)] text-lg mb-8 leading-relaxed">
                  Your invitation is the first glimpse into the magic. Upload a high-resolution JPG, PNG or PDF file to set the tone.
                </p>
                {event.posterImage && (
                  <button
                    onClick={() => { setPosterImage(''); fileInputRef.current?.click(); }}
                    className="flex items-center gap-2 px-6 py-3 border border-[var(--color-outline-variant)] bg-transparent font-label text-xs uppercase tracking-widest text-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-surface-container)] transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    Re-analyse Poster
                  </button>
                )}
              </div>
              <div className="relative group">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />

                {isAnalysing ? (
                  /* Analysing State */
                  <div className="aspect-[3/4] bg-[var(--color-surface)] flex flex-col items-center justify-center p-12 border border-[var(--color-outline-variant)]/40">
                    <div className="relative mb-8">
                      <div className="w-16 h-16 rounded-full border-2 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] animate-spin"></div>
                      <span className="material-symbols-outlined text-[var(--color-primary)] absolute inset-0 flex items-center justify-center">auto_awesome</span>
                    </div>
                    <p className="font-headline text-xl text-[var(--color-primary)] mb-2">Analysing your invite…</p>
                    <p className="text-sm text-[var(--color-secondary)]">AI is reading your poster</p>
                    <div className="mt-6 w-48 h-1 bg-[var(--color-surface-container-high)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-container)] rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" style={{width: '60%'}}></div>
                    </div>
                  </div>
                ) : event.posterImage ? (
                  /* Uploaded Poster Preview */
                  <div className="w-fit max-w-full mx-auto relative shadow-2xl border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] flex justify-center items-center">
                    <img src={event.posterImage} alt="Uploaded poster" className="max-w-full max-h-[60vh] h-auto block" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--color-primary)]/90 text-white font-label text-[10px] uppercase tracking-widest rounded-sm">
                      ✓ Uploaded
                    </div>
                  </div>
                ) : (
                  /* Upload Drop Zone */
                  <div
                    className={cn(
                      "aspect-[3/4] border-2 border-dashed bg-[var(--color-surface)] flex flex-col items-center justify-center p-12 transition-all cursor-pointer",
                      isDraggingFile ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 scale-[1.02]" : "border-[var(--color-outline-variant)]/40 hover:bg-[var(--color-surface-container-highest)]"
                    )}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
                    onDragLeave={() => setIsDraggingFile(false)}
                    onDrop={handleDrop}
                  >
                    <span className="material-symbols-outlined text-5xl text-[var(--color-outline)] mb-4">add_photo_alternate</span>
                    <p className="font-label text-sm uppercase tracking-widest text-[var(--color-outline)] mb-2">Drop your files here</p>
                    <p className="text-xs text-[var(--color-outline-variant)]">JPG, PNG, or PDF</p>
                  </div>
                )}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--color-primary-container)]/20 -z-10"></div>
              </div>
            </div>

            {/* Step 2: Event Details */}
            <div className="mb-32" ref={step2Ref} id="step-2">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className={stepLabelClass(2)}>Step 2</span>
                <h2 className="font-headline text-4xl md:text-5xl mb-6">Define the Occasion</h2>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                {/* Event Name */}
                <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="font-label text-sm uppercase tracking-widest text-[var(--color-primary)]">Event Name</label>
                    {isAiFilled("eventName") && <span className="px-2 py-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-container)] text-white text-[9px] font-label uppercase tracking-widest rounded-sm">AI filled</span>}
                  </div>
                  <input
                    className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-headline text-2xl placeholder:text-[var(--color-outline-variant)]/60"
                    placeholder="The Montgomery Gala"
                    type="text"
                    value={event.eventDetails.eventName}
                    onChange={(e) => handleFieldChange("eventName", e.target.value)}
                  />
                </div>
                {/* Event Theme */}
                <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                  <label className="font-label text-sm uppercase tracking-widest text-[var(--color-primary)] mb-2">Event Theme</label>
                  <select
                    className={cn("bg-transparent border-none p-0 focus:ring-0 focus:outline-none appearance-none cursor-pointer outline-none w-full", theme.fontHeadline, theme.classes.primaryText)}
                    value={activeTheme}
                    onChange={(e) => setTheme(e.target.value as ThemeType)}
                  >
                    <option value="ATELIER">Digital Atelier (Gold & Ivory)</option>
                    <option value="CONFERENCE">Professional (Cobalt)</option>
                    <option value="JUBILEE">Electric Jubilee (Neon)</option>
                    <option value="REVEAL">The Great Reveal (Pastels)</option>
                  </select>
                </div>
                {/* Date & Time */}
                <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="font-label text-sm uppercase tracking-widest text-[var(--color-primary)]">Date &amp; Time</label>
                    {isAiFilled("dateTime") && <span className="px-2 py-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-container)] text-white text-[9px] font-label uppercase tracking-widest rounded-sm">AI filled</span>}
                  </div>
                  <input
                    className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-headline text-2xl placeholder:text-[var(--color-outline-variant)]/60"
                    placeholder="September 24, 2024 • 7:00 PM"
                    type="text"
                    value={event.eventDetails.dateTime}
                    onChange={(e) => handleFieldChange("dateTime", e.target.value)}
                  />
                </div>
                {/* Location */}
                <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="font-label text-sm uppercase tracking-widest text-[var(--color-primary)]">Location</label>
                    {isAiFilled("location") && <span className="px-2 py-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-container)] text-white text-[9px] font-label uppercase tracking-widest rounded-sm">AI filled</span>}
                  </div>
                  <input
                    className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-headline text-2xl placeholder:text-[var(--color-outline-variant)]/60"
                    placeholder="The Glass House, New York"
                    type="text"
                    value={event.eventDetails.location}
                    onChange={(e) => handleFieldChange("location", e.target.value)}
                  />
                </div>
                {/* RSVP Deadline */}
                <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="font-label text-sm uppercase tracking-widest text-[var(--color-primary)]">RSVP Deadline</label>
                    {isAiFilled("rsvpDeadline") && <span className="px-2 py-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-container)] text-white text-[9px] font-label uppercase tracking-widest rounded-sm">AI filled</span>}
                  </div>
                  <input
                    className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-headline text-2xl placeholder:text-[var(--color-outline-variant)]/60"
                    placeholder="August 15, 2024"
                    type="text"
                    value={event.eventDetails.rsvpDeadline}
                    onChange={(e) => handleFieldChange("rsvpDeadline", e.target.value)}
                  />
                </div>
                {/* Dress Code */}
                <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="font-label text-sm uppercase tracking-widest text-[var(--color-primary)]">Dress Code</label>
                    {isAiFilled("dressCode") && <span className="px-2 py-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-container)] text-white text-[9px] font-label uppercase tracking-widest rounded-sm">AI filled</span>}
                  </div>
                  <input
                    className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-headline text-2xl placeholder:text-[var(--color-outline-variant)]/60"
                    placeholder="Black Tie Optional"
                    type="text"
                    value={event.eventDetails.dressCode}
                    onChange={(e) => handleFieldChange("dressCode", e.target.value)}
                  />
                </div>
              </form>
              {event.extractedData && (
                <div className="max-w-4xl mx-auto mt-8 text-center">
                  <button
                    onClick={() => setCompletedStep(Math.max(completedStep, 2))}
                    className="mt-4 text-xs font-label uppercase tracking-widest text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Fields look good? Scroll down to place hotspots →
                  </button>
                </div>
              )}
            </div>

            {/* Step 3: Interactive Hotspots */}
            <div className="mb-32" ref={step3Ref} id="step-3">
              <div className="mb-12">
                <span className={stepLabelClass(3)}>Step 3</span>
                <h2 className="font-headline text-4xl md:text-5xl mb-6 text-center md:text-left">Interactive Hotspots</h2>
                <p className="text-[var(--color-secondary)] text-lg text-center md:text-left">Place buttons on your poster for guests to contribute memories in real-time.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 relative overflow-hidden bg-[var(--color-surface-container-high)] p-8 shadow-inner">
                  {/* Poster Canvas with Hotspots */}
                  <div
                    ref={posterCanvasRef}
                    className="w-fit max-w-[400px] mx-auto relative shadow-2xl overflow-hidden border border-[var(--color-outline-variant)]/20"
                    onDragOver={handlePosterDragOver}
                    onDrop={handlePosterDrop}
                  >
                    <img
                      className="max-w-full h-auto block"
                      alt="event poster"
                      src={event.posterImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBU4lE7nuHDEUNMrpp8qHAkLZjLRw6KEHSmkGIfbeMp7cAqJr0Y7e7WYmr3jk7y2jq4BbVJwKA6XOIvFBpR4zbjwuhAZ_82LWLEPBXI8MQ_Y6yrBSUlgi1wGGQtecw7gZeIsWI2FbPc4OxML87ouw5jRkEtF7YYmt2meujIzLtq7_lziCrwSwtyIkkNT81sFWj8owvcy3GYu2VdElbqvk34fyb2hC8MlNkUX5vZn7iaZthOP2_Rih2hRcVF5xSevLlOk1Nzfq7hOaA"}
                    />
                    {/* Placed Hotspots */}
                    {event.hotspots.map((hs) => (
                      <div
                        key={hs.id}
                        draggable
                        onDragStart={(e) => handleHotspotRepositionStart(e, hs.id)}
                        className="absolute group cursor-grab active:cursor-grabbing"
                        style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%`, transform: "translate(-50%, -50%)" }}
                      >
                        <button className={cn("w-12 h-12 flex items-center justify-center transition-all shadow-lg backdrop-blur-md border relative", theme.uiShape, theme.classes.hotspotContainer)}>
                          <span className={cn("material-symbols-outlined text-sm", theme.classes.hotspotIcon)}>{HOTSPOT_META[hs.type].icon}</span>
                          {/* Delete button */}
                          <button
                            onClick={(e) => { e.stopPropagation(); removeHotspot(hs.id); }}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-none cursor-pointer leading-none"
                          >×</button>
                        </button>
                        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] font-label uppercase tracking-wider text-white bg-black/60 px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          {HOTSPOT_META[hs.type].label}
                        </span>
                      </div>
                    ))}
                    {/* Drop zone indicator */}
                    {(draggingHotspotType || repositioningId) && (
                      <div className="absolute inset-0 border-2 border-dashed border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5 flex items-center justify-center pointer-events-none z-20">
                        <span className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] bg-white/80 px-4 py-2 rounded">Drop here</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Placement Guide Sidebar */}
                <div className="space-y-6">
                  <div className="p-6 bg-[var(--color-surface-container-highest)]">
                    <h3 className="font-label text-md uppercase tracking-widest text-[var(--color-primary)] mb-4">Placement Guide</h3>
                    <p className="text-sm text-[var(--color-secondary)] mb-6 leading-relaxed">Drag icons onto your invitation to enable specific guest actions.</p>
                    <div className="space-y-4">
                      {(["selfie", "video", "voice"] as HotspotType[]).map((type) => (
                        <div
                          key={type}
                          draggable
                          onDragStart={() => handleHotspotDragStart(type)}
                          onDragEnd={() => setDraggingHotspotType(null)}
                          className="flex items-center gap-4 p-3 bg-[var(--color-surface)] border border-[var(--color-outline-variant)]/30 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-[var(--color-primary)]/30 transition-all select-none"
                        >
                          <span className="material-symbols-outlined text-[var(--color-primary)]">{HOTSPOT_META[type].icon}</span>
                          <span className="font-label text-sm tracking-wider">{HOTSPOT_META[type].label}</span>
                          <span className="material-symbols-outlined text-[var(--color-outline-variant)] ml-auto text-sm">drag_indicator</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {event.hotspots.length > 0 && (
                    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-outline-variant)]/20">
                      <p className="text-[10px] font-label uppercase tracking-widest text-[var(--color-secondary)] mb-3">Placed ({event.hotspots.length})</p>
                      {event.hotspots.map((hs) => (
                        <div key={hs.id} className="flex items-center justify-between py-2 border-b border-[var(--color-outline-variant)]/10 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-[var(--color-primary)]">{HOTSPOT_META[hs.type].icon}</span>
                            <span className="text-xs">{HOTSPOT_META[hs.type].label}</span>
                          </div>
                          <button onClick={() => removeHotspot(hs.id)} className="material-symbols-outlined text-sm text-[var(--color-outline)] hover:text-red-500 cursor-pointer bg-transparent border-none">close</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Final Step: Invite Guests */}
            <div className="max-w-4xl mx-auto bg-[var(--color-surface)] p-12 shadow-sm" ref={finalStepRef} id="step-final">
              <span className={stepLabelClass(4)}>Final Step</span>
              <h2 className="font-headline text-4xl mb-8">Invite Guests</h2>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="font-label text-sm uppercase tracking-widest text-[var(--color-primary)] mb-2 block">CSV Import</label>
                    <div className="border border-[var(--color-outline-variant)]/40 p-6 flex flex-col items-center justify-center hover:bg-[var(--color-surface-container-low)] transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[var(--color-outline)] mb-2">upload_file</span>
                      <p className="text-xs font-label uppercase tracking-widest text-[var(--color-outline)]">Upload List</p>
                    </div>
                  </div>
                  <div>
                    <label className="font-label text-sm uppercase tracking-widest text-[var(--color-primary)] mb-2 block">Manual Entry</label>
                    <textarea className="w-full bg-[var(--color-surface-container-low)] border-none focus:ring-0 font-body text-sm p-4 placeholder:text-[var(--color-outline-variant)] outline-none" placeholder="guest@email.com, another@email.com" rows={3}></textarea>
                  </div>
                </div>
                <div className="pt-12 flex justify-center">
                  <Link
                    href="/dashboard"
                    className={cn("px-16 py-6 font-label text-md uppercase tracking-[0.3em] shadow-2xl hover:brightness-110 active:scale-95 transition-all outline-none border-none cursor-pointer inline-block no-underline", theme.classes.heroPrimaryBtn, theme.uiShape)}
                  >
                    Generate Invite
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}} />
    </>
  );
}
