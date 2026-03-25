import React from "react";

export default function ConferenceBooklet() {
  return (
    <div className="bg-[#0b1326] text-[#dae2fd] min-h-screen w-full">
      <div className="flex-grow pb-24 px-6 md:px-12 max-w-[1600px] mx-auto w-full pt-8">
      {/* Header Section */}
      <header className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-headline text-xs font-bold uppercase tracking-[0.3em] text-[#b8c3ff] mb-4">Innovation Journal // 2024 Edition</p>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-[#dae2fd] tracking-tighter leading-tight">
              Future Horizons<br />
              <span className="text-[#434656]/40 italic">Summit Report</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-[#434656] border-l border-[#434656]/30 pl-8 h-fit py-2">
            <div className="text-right">
              <span className="block text-xs uppercase tracking-widest font-headline">Volume 04</span>
              <span className="block text-sm font-semibold text-[#dae2fd]">Berlin, DE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Digital Booklet Spread */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 bg-[#131b2e] shadow-[0_40px_80px_rgba(6,14,32,0.6)] min-h-[800px] overflow-hidden">
        {/* Spine Indicator (Visual Anchor) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#434656]/10 z-20 hidden lg:block"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-[rgba(6,14,32,0.5)] via-transparent to-[rgba(6,14,32,0.5)] z-10 hidden lg:block"></div>
        
        {/* Left Page: Attendee Profile & Contribution */}
        <div className="relative p-12 md:p-16 border-r border-[#434656]/5">
          <div className="absolute top-8 left-12 font-headline text-[10px] tracking-[0.4em] text-[#434656]/50 uppercase">Contributor Folio // 082</div>
          <div className="mt-12">
            <div className="flex items-start gap-8 mb-16">
              <div className="w-32 h-40 bg-[#2d3449] overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-500" 
                  alt="high-contrast professional studio portrait" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQqF9BPVvj8THoM7JGqwNlWfSwVkh_8Kgb8DWuaOgcXVmEYHgXb54BXa8GZcpPjCIsFooXp4Gdts7YBOCsYr3kCDEsVek_QdppaaP4WkevTQZ6OMq8CAhxruB8n7Rwqw5KqpI6b86IHRfrLYb7v8MugUiOqNyAP-c0nvWbIUF59hlM0tQ1hdjNWs_1IkZxj8a8tSKD957JGYykW6F0Hdj7F3c5yJJPAqMCz_9KAvo5PpTE3MOCNwsozK-NhnbfUIl9Q_vTxt5sa8A"
                />
              </div>
              <div className="flex-1">
                <h2 className="font-headline text-3xl font-black tracking-tight text-[#dae2fd] mb-2">Dr. Elena Vance</h2>
                <p className="text-[#b8c3ff] font-medium tracking-wide mb-6">Director of Cognitive Systems @ NeuralCore</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#3f465c]/30 text-[#bec6e0] text-[10px] font-headline font-bold uppercase tracking-widest border border-[#434656]/20">AI Policy</span>
                  <span className="px-3 py-1 bg-[#3f465c]/30 text-[#bec6e0] text-[10px] font-headline font-bold uppercase tracking-widest border border-[#434656]/20">Human-Centric Design</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-12">
              <div>
                <span className="material-symbols-outlined text-[#2e5bff] text-4xl mb-4" style={{fontVariationSettings: "'FILL' 1"}}>format_quote</span>
                <blockquote className="font-headline text-2xl font-bold leading-snug text-[#dae2fd] tracking-tight">
                  &quot;The future of horizons isn&apos;t defined by the distance we can travel, but by the depth of the integration between biological intuition and synthetic precision.&quot;
                </blockquote>
              </div>
              <div className="grid grid-cols-2 gap-8 border-t border-[#434656]/10 pt-8">
                <div>
                  <h4 className="font-headline text-[10px] font-black uppercase tracking-widest text-[#434656] mb-4">Core Takeaway</h4>
                  <p className="text-sm text-[#c4c5d9] leading-relaxed">Infrastructure must become invisible. We discussed how silent automation enables loud innovation.</p>
                </div>
                <div>
                  <h4 className="font-headline text-[10px] font-black uppercase tracking-widest text-[#434656] mb-4">Networking Note</h4>
                  <p className="text-sm text-[#c4c5d9] leading-relaxed">Connected with the Quantum Logic team on ethics. Collaboration scheduled for Q3.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Page: Visual Highlights & Session Data */}
        <div className="relative bg-[#0b1326] p-12 md:p-16 flex flex-col justify-between">
          <div className="absolute top-8 right-12 font-headline text-[10px] tracking-[0.4em] text-[#434656]/50 uppercase">Session Artifacts // Future Horizons</div>
          <div className="mt-12 space-y-12">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-7 aspect-[4/3] bg-[#2d3449] overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  alt="dramatic wide shot of a modern conference stage" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6JIahaD35jIKcPQmWNP1HOSW92BU50N9XBFYEhVC5GwJffsF-cn-ng89_ZV2c9TdcXxH5rEeZFKY-nqb6M9SRRCgbKw2SPjORFap2Woe0xB6BapoKJSMzzm5TpxLiNa5KMUX8WcxVPePFhaBpVHu6AbwlDESUyJLE22bT25ab8JLiRV6tLO0BJ9sr1dQp9VTGjES9_pqohzsCepMvdMasy6i1KT91LF3DIQNg2FC6TOoJmo4H7sBa14aFCTBPcpwv3inkabxk2WM"
                />
              </div>
              <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
                <div className="flex-1 bg-[#2e5bff] p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-headline font-black text-[#efefff] uppercase tracking-widest mb-1">Session 03</span>
                  <h3 className="text-xl font-headline font-black text-[#efefff] leading-none">The Neural Bridge</h3>
                </div>
                <div className="h-32 bg-[#2d3449] overflow-hidden">
                  <img className="w-full h-full object-cover opacity-60" alt="candid shot diverse professionals" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfmYYQoQh7z2ba37vid06rKGCsjwQ1YwzYl4Cm5WnNSk8TB3qNsdHAl0XGaW8OqEgUaUIN8tFL28bhATDTh6WtZsbKY5d0CqoHGGrabLg-bhoIlap16D28fH1DRSr3_yHQPUnclHwRAFT2v5asBMMx2B4X2wKdVdiix7bOO2Wm5pA2yN6p3MAL29nfC4XNGVklPjbc03oT06p6Le3b27c8cXUhmVH3DX4wfe_WL4dGvb0Q4Fv5PYe6wCK2fgpYzakZ03I5wtVhHKg"/>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-[#434656]/10 pb-4">
                <h4 className="font-headline font-black text-[#dae2fd]">Insight Frequency</h4>
                <span className="text-xs font-label text-[#b8c3ff] uppercase tracking-tighter">Peak: 14:30 GMT</span>
              </div>
              <div className="flex gap-1 h-32 items-end">
                <div className="flex-1 bg-[#2d3449] h-[40%]"></div>
                <div className="flex-1 bg-[#2d3449] h-[65%]"></div>
                <div className="flex-1 bg-[#2e5bff] h-[90%]"></div>
                <div className="flex-1 bg-[#2d3449] h-[55%]"></div>
                <div className="flex-1 bg-[#2d3449] h-[45%]"></div>
                <div className="flex-1 bg-[#2d3449] h-[75%]"></div>
                <div className="flex-1 bg-[#2d3449] h-[30%]"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-center flex-1">
                  <span className="block text-2xl font-headline font-black text-[#dae2fd]">42</span>
                  <span className="block text-[8px] font-headline font-bold uppercase tracking-widest text-[#434656]">Collaborations</span>
                </div>
                <div className="text-center flex-1">
                  <span className="block text-2xl font-headline font-black text-[#dae2fd]">12k</span>
                  <span className="block text-[8px] font-headline font-bold uppercase tracking-widest text-[#434656]">Data Nodes</span>
                </div>
                <div className="text-center flex-1">
                  <span className="block text-2xl font-headline font-black text-[#dae2fd]">09</span>
                  <span className="block text-[8px] font-headline font-bold uppercase tracking-widest text-[#434656]">Frameworks</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex justify-between items-center border-t border-[#434656]/10 pt-8">
            <div className="flex gap-4">
              <button className="w-10 h-10 border border-[#434656]/30 flex items-center justify-center hover:bg-[#2d3449] transition-colors bg-transparent cursor-pointer">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-10 h-10 border border-[#434656]/30 flex items-center justify-center hover:bg-[#2d3449] transition-colors bg-transparent cursor-pointer">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
            <span className="font-headline text-xs font-bold tracking-widest text-[#434656]">PAG. 164 - 165</span>
          </div>
        </div>
      </section>

      {/* Archive Index / Quick Access */}
      <section className="mt-24">
        <h2 className="font-headline text-xs font-bold uppercase tracking-[0.4em] text-[#b8c3ff] mb-12 border-b border-[#b8c3ff]/20 pb-4 inline-block">Archival Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group cursor-pointer">
            <div className="h-1 bg-[#434656]/20 w-full mb-6 group-hover:bg-[#b8c3ff] transition-all duration-500"></div>
            <span className="text-[10px] font-headline font-black text-[#434656] uppercase tracking-widest">Exhibit A</span>
            <h3 className="text-xl font-headline font-black mt-2 mb-4 group-hover:text-[#b8c3ff] transition-colors">Summit Keynotes</h3>
            <p className="text-sm text-[#c4c5d9] leading-relaxed font-light">Full transcripts and recorded highlights from the main stage sessions including &apos;Quantum Shift&apos;.</p>
          </div>
          <div className="group cursor-pointer">
            <div className="h-1 bg-[#434656]/20 w-full mb-6 group-hover:bg-[#b8c3ff] transition-all duration-500"></div>
            <span className="text-[10px] font-headline font-black text-[#434656] uppercase tracking-widest">Exhibit B</span>
            <h3 className="text-xl font-headline font-black mt-2 mb-4 group-hover:text-[#b8c3ff] transition-colors">Digital Atelier</h3>
            <p className="text-sm text-[#c4c5d9] leading-relaxed font-light">Raw workshop footage and collaborative whiteboards from the innovation lab tracks.</p>
          </div>
          <div className="group cursor-pointer">
            <div className="h-1 bg-[#434656]/20 w-full mb-6 group-hover:bg-[#b8c3ff] transition-all duration-500"></div>
            <span className="text-[10px] font-headline font-black text-[#434656] uppercase tracking-widest">Exhibit C</span>
            <h3 className="text-xl font-headline font-black mt-2 mb-4 group-hover:text-[#b8c3ff] transition-colors">Networking Map</h3>
            <p className="text-sm text-[#c4c5d9] leading-relaxed font-light">Interactive visualization of all connections made during the 72-hour summit period.</p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
