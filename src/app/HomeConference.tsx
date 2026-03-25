"use client";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { ThemeType } from "@/lib/themeMapping";

export default function HomeConference() {
  const { activeTheme, setTheme } = useTheme();

  return (
    <div className="w-full bg-[#0b1326] text-[#dae2fd]">
      {/* Hero Section */}
      <section className="relative min-h-[716px] flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1326] via-transparent to-[#0b1326] z-10"></div>
          <img 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
            alt="luxury tech event venue" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCViL53Txk6nPAn3wOYoP7C7TH6GzK5V8Yp2ZoQLHxBXeJveg7OZe8U4YW4NrYG1nPh9flNXLB6a8KaYO_QtOSr7RaZrcyQ0nKtVwjht9uwM3_CA1CdiAu9bcehJpdLviweXV7q_AwHcXCGJwwFxFUObE3qi7cqgyy63YaI7HVvB0KORg5SlirfnS4xJCdQ74KxA6h6RNsE8ZRtX7t3tu7gHqEKdzCAMNuY8sMRujBK6aXPp13NEJrRGOv8q-TFeGbCq2QdewBqOTY"
          />
        </div>
        <div className="relative z-20 text-center max-w-3xl">
          <span className="inline-block py-1 px-3 bg-[#3f465c] text-[#adb4ce] font-label text-[10px] tracking-[0.2em] uppercase mb-6">Executive Setup</span>
          <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Host with <br/><span className="text-[#2e5bff]">Precision</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-[#c4c5d9] mb-12 max-w-xl mx-auto leading-relaxed">
            Construct your plenary into an architectural monolith of data and insights. Launch a high-stakes professional environment.
          </p>
          <Link 
            className="bg-[#2e5bff] hover:bg-blue-600 text-white px-12 py-5 font-headline font-bold text-sm uppercase tracking-widest shadow-[0_20px_40px_rgba(46,91,255,0.2)] transition-all inline-block rounded-sm cursor-pointer" 
            href="/dashboard">
            Initialize First Summit
          </Link>
        </div>
      </section>

      {/* Onboarding Flow */}
      <section className="bg-[#131b2e] py-24 border-t border-[#434656]/15" id="onboarding">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Step 1: Upload Poster */}
          <div className="mb-32 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8c3ff] mb-4 block">Operation 01</span>
              <h2 className="font-headline text-4xl md:text-5xl font-black mb-6">Deploy Protocol Asset</h2>
              <p className="text-[#c4c5d9] text-lg mb-8 leading-relaxed">
                Establish your digital presence. Upload a high-resolution monolith visual standard (JPG/PNG) to serve as your summit keyart.
              </p>
            </div>
            <div className="relative group cursor-pointer">
              <div className="aspect-[3/4] border border-[#434656]/30 bg-[#2d3449] flex flex-col items-center justify-center p-12 transition-all hover:bg-[#31394d] shadow-[0_40px_80px_rgba(6,14,32,0.6)]">
                <span className="material-symbols-outlined text-5xl text-[#2e5bff] mb-4 group-hover:-translate-y-2 transition-transform">cloud_upload</span>
                <p className="font-headline font-bold text-xs uppercase tracking-widest text-[#dae2fd]">Inject Visual Nodes</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#2e5bff]/10 blur-xl -z-10 group-hover:bg-[#2e5bff]/30 transition-colors"></div>
            </div>
          </div>

          {/* Step 2: Event Details */}
          <div className="mb-32">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8c3ff] mb-4 block">Operation 02</span>
              <h2 className="font-headline text-4xl md:text-5xl font-black mb-6">Define Telemetry Data</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto bg-[#060e20] p-12 border border-[#434656]/15">
              <div className="flex flex-col border-b border-[#434656] py-2 focus-within:border-[#2e5bff] transition-colors">
                <label className="font-headline font-bold text-xs uppercase tracking-widest text-[#8e90a2] mb-2">Summit Designation</label>
                <input className="bg-transparent border-none p-0 focus:ring-0 text-[#dae2fd] font-headline text-2xl outline-none placeholder:text-[#434656]" placeholder="Future Horizons Summit" type="text"/>
              </div>
              <div className="flex flex-col border-b border-[#434656] py-2 focus-within:border-[#2e5bff] transition-colors">
                <label className="font-headline font-bold text-xs uppercase tracking-widest text-[#8e90a2] mb-2">Architectural Theme</label>
                <select 
                  className="bg-transparent border-none p-0 focus:ring-0 text-[#dae2fd] font-headline font-bold text-2xl outline-none cursor-pointer appearance-none"
                  value={activeTheme}
                  onChange={(e) => setTheme(e.target.value as ThemeType)}
                >
                  <option value="ATELIER" className="bg-[#0b1326]">Digital Atelier (Gold & Ivory)</option>
                  <option value="CONFERENCE" className="bg-[#0b1326]">Professional (Cobalt)</option>
                  <option value="JUBILEE" className="bg-[#0b1326]">Electric Jubilee (Neon)</option>
                  <option value="REVEAL" className="bg-[#0b1326]">The Great Reveal (Pastels)</option>
                </select>
              </div>
              <div className="flex flex-col border-b border-[#434656] py-2 focus-within:border-[#2e5bff] transition-colors">
                <label className="font-headline font-bold text-xs uppercase tracking-widest text-[#8e90a2] mb-2">Temporal Coordinates</label>
                <input className="bg-transparent border-none p-0 focus:ring-0 text-[#dae2fd] font-headline text-2xl outline-none placeholder:text-[#434656]" placeholder="Nov 24, 2024 • 09:00 GMT" type="text"/>
              </div>
              <div className="flex flex-col border-b border-[#434656] py-2 focus-within:border-[#2e5bff] transition-colors">
                <label className="font-headline font-bold text-xs uppercase tracking-widest text-[#8e90a2] mb-2">Spatial Node</label>
                <input className="bg-transparent border-none p-0 focus:ring-0 text-[#dae2fd] font-headline text-2xl outline-none placeholder:text-[#434656]" placeholder="The Monolith, NYC" type="text"/>
              </div>
            </form>
          </div>

          {/* Step 3: Interactive Hotspots */}
          <div className="mb-32">
            <div className="mb-12">
              <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8c3ff] mb-4 block text-center md:text-left">Operation 03</span>
              <h2 className="font-headline text-4xl md:text-5xl font-black mb-6 text-center md:text-left">Integration Protocols</h2>
              <p className="text-[#c4c5d9] text-lg text-center md:text-left max-w-2xl">Initialize hardware access logic on your presentation layer to activate peer networking arrays.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 relative overflow-hidden bg-[#222a3d] p-8 shadow-inner border border-[#434656]/15">
                {/* Placeholder Poster */}
                <div className="max-w-[400px] mx-auto aspect-[3/4] relative shadow-[0_20px_40px_rgba(6,14,32,0.8)] overflow-hidden">
                  <img 
                    className="w-full h-full object-cover grayscale" 
                    alt="abstract monolith structure" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFP_184QIkiv72zjKnP2SQmm2z5Ss12dhRJLAzD3YrcF74x8jOwIGAIgGEzMjuSiQNNB_c-dL0hS2XLP9kGshalT81_A1Pmc95Atb23ITw-iHiPEbQ318UbY3BezIds1jy-X0WuQYqp_t-7fN7ZYBv5txpF5vICThQE9wgdt6HE31Q7jpSuPIon9LYrd-yyEzoqFeOjP8lq_GHWE5pOFasmS4VNByRQr5URJ1SVC2EHk0DUizaPr_JeCY1WOYIdjchABDGomc-IDM"
                  />
                  {/* Mock Hotspots */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex gap-4">
                    <button className="w-12 h-12 flex items-center justify-center bg-[#2d3449]/80 backdrop-blur-md border border-[#434656]/50 text-[#b8c3ff] hover:bg-[#2e5bff] hover:text-white transition-all shadow-lg cursor-pointer rounded-sm">
                      <span className="material-symbols-outlined text-sm">photo_camera</span>
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center bg-[#2d3449]/80 backdrop-blur-md border border-[#434656]/50 text-[#b8c3ff] hover:bg-[#2e5bff] hover:text-white transition-all shadow-lg cursor-pointer rounded-sm">
                      <span className="material-symbols-outlined text-sm">videocam</span>
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center bg-[#2d3449]/80 backdrop-blur-md border border-[#434656]/50 text-[#b8c3ff] hover:bg-[#2e5bff] hover:text-white transition-all shadow-lg cursor-pointer rounded-sm">
                      <span className="material-symbols-outlined text-sm">mic</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-[#2d3449] border border-[#434656]/15 h-full flex flex-col justify-center">
                  <h3 className="font-headline text-[10px] font-bold uppercase tracking-widest text-[#b8c3ff] mb-4">Systems Placement</h3>
                  <p className="text-sm text-[#c4c5d9] mb-8 leading-relaxed">Map sub-routines into the visual layer explicitly. Zero opacity. Total intent.</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-[#131b2e] border border-[#434656]/30">
                      <span className="material-symbols-outlined text-[#4edea3]">photo_camera</span>
                      <span className="font-headline font-bold text-xs uppercase tracking-widest">Scanner</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#131b2e] border border-[#434656]/30">
                      <span className="material-symbols-outlined text-[#dae2fd]">videocam</span>
                      <span className="font-headline font-bold text-xs uppercase tracking-widest">Broadcast</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#131b2e] border border-[#434656]/30">
                      <span className="material-symbols-outlined text-[#2e5bff]">mic</span>
                      <span className="font-headline font-bold text-xs uppercase tracking-widest">Mic Array</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invite Guests */}
          <div className="max-w-4xl mx-auto bg-[#0b1326] border border-[#434656]/15 p-12 shadow-[0_40px_80px_rgba(6,14,32,0.4)]">
            <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8c3ff] mb-4 block">Final Execution</span>
            <h2 className="font-headline font-black text-4xl mb-8">Deploy Access Keys</h2>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="font-headline font-bold text-xs uppercase tracking-widest text-[#8e90a2] mb-2 block">CSV Database Parse</label>
                  <div className="border border-[#434656]/40 p-6 flex flex-col items-center justify-center bg-[#131b2e] hover:bg-[#222a3d] transition-colors cursor-pointer rounded-sm">
                    <span className="material-symbols-outlined text-[#b8c3ff] mb-2">upload_file</span>
                    <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-[#c4c5d9]">Select Target File</p>
                  </div>
                </div>
                <div>
                  <label className="font-headline font-bold text-xs uppercase tracking-widest text-[#8e90a2] mb-2 block">Manual CLI Entry</label>
                  <textarea className="w-full bg-[#131b2e] border border-[#434656]/30 focus:border-[#2e5bff] focus:ring-0 font-body text-sm p-4 placeholder:text-[#434656] text-[#dae2fd] rounded-sm transition-colors outline-none" placeholder="director@neuralcore.io, ops@vector.ai" rows={3}></textarea>
                </div>
              </div>
              <div className="pt-12 flex justify-center">
                <button className="bg-gradient-to-br from-[#2e5bff] to-[#124af0] text-[#efefff] px-16 py-6 font-headline font-bold text-sm uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(46,91,255,0.3)] hover:brightness-110 active:scale-95 transition-all outline-none border-none cursor-pointer rounded-sm">
                  Initialize Operations
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
