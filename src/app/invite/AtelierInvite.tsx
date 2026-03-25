"use client";
import Link from "next/link";
import { useState } from "react";
import { useEvent } from "@/context/EventContext";
import { HotspotType } from "@/lib/eventTypes";

const HOTSPOT_ICONS: Record<HotspotType, string> = {
  selfie: "photo_camera", video: "videocam", voice: "mic",
};
const HOTSPOT_LABELS: Record<HotspotType, string> = {
  selfie: "Take a Selfie", video: "Record Video", voice: "Leave Voice Note",
};

export default function GuestInvite() {
  const { event } = useEvent();
  const [activeModal, setActiveModal] = useState<HotspotType | null>(null);
  const details = event.eventDetails;
  const posterSrc = event.posterImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuCT9RhYJ7h9Lzq05D_TneyesmfVcpd4m_-qI_rIoIsrfA6gCO6mB3vKpe_pB3VBWX8J7Mfcc7muAFBwz7furI3N_Kc-OYvVhu2izb6vE9OsYGCbTmmziKZ5-Iml4nsMn4e73qPTf1dCNLEkxXcDw8B2d1IgxMVcRkZl16PaWD_r6zz0jQI1HLOL5rqRlLUOTJiGhmAeCLBSfB4snOPVpdGIuRcvxg9bxl3NwZIxoMpluVq3Rye4DGzfQ5WuObavrgUvxkwboYWCAko";

  return (
    <>
      {/* Upload Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>
          <div className="relative bg-white p-8 max-w-md w-full mx-4 shadow-2xl rounded-sm z-10 text-center">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 material-symbols-outlined text-[var(--color-secondary)] hover:text-[var(--color-on-surface)] cursor-pointer bg-transparent border-none">close</button>
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-4 block">{HOTSPOT_ICONS[activeModal]}</span>
            <h3 className="font-headline text-2xl mb-2">{HOTSPOT_LABELS[activeModal]}</h3>
            <p className="text-sm text-[var(--color-secondary)] mb-6">{
              activeModal === 'selfie' ? 'Strike a pose and share your moment!' :
              activeModal === 'video' ? 'Record a heartfelt video message.' :
              'Leave a voice note for the host.'
            }</p>
            <label className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-[var(--color-outline-variant)]/40 cursor-pointer hover:bg-[var(--color-surface-container-low)] transition-colors">
              <span className="material-symbols-outlined text-3xl text-[var(--color-outline)] mb-2">{activeModal === 'voice' ? 'mic' : 'upload'}</span>
              <span className="text-xs font-label uppercase tracking-widest text-[var(--color-outline)]">{activeModal === 'voice' ? 'Tap to Record' : 'Choose File'}</span>
              <input type="file" className="hidden" accept={activeModal === 'selfie' ? 'image/*' : activeModal === 'video' ? 'video/*' : 'audio/*'} />
            </label>
          </div>
        </div>
      )}

      <div className="pb-20">
        <section className="px-4 md:px-12 max-w-5xl mx-auto mb-20 relative">
          <div className="relative group aspect-[3/4] md:aspect-[16/9] overflow-hidden bg-[var(--color-surface-container-low)] shadow-2xl shadow-on-surface/5">
            <img
              alt="Event Poster"
              className="w-full h-full object-cover"
              src={posterSrc}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-[#1b1c18]/60 to-transparent">
              <h1 className="font-headline text-4xl md:text-7xl text-white mb-2 leading-tight tracking-tight">{details.eventName || "The Midsummer"} <br/>Gathering</h1>
              <p className="font-body text-white/90 uppercase tracking-[0.3em] text-xs md:text-sm">{details.dateTime || "August 24th, 2024"} • {details.location || "Provence, FR"}</p>
            </div>
            {/* Dynamic Hotspots from EventContext */}
            {event.hotspots.length > 0 ? (
              event.hotspots.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => setActiveModal(hs.type)}
                  className="cursor-pointer absolute w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all active:scale-95"
                  style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%`, transform: "translate(-50%, -50%)" }}
                  title={HOTSPOT_LABELS[hs.type]}
                >
                  <span className="material-symbols-outlined">{HOTSPOT_ICONS[hs.type]}</span>
                </button>
              ))
            ) : (
              /* Fallback static hotspots */
              <div className="absolute top-8 right-8 flex flex-col gap-4">
                <button onClick={() => setActiveModal('selfie')} className="cursor-pointer w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all active:scale-95" title="Take a Selfie">
                  <span className="material-symbols-outlined">photo_camera</span>
                </button>
                <button onClick={() => setActiveModal('video')} className="cursor-pointer w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all active:scale-95" title="Record Video">
                  <span className="material-symbols-outlined">videocam</span>
                </button>
                <button onClick={() => setActiveModal('voice')} className="cursor-pointer w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all active:scale-95" title="Leave Voice Note">
                  <span className="material-symbols-outlined">mic</span>
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 mb-24 text-center">
          <span className="font-label uppercase tracking-[0.2em] text-xs text-[var(--color-secondary)] mb-4 block">Will you join us?</span>
          <h2 className="font-headline text-3xl md:text-5xl mb-12 text-[var(--color-primary)]">Kindly Respond</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch md:items-center">
            <button className="cursor-pointer border-none px-8 py-5 bg-gradient-to-br from-[#735c00] to-[#d4af37] text-white font-label uppercase tracking-widest text-sm hover:opacity-90 transition-all active:scale-95">
              Attending
            </button>
            <button className="cursor-pointer px-8 py-5 border border-[var(--color-outline-variant)]/40 font-headline italic text-lg text-[var(--color-on-surface)] hover:bg-[var(--color-primary)]/5 transition-all bg-transparent">
              Maybe
            </button>
            <button className="cursor-pointer px-8 py-5 border border-[var(--color-outline-variant)]/40 font-label uppercase tracking-widest text-sm text-[var(--color-on-surface)]/60 hover:text-[var(--color-error)] transition-all bg-transparent">
              Not Attending
            </button>
          </div>
          
          <div className="mt-16 p-8 bg-[var(--color-surface-container-high)] flex flex-col items-center gap-4">
            <span className="font-label uppercase tracking-widest text-xs text-[var(--color-on-surface)]/40">Day of the event</span>
            <button className="cursor-pointer flex items-center gap-3 px-6 py-3 bg-white border border-[var(--color-outline-variant)]/20 shadow-sm rounded-full text-[var(--color-secondary)] hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[var(--color-primary)]">check_circle</span>
              <span className="font-label text-sm font-semibold tracking-wider uppercase">Tap to Check-In</span>
            </button>
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-6 mb-32">
          <h3 className="font-headline text-2xl mb-12 text-center text-[var(--color-on-surface)]">The Evening Itinerary</h3>
          <div className="space-y-0">
            <div className="relative pl-12 pb-16 border-l border-[var(--color-outline-variant)]/30">
              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[var(--color-primary-container)]"></div>
              <div className="flex flex-col">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-1">17:00</span>
                <h4 className="font-headline text-xl text-[var(--color-on-surface)]">Welcome Drinks</h4>
                <p className="font-body text-[#454545]/70 text-sm mt-1">Champagne and hors d&apos;oeuvres on the North Terrace.</p>
              </div>
            </div>
            <div className="relative pl-12 pb-16 border-l border-[var(--color-outline-variant)]/30">
              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[var(--color-primary)]"></div>
              <div className="flex flex-col">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-1">18:30</span>
                <h4 className="font-headline text-xl text-[var(--color-on-surface)]">Main Ceremony</h4>
                <p className="font-body text-[#454545]/70 text-sm mt-1">A private blessing in the Olive Grove.</p>
              </div>
            </div>
            <div className="relative pl-12 pb-16 border-l border-[var(--color-outline-variant)]/30">
              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[var(--color-primary-container)]"></div>
              <div className="flex flex-col">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-1">20:00</span>
                <h4 className="font-headline text-xl text-[var(--color-on-surface)]">Grand Dinner</h4>
                <p className="font-body text-[#454545]/70 text-sm mt-1">A curated five-course tasting menu under the stars.</p>
              </div>
            </div>
            <div className="relative pl-12">
              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[var(--color-secondary)]"></div>
              <div className="flex flex-col">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-1">22:30</span>
                <h4 className="font-headline text-xl text-[var(--color-on-surface)]">Dance &amp; Dessert</h4>
                <p className="font-body text-[#454545]/70 text-sm mt-1">Live jazz ensemble followed by artisan sweets.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-surface-container-low)] py-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="font-headline text-2xl text-[var(--color-on-surface)]">Guest Moments</h3>
                <p className="font-body text-sm text-[var(--color-secondary)]">A collaborative gallery of our evening together.</p>
              </div>
              <button className="bg-transparent border-none font-label text-[10px] uppercase tracking-widest text-[var(--color-primary)] border-b border-[var(--color-primary)]/20 pb-1 cursor-pointer">View Full Gallery</button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-8 snap-x no-scrollbar" style={{scrollbarWidth: "none", msOverflowStyle: "none"}}>
              <div className="flex-none w-64 snap-start aspect-[4/5] bg-[var(--color-surface)] relative group">
                <img className="w-full h-full object-cover" alt="Candid photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIca4VdCZzJgEJ7c0vE5g77Jfk5z9ps7No3SLu0QxF5E6P-l19vizpkUyWwbSAWKhwNP7jZangokxvsvOd8fKrQcviefqo0tz-kb0EUqzDf_8zUGBc0sXtSNeOFVYCgcXnznKQgvGoHBQ62T7hmy2Y09-ljk7D51xcsvsQRR8OrC_VMBnrkRd7aAsMnN9gFRh6FEiqhywu5u7Pxn5rZWinJXiRJkC8a3nPpxwa1NCzQnAR6xlwhOwnw5K2GaIMIq4k3RZfrOtDroc"/>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/40"></div>
                  <span className="text-[10px] font-label text-white uppercase tracking-wider">Julian M.</span>
                </div>
              </div>
              <div className="flex-none w-64 snap-start aspect-[4/5] bg-[var(--color-surface)] relative group">
                <img className="w-full h-full object-cover" alt="Detail shot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPsVsdwrOMJtZWcmS7IajXxdvgNfQ53zW8UrWx3ELG8rQko1uSgHcbPpwKpnDGFroKr690Moy8mbT_weFXXSD_7t75e2ByRICuo8j2WcmWQPdXWW7uENzyJQcfUN6m4KLQP_T2JMfWDfeKyk9IWJAcIK-iIc1jJMUJIz7aD-GZNH5L5vR8dtKqbgF5pQlJjQNBzrS8pYFSKNDq-R3nHoZXL3rWTCFMhDlSpUX866GMGoFZlx9M48bPaFfdlvT6W0Rj5uO4g7TiTE0"/>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/40"></div>
                  <span className="text-[10px] font-label text-white uppercase tracking-wider">Sophia L.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Nav Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-[#fbf9f2]/95 backdrop-blur-lg flex justify-around items-center py-4 px-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button className="bg-transparent border-none flex flex-col items-center gap-1 text-[#70615c] cursor-pointer">
          <span className="material-symbols-outlined text-2xl">auto_stories</span>
          <span className="text-[9px] font-label uppercase tracking-widest">Story</span>
        </button>
        <button className="bg-transparent border-none flex flex-col items-center gap-1 text-[#70615c] cursor-pointer">
          <span className="material-symbols-outlined text-2xl">calendar_month</span>
          <span className="text-[9px] font-label uppercase tracking-widest">Itinerary</span>
        </button>
        <button className="bg-transparent border-none flex flex-col items-center gap-1 text-[#735c00] cursor-pointer">
          <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>mail</span>
          <span className="text-[9px] font-label uppercase tracking-widest">RSVP</span>
        </button>
        <button className="bg-transparent border-none flex flex-col items-center gap-1 text-[#70615c] cursor-pointer">
          <span className="material-symbols-outlined text-2xl">photo_library</span>
          <span className="text-[9px] font-label uppercase tracking-widest">Memories</span>
        </button>
      </nav>
    </>
  );
}
