import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Main Content Area: The Digital Atelier Canvas */}
      <div className="flex-grow pb-12 px-4 md:px-12 flex flex-col items-center justify-center pt-4">
        {/* Booklet Header Meta */}
        <div className="mb-12 text-center max-w-2xl">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)] mb-3">Volume 01 — Digital Keepsake</p>
          <h1 className="font-headline text-4xl md:text-5xl tracking-tight text-[var(--color-primary)]">The Julian &amp; Clara Wedding</h1>
          <div className="h-[1px] w-12 bg-[var(--color-outline-variant)] mx-auto mt-6 opacity-40"></div>
        </div>

        {/* The "Book" Spread Container */}
        <div className="relative w-full max-w-6xl aspect-[1.4/1] md:aspect-[1.6/1] bg-[var(--color-surface-container-lowest)] shadow-2xl flex overflow-hidden ring-1 ring-black/5">
          {/* Left Navigation Trigger (Floating) */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition-colors">
            <span className="material-symbols-outlined text-4xl">chevron_left</span>
          </button>

          {/* Spread: Left Page */}
          <div className="relative w-1/2 h-full bg-[var(--color-surface-bright)] flex flex-col border-r border-[var(--color-outline-variant)]/10 paper-texture">
            <div className="absolute inset-0 page-shadow-right pointer-events-none"></div>
            
            {/* Guest Photo (Bleed) */}
            <div className="flex-grow p-12 pb-0">
              <div className="w-full h-full relative overflow-hidden group">
                <img 
                  className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700" 
                  alt="Elegant close-up portrait" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzHruXrg7M6cwqThKkiQsYYxIcJzMFb-KSrT6i1bgoreMVm-N2Mw2lFxI86XtOrqYZHsenCxlVXSRj6hBH6ZYzHDMUN_e0dgqtO_yr3lQqTTmXi5b2zzmC5PF8SN7QQbhmeHJq398HvOy98xZhk3OfufY0EHj3af0wlzOd_dTEZmxiLKKrTJyy1IW-5Y29q-bfx8ns3eR7DAk2sOwnNjDhuE0rX-o9m3BnxvUy4tCbJFjHftc4uQELXW-pjNxvxo_RdIABLBTb5w4"
                />
              </div>
            </div>

            {/* Quote Section */}
            <div className="p-12 pt-8">
              <h3 className="font-label text-[10px] uppercase tracking-[0.25em] text-[var(--color-outline)] mb-4">Guest Portrait: Elena Vance</h3>
              <p className="font-headline text-2xl italic leading-relaxed text-[var(--color-on-surface)]">
                &quot;Seeing the way you two looked at each other during the vows... it was like the rest of the world simply faded away. Pure magic.&quot;
              </p>
            </div>
            
            {/* Page Number (Left) */}
            <div className="absolute bottom-6 left-8 font-label text-[9px] tracking-[0.1em] text-[var(--color-outline)]">PAGE 014</div>
          </div>

          {/* Central Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-black/5 z-10"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-24 -translate-x-1/2 spine-shadow z-10 pointer-events-none"></div>

          {/* Spread: Right Page */}
          <div className="relative w-1/2 h-full bg-[var(--color-surface-bright)] flex flex-col paper-texture">
            <div className="absolute inset-0 page-shadow-left pointer-events-none"></div>
            
            {/* Video / Media Section */}
            <div className="p-12 pb-8 h-3/5">
              <div className="relative w-full h-full bg-[var(--color-surface-container-high)] group cursor-pointer overflow-hidden ring-1 ring-black/5">
                <img 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                  alt="Wide shot of a wedding reception dance floor" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4VauEacgdBEITIw_HR9bYerS2L2dO-zAx5CYnr7c913HKnARPDFdsGZq5TrBsibv81q6PbI3pL6Le0IQisRP2DmVrJ-rzSt4wsUqMx9Iqzz1-vMZvVKurjnaZoKLVUf7mMhPWRuTvAuy-j7jBu3T_0n92TyGKCBeqHqs0Ho8rkeL-y3y1Z7s3Ej73VO9zOynfgu3sVAAC7_kXyiX5NQ0gMCwCjguIqLrco96MdwfbkzLus5kOZnvkzPpsRBjXUvUUU5bIwh82KaY"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/90 text-[var(--color-on-primary)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                </div>
                {/* Meta Tag */}
                <div className="absolute bottom-4 left-4 bg-white/60 backdrop-blur-sm px-3 py-1 text-[9px] font-label uppercase tracking-widest text-[#1b1c18]">Original Clip: 0:42</div>
              </div>
            </div>

            {/* Caption & Message Section */}
            <div className="px-12 pb-12 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-headline text-lg mb-4 text-[var(--color-primary)]">A Message from the Heart</h4>
                <p className="font-body text-sm leading-relaxed text-[var(--color-on-surface-variant)] max-w-sm mb-6">
                  Elena left this note during the cocktail hour. You can hear the sounds of the jazz band in the background and the laughter of friends. It captures the atmosphere perfectly.
                </p>
                <a className="inline-flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] hover:text-[var(--color-primary-container)] transition-colors group" href="#">
                  <span className="material-symbols-outlined text-sm">graphic_eq</span>
                  Listen to original voice note
                  <span className="material-symbols-outlined text-xs translate-x-0 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Page Number (Right) */}
            <div className="absolute bottom-6 right-8 font-label text-[9px] tracking-[0.1em] text-[var(--color-outline)]">PAGE 015</div>
          </div>

          {/* Right Navigation Trigger (Floating) */}
          <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition-colors">
            <span className="material-symbols-outlined text-4xl">chevron_right</span>
          </button>
          
          {/* Page Flip Hint (Bottom Corner) */}
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-black/5 to-transparent pointer-events-none"></div>
        </div>

        {/* Action Bar: The "Desk" Controls */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 items-center">
          <button className="px-10 py-4 bg-gradient-to-r from-[#735c00] to-[#d4af37] text-white font-label text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all flex items-center gap-3 active:scale-95 cursor-pointer border-none">
            <span className="material-symbols-outlined text-lg">ios_share</span>
            Share Booklet
          </button>
          <button className="px-10 py-4 border border-[var(--color-outline-variant)] hover:bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-label text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 cursor-pointer">
            <span className="material-symbols-outlined text-lg">download</span>
            Download Digital Keepsake
          </button>
        </div>
      </div>
    </>
  );
}
