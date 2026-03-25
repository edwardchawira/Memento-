import React from "react";

export default function ConferenceInvite() {
  return (
    <div className="bg-[#0b1326] text-[#dae2fd] min-h-screen w-full pb-20">
      {/* Hero & Poster Section */}
      <section className="relative min-h-[795px] flex flex-col items-center justify-center px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1326] via-transparent to-[#0b1326] z-10"></div>
          <img 
            className="w-full h-full object-cover opacity-40" 
            alt="Abstract deep space visualization with glowing neural networks" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHhNsXxHOPwwMOWrwtz5mrfnaqg4Ti4kFjN83lD7AL0SR954qqMzSVgtZXnyXROHKPKgjmv6xrQtJSg94mGqY1JdL4tqvbHUhgcgDt9PWUbgys500Hvem9GDNC38YmTNJNPOyH8bJgeuiJb5XDeNdsNgwdRxeE5bRkb54x7cc7xhM_B1nOe0jnYp-h3n3NWaP8jJQfbhSF46BXnPXUUESj7UvLjYPhJL5XTeNRikzD8UuEq-Bc67JdA5K50OtKH4B6HnLvmATYiO8"
          />
        </div>
        <div className="relative z-20 w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block py-1 px-3 bg-[#3f465c] text-[#adb4ce] font-label text-[10px] tracking-[0.2em] uppercase mb-6">Exclusive Invitation</span>
            <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter text-[#dae2fd] leading-[0.9] mb-8">
              FUTURE<br/><span className="text-[#2e5bff]">HORIZONS</span><br/>SUMMIT
            </h1>
            <p className="max-w-md text-[#c4c5d9] text-lg leading-relaxed mb-10">
              The architectural blueprint for the next decade of digital governance and cognitive computing. Join the elite cohort shaping tomorrow.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-br from-[#2e5bff] to-[#b8c3ff] text-[#efefff] px-8 py-4 font-headline font-extrabold uppercase text-sm tracking-widest shadow-2xl border-none cursor-pointer">
                Accept Invite
              </button>
              <button className="border border-[#434656]/30 text-[#dae2fd] bg-transparent cursor-pointer px-8 py-4 font-headline font-extrabold uppercase text-sm tracking-widest hover:bg-[#31394d]/20 transition-all">
                Decline
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-[#2e5bff]/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative aspect-[3/4] bg-[#2d3449] shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-[#434656]/15 overflow-hidden">
              <img 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="Sleek high-tech conference poster" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFP_184QIkiv72zjKnP2SQmm2z5Ss12dhRJLAzD3YrcF74x8jOwIGAIgGEzMjuSiQNNB_c-dL0hS2XLP9kGshalT81_A1Pmc95Atb23ITw-iHiPEbQ318UbY3BezIds1jy-X0WuQYqp_t-7fN7ZYBv5txpF5vICThQE9wgdt6HE31Q7jpSuPIon9LYrd-yyEzoqFeOjP8lq_GHWE5pOFasmS4VNByRQr5URJ1SVC2EHk0DUizaPr_JeCY1WOYIdjchABDGomc-IDM"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#0b1326]/90 to-transparent">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-widest text-[#b8c3ff]">Location</p>
                    <p className="font-headline font-bold text-xl text-[#dae2fd]">The Monolith, NYC</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label text-[10px] uppercase tracking-widest text-[#b8c3ff]">Date</p>
                    <p className="font-headline font-bold text-xl text-[#dae2fd]">Nov 24-26</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotspot Actions */}
      <section className="py-24 px-8 bg-[#060e20]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Voice Q&A Hotspot */}
          <div className="group relative cursor-pointer overflow-hidden bg-[#171f33] border border-[#434656]/10 p-10 h-64 flex flex-col justify-between hover:bg-[#31394d] transition-colors duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2e5bff]/10 rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
            <span className="material-symbols-outlined text-4xl text-[#b8c3ff]">mic_external_on</span>
            <div>
              <h3 className="font-headline font-bold text-2xl mb-2 text-[#dae2fd]">Session Q&amp;A</h3>
              <p className="text-[#c4c5d9] text-sm mb-6 max-w-xs">Drop a voice message to the keynote speakers before the event starts.</p>
              <button className="bg-transparent border-none p-0 flex items-center gap-2 font-label text-xs uppercase tracking-widest font-bold text-[#b8c3ff] group-hover:gap-4 transition-all">
                Record Voice <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
          {/* Attendee Networking Hotspot */}
          <div className="group relative cursor-pointer overflow-hidden bg-[#171f33] border border-[#434656]/10 p-10 h-64 flex flex-col justify-between hover:bg-[#31394d] transition-colors duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4edea3]/10 rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
            <span className="material-symbols-outlined text-4xl text-[#4edea3]">photo_camera</span>
            <div>
              <h3 className="font-headline font-bold text-2xl mb-2 text-[#dae2fd]">Attendee Networking</h3>
              <p className="text-[#c4c5d9] text-sm mb-6 max-w-xs">Take a selfie to join the digital attendee mural and find your peers.</p>
              <button className="bg-transparent border-none p-0 flex items-center gap-2 font-label text-xs uppercase tracking-widest font-bold text-[#4edea3] group-hover:gap-4 transition-all">
                Open Camera <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary / Timeline */}
      <section className="py-32 px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-[#b8c3ff] font-bold">Strategic Itinerary</span>
              <h2 className="font-headline text-5xl font-black tracking-tight mt-4 text-[#dae2fd]">PHASE 01: GENESIS</h2>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-[#222a3d] border border-[#2e5bff] text-[#b8c3ff] font-label text-[10px] tracking-widest uppercase font-bold cursor-pointer">Day 01</div>
              <div className="px-4 py-2 bg-[#131b2e] text-[#c4c5d9] font-label text-[10px] tracking-widest uppercase hover:bg-[#31394d] cursor-pointer transition-colors border border-transparent">Day 02</div>
            </div>
          </div>
          
          <div className="space-y-0">
            {/* Timeline Item 01 */}
            <div className="grid grid-cols-1 md:grid-cols-12 group cursor-pointer border-t border-[#434656]/10">
              <div className="md:col-span-2 py-10 md:py-12 flex flex-col justify-center">
                <span className="font-headline font-bold text-2xl text-[#dae2fd]">09:00</span>
                <span className="font-label text-[10px] text-[#c4c5d9] uppercase tracking-widest">AM EST</span>
              </div>
              <div className="md:col-span-1 flex justify-center py-10 md:py-12 relative">
                <div className="w-[4px] bg-[#2e5bff] h-full"></div>
              </div>
              <div className="md:col-span-9 py-10 md:py-12 md:pl-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#2e5bff]/10 text-[#b8c3ff] text-[10px] px-2 py-0.5 font-bold uppercase tracking-tighter">Main Stage</span>
                  <span className="text-[#c4c5d9] text-[10px] uppercase font-bold">60 MIN</span>
                </div>
                <h4 className="font-headline text-2xl font-bold group-hover:text-[#b8c3ff] text-[#dae2fd] transition-colors">Opening Keynote: The Sovereign Cloud</h4>
                <p className="text-[#c4c5d9] mt-4 text-sm leading-relaxed max-w-xl">
                  An exploration of decentralized infrastructure and the future of data ownership in a hyper-connected world.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 02 */}
            <div className="grid grid-cols-1 md:grid-cols-12 group cursor-pointer border-t border-[#434656]/10">
              <div className="md:col-span-2 py-10 md:py-12 flex flex-col justify-center">
                <span className="font-headline font-bold text-2xl text-[#dae2fd]">10:30</span>
                <span className="font-label text-[10px] text-[#c4c5d9] uppercase tracking-widest">AM EST</span>
              </div>
              <div className="md:col-span-1 flex justify-center py-10 md:py-12 relative">
                <div className="w-[4px] bg-[#434656]/30 h-full group-hover:bg-[#2e5bff]/50 transition-colors"></div>
              </div>
              <div className="md:col-span-9 py-10 md:py-12 md:pl-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#3f465c]/20 text-[#adb4ce] text-[10px] px-2 py-0.5 font-bold uppercase tracking-tighter">Breakout A</span>
                  <span className="text-[#c4c5d9] text-[10px] uppercase font-bold">45 MIN</span>
                </div>
                <h4 className="font-headline text-2xl font-bold group-hover:text-[#b8c3ff] text-[#dae2fd] transition-colors">Neural Interface Protocols</h4>
                <p className="text-[#c4c5d9] mt-4 text-sm leading-relaxed max-w-xl">
                  Technical deep dive into non-invasive BCI standards for professional enterprise software.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 03 */}
            <div className="grid grid-cols-1 md:grid-cols-12 group cursor-pointer border-t border-b border-[#434656]/10">
              <div className="md:col-span-2 py-10 md:py-12 flex flex-col justify-center">
                <span className="font-headline font-bold text-2xl text-[#dae2fd]">12:00</span>
                <span className="font-label text-[10px] text-[#c4c5d9] uppercase tracking-widest">PM EST</span>
              </div>
              <div className="md:col-span-1 flex justify-center py-10 md:py-12 relative">
                <div className="w-[4px] bg-[#434656]/30 h-full group-hover:bg-[#2e5bff]/50 transition-colors"></div>
              </div>
              <div className="md:col-span-9 py-10 md:py-12 md:pl-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#007d55]/20 text-[#4edea3] text-[10px] px-2 py-0.5 font-bold uppercase tracking-tighter">Sky Garden</span>
                  <span className="text-[#c4c5d9] text-[10px] uppercase font-bold">90 MIN</span>
                </div>
                <h4 className="font-headline text-2xl font-bold group-hover:text-[#b8c3ff] text-[#dae2fd] transition-colors">The Alchemist’s Luncheon</h4>
                <p className="text-[#c4c5d9] mt-4 text-sm leading-relaxed max-w-xl">
                  Curated networking session over sustainable molecular gastronomy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
