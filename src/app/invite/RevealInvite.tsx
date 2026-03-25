import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function RevealInvite() {
  const { activeTheme } = useTheme();

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen w-full relative overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        .font-headline { font-family: 'Noto Serif', serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .watercolor-bg {
            background: radial-gradient(circle at 20% 30%, rgba(174, 198, 207, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(255, 209, 220, 0.15) 0%, transparent 50%);
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
        .itinerary-line {
            background-image: linear-gradient(to bottom, #72787a 33%, rgba(255,255,255,0) 0%);
            background-position: right;
            background-size: 1px 12px;
            background-repeat: repeat-y;
        }
      `}} />

      {/* TopAppBar */}
      <header className="bg-[#f9f9f9]/80 backdrop-blur-md fixed top-0 left-0 w-full z-[60] flex items-center justify-between px-6 h-16 shadow-sm">
        <span className="material-symbols-outlined text-[#42484a]">menu</span>
        <h1 className="font-headline italic text-[#1a1c1c] text-2xl tracking-tight">The Great Reveal</h1>
        <span className="material-symbols-outlined text-[#42484a]">celebration</span>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-md mx-auto space-y-12 watercolor-bg min-h-screen">
        
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-[#e8e8e8] text-[#42484a] text-[10px] tracking-[0.2em] uppercase font-medium">
            Our Little Secret
          </div>
          <h2 className="font-headline text-5xl leading-tight text-[#1a1c1c]">One Small Life, <br/><span className="italic font-normal">One Big Story.</span></h2>
          <p className="text-[#42484a] font-light leading-relaxed px-4 text-sm mt-4">Join us for an afternoon of whispers and wonders as we reveal the newest addition to our family tree.</p>
        </section>

        {/* Interactive Hotspots (Bento Style) */}
        <section className="grid grid-cols-2 gap-4">
          <div className="col-span-2 glass-card rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3 border border-white/20 shadow-sm transition-transform active:scale-95 duration-300 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#aec6cf] flex items-center justify-center text-[#3c535b]">
              <span className="material-symbols-outlined">photo_camera</span>
            </div>
            <div>
              <h3 className="font-headline text-lg text-[#1a1c1c]">Prediction Selfie</h3>
              <p className="text-xs text-[#42484a]">Snap your guess: Pink or Blue?</p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-3 border border-white/20 shadow-sm transition-transform active:scale-95 duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#ffd1dc] flex items-center justify-center text-[#7a5761]">
              <span className="material-symbols-outlined">videocam</span>
            </div>
            <h3 className="font-headline text-sm text-[#1a1c1c]">Sweet Message</h3>
          </div>
          <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-3 border border-white/20 shadow-sm transition-transform active:scale-95 duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#debba1] flex items-center justify-center text-[#634a36]">
              <span className="material-symbols-outlined">mic</span>
            </div>
            <h3 className="font-headline text-sm text-[#1a1c1c]">Soft Whispers</h3>
          </div>
        </section>

        {/* Itinerary Section */}
        <section className="space-y-8">
          <h3 className="font-headline text-2xl border-l-2 border-[#4b626a] pl-4 text-[#1a1c1c]">The Itinerary</h3>
          <div className="relative pl-8 space-y-10">
            <div className="absolute left-0 top-2 bottom-2 w-[1px] itinerary-line"></div>
            
            {/* Item 1 */}
            <div className="relative">
              <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#f9f9f9] border-2 border-[#b2cad3]"></div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-[#1a1c1c]">Arrival &amp; Mocktails</p>
                  <p className="text-xs text-[#42484a] font-light">Sip on &apos;Cloud 9&apos; or &apos;Berry Bliss&apos;</p>
                </div>
                <span className="text-[10px] font-bold text-[#4b626a] tracking-tighter uppercase whitespace-nowrap ml-2">2:00 PM</span>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="relative">
              <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#f9f9f9] border-2 border-[#e7bbc6]"></div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-[#1a1c1c]">The Prediction Wall</p>
                  <p className="text-xs text-[#42484a] font-light">Cast your vote before the big reveal</p>
                </div>
                <span className="text-[10px] font-bold text-[#4b626a] tracking-tighter uppercase whitespace-nowrap ml-2">3:30 PM</span>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="relative">
              <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#f9f9f9] border-2 border-[#4b626a]"></div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-[#1a1c1c]">The Great Reveal</p>
                  <p className="text-xs text-[#42484a] font-light">The moment we&apos;ve all been waiting for</p>
                </div>
                <span className="text-[10px] font-bold text-[#4b626a] tracking-tighter uppercase whitespace-nowrap ml-2">4:15 PM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Reveal Container (Featured Component) */}
        <div className="bg-[#e7bbc6] p-8 rounded-xl shadow-sm border border-white/30 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#7a5761]">
            <span className="material-symbols-outlined text-3xl">auto_awesome</span>
          </div>
          <h4 className="font-headline text-2xl text-[#2d141c]">He or She?</h4>
          <p className="text-sm text-[#5e3e47] leading-relaxed">Join us on July 14th at The Glass House, Los Angeles.</p>
          <button className="w-full bg-gradient-to-r from-[#4b626a] to-[#aec6cf] text-white py-3 rounded-lg font-semibold tracking-wide shadow-lg shadow-[#4b626a]/10 mt-4 cursor-pointer hover:brightness-110 transition-colors">
            Add to Calendar
          </button>
        </div>

        {/* RSVP Section (Kindly Respond) */}
        <section className="bg-[#f3f3f3] p-8 rounded-xl space-y-6">
          <div className="space-y-2">
            <h3 className="font-headline text-2xl text-center text-[#1a1c1c]">Kindly Respond</h3>
            <p className="text-xs text-center text-[#42484a] uppercase tracking-widest">By June 30th</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#42484a] ml-1">Full Name</label>
              <input className="w-full bg-[#e8e8e8] border-none rounded-t-lg border-b border-[#aec6cf] focus:ring-0 focus:border-[#4b626a] text-sm p-3 text-[#1a1c1c] outline-none placeholder:text-[#c2c7ca]" placeholder="Your Name" type="text"/>
            </div>
            <div className="flex gap-4 pt-2">
              <button className="flex-1 bg-[#ffd1dc] text-[#7a5761] py-3 rounded-lg font-medium text-sm hover:brightness-95 transition-all cursor-pointer">Regretfully Decline</button>
              <button className="flex-1 bg-[#4b626a] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#344a52] transition-all cursor-pointer">Gladly Attend</button>
            </div>
          </div>
        </section>

        {/* Guest Feed (Cherished Moments) */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="font-headline text-2xl text-[#1a1c1c]">Cherished Moments</h3>
            <span className="text-[10px] uppercase tracking-tighter text-[#42484a] font-bold">12 Messages</span>
          </div>
          <div className="space-y-4">
            
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-lg border border-[#c2c7ca]/10 flex gap-4 items-start shadow-sm">
              <img className="w-10 h-10 rounded-full object-cover shrink-0" alt="portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnqJqT73VMWF0U_CUjAyfaW8nWrxZnU5YhF-cKYXpz2n4zIKMunaOVkaDaf250pHLcMMarcSs82TCtYwrnn2HScAmBByohD93MGYLZ-TSfK2zmEw9COYGmnR6Rag6JnrGveUOzrXrX6uKaH8jTI0aHZcHWU4tU47FPgpTEEAu6LdTGAD4EqrBCRMYXiHWg1vfDZU1rwDyyYCQ4o3XTa3Mq7yY7A9mr69iNWi2Q5cvFr5i47crnB5631M1iwkbv2bmiWbnRKWoO5KA"/>
              <div className="space-y-1 flex-1">
                <div className="flex justify-between">
                  <h5 className="text-sm font-bold text-[#1a1c1c]">Aunt Martha</h5>
                  <span className="text-[10px] text-[#42484a] italic whitespace-nowrap ml-2">Prediction: Girl</span>
                </div>
                <p className="text-xs text-[#42484a] font-light leading-relaxed">&quot;Can&apos;t wait to see if it&apos;s another ballerina or a little explorer! We love you guys so much.&quot;</p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-[#f3f3f3] p-5 rounded-lg border border-[#c2c7ca]/10 flex gap-4 items-start shadow-sm">
              <img className="w-10 h-10 rounded-full object-cover shrink-0" alt="portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu5rPkfrFIFu4eVcgwS-GLGuhHmWB3-R7bHxxapRezp5knw8rkU4Y6pPZBhDxBluj7hz-bD0IAvteqftFpk5bgwrXlHHtj18h3ain0JbVuCaBDBgcn4mEalojuqSs2ZAnDUpKl95weExkCrfvMXX9GOGlp_72687UN3QPaHzfWAaASaBaIOZK2rvrAdbPB5D8nRZaG8XtSdlkzd6ePjXLFu956n6ACRfmTMn0Tlq9oVTBQBmEqTFVvGcoHB2VHhk0AuI1A5Gz1Ulg"/>
              <div className="space-y-1 flex-1">
                <div className="flex justify-between">
                  <h5 className="text-sm font-bold text-[#1a1c1c]">David Chen</h5>
                  <span className="text-[10px] text-[#42484a] italic whitespace-nowrap ml-2">Prediction: Boy</span>
                </div>
                <p className="text-xs text-[#42484a] font-light leading-relaxed">&quot;Team Blue all the way! Sending all the positive vibes for the reveal day.&quot;</p>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-3 pb-6 px-4 bg-white/80 backdrop-blur-xl rounded-t-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.04)] border-t border-[#c2c7ca]/10">
        <div className="flex flex-col items-center justify-center text-[#72787a] opacity-70 hover:opacity-100 cursor-pointer">
          <span className="material-symbols-outlined">mail</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Invite</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#72787a] opacity-70 hover:opacity-100 cursor-pointer">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Our Story</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#72787a] opacity-70 hover:opacity-100 cursor-pointer">
          <span className="material-symbols-outlined">photo_library</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Gallery</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#1a1c1c] scale-110 transition-transform cursor-pointer">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>event_available</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">RSVP</span>
        </div>
      </nav>
    </div>
  );
}
