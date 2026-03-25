import React from "react";

export default function ConferenceDashboard() {
  return (
    <div className="bg-[#0b1326] text-[#dae2fd] min-h-screen pt-8 pb-20 px-8 w-full">
      <div className="max-w-[1440px] mx-auto w-full">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-headline text-xs font-bold uppercase tracking-widest text-[#b8c3ff] mb-2 block">Executive Control Center</span>
          <h1 className="font-headline text-5xl font-black tracking-tighter text-[#dae2fd] leading-none">Future Horizons Summit</h1>
          <p className="text-[#c4c5d9] mt-4 max-w-xl font-medium">Real-time engagement telemetry and logistical oversight for the global innovation plenary.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-[#060e20] text-[#dae2fd] px-6 py-3 text-sm font-headline font-bold rounded-sm border border-[#434656]/15 hover:bg-[#31394d] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">upload_file</span>
            Export Participant List
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-br from-[#2e5bff] to-[#b8c3ff] text-[#efefff] px-6 py-3 text-sm font-headline font-bold rounded-sm shadow-lg shadow-[#2e5bff]/20 active:scale-95 transition-all border-none cursor-pointer">
            <span className="material-symbols-outlined text-sm">campaign</span>
            Broadcast Announcement
          </button>
        </div>
      </header>
      
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Metric Cards Column */}
        <div className="md:col-span-4 space-y-6">
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
              <div className="h-full bg-[#2e5bff]" style={{ width: "71%" }}></div>
            </div>
          </div>
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
        
        {/* Central Live Feed */}
        <div className="md:col-span-8 bg-[#131b2e] rounded-lg p-1">
          <div className="p-6 flex justify-between items-center border-b border-[#434656]/10">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-[#4edea3] animate-pulse"></span>
              <h3 className="font-headline font-bold text-lg text-[#dae2fd]">Summit Moments</h3>
            </div>
            <span className="text-xs font-headline font-bold text-[#c4c5d9] uppercase tracking-widest">Live Stream</span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Feed Item 1 */}
            <div className="group relative overflow-hidden rounded-sm bg-[#060e20]">
              <img alt="Summit Keynote" className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZqwl7h_ekIxi6GtZEGe1KmcbIBDWG0X3AxWs8gZ4-HYsHaQQUCdY9q96V9zZpk8LdgdNyn_ehjJMFukLVyzrwtEJs6ONGZUJ1JfhT8ilRp4Yhm2BdQuVA_0Dv126C3_xcR7Jt1wgZECWgL-UFKxxPEOVAJ4-VtPlq09lz-4oLRzQo9qtV6Y4ey0WP-uk-4ACnVreawd4gPB13s-Lrrx5f6rnx7UIp51R8LMgSxCSgxvnK5F22_ymb8CNBWFE9v6sa9ZoQBxpxMyI"/>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0b1326] to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#2e5bff] text-[#efefff] text-[10px] px-2 py-0.5 font-bold rounded-sm">MAIN STAGE</span>
                  <span className="text-xs text-[#dae2fd]/60">2m ago</span>
                </div>
                <p className="text-sm font-medium text-[#dae2fd]">"Incredible insights on the future of neural architecture by Dr. Aris."</p>
                <span className="text-xs text-[#b8c3ff] font-bold mt-2 block">@tech_lead_nx</span>
              </div>
            </div>
            {/* Feed Item 2 */}
            <div className="group relative overflow-hidden rounded-sm bg-[#060e20]">
              <img alt="Networking Lounge" className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHwb_q1QRMhjUqcJzmrBn63rHeuLr-GryX7i3QpqXzGizVXlGQfbCbSYVAGO9CR_hqnhiILRDQgIvhN7G4Vf82T89Vr89nzMPGs-faawxVp4cf9gmpPcsvATNnwuUBiFJ2K_Ak9uGV20urDzy7WImwl9xjF-7wIYq5-ruuDaM9lrnftzpha2kWZedBQwLIZwphsL9p4GO8fiexQSOaBX-QEFHkqbiChbI8ncTv5azUs4LyFgzaipWBSSbLQIXDSdEo7qo9wJIKnYY"/>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0b1326] to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#007d55] text-[#bdffdb] text-[10px] px-2 py-0.5 font-bold rounded-sm">NETWORKING</span>
                  <span className="text-xs text-[#dae2fd]/60">8m ago</span>
                </div>
                <p className="text-sm font-medium text-[#dae2fd]">Great turnout at the Innovation Hub mixer this afternoon.</p>
                <span className="text-xs text-[#b8c3ff] font-bold mt-2 block">@global_visionary</span>
              </div>
            </div>
            {/* Feed Item 3 */}
            <div className="group relative overflow-hidden rounded-sm bg-[#060e20]">
              <img alt="Workshop Session" className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe0PJpwyNc4d__ZQC8CrTQNG8yejsOPAYmanSwA6ERd1vshRJvkwjwLd9-SVFegueXIyWvcrJiC9M29v1wFVBG3mU9OJlempK0LzFZ8ijeuhnf_RCvAVZhAhwUoZ5Hs7d49v-pWCAGEa22p3vrKOjlKPQXmNhacvTF3Ar_4w8OaLdkLovwzLcIkuE-q8Z3DjvOZOqq7bnCdh0J3duEmtF0QLnMGodJmI__DAOLm8lB45Z93wNXc1WIcs3Ks88sjI7iXQ4gx3X_TQQ"/>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0b1326] to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#3f465c] text-[#adb4ce] text-[10px] px-2 py-0.5 font-bold rounded-sm">WORKSHOP</span>
                  <span className="text-xs text-[#dae2fd]/60">15m ago</span>
                </div>
                <p className="text-sm font-medium text-[#dae2fd]">Hands-on with the new Memento Framework in Hall B.</p>
                <span className="text-xs text-[#b8c3ff] font-bold mt-2 block">@dev_ops_sarah</span>
              </div>
            </div>
            {/* Feed Item 4 */}
            <div className="group relative overflow-hidden rounded-sm bg-[#060e20]">
              <img alt="Lobby View" className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS1o4_qVZL-HdpU1uaRW78wso0PwFCDcX12a6waKosk4YmrJQyHNFxqk4Jf4P8Q_I96dqcrsS5RA14dvhlio9CiiUWTmIlOmLvuTVQYJGWKyls1mTpBe5WewGeGqZV6cUZ7fCTtAN3y-k9igejNx1kDSIGB8d5RjM9WUuTnhX3TuJcJUsiBTpr5bkivsKtaup99KgpN7Gw1c9DMjM-brwhpQ0nBuWAmrehMbsWtZSb9u74RpYYH3oIaxhQBTnF-ZDbwATmgQHhIcc"/>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0b1326] to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#2d3449] text-[#dae2fd] text-[10px] px-2 py-0.5 font-bold rounded-sm">LOBBY</span>
                  <span className="text-xs text-[#dae2fd]/60">22m ago</span>
                </div>
                <p className="text-sm font-medium text-[#dae2fd]">The architectural layout this year is stunning. True monolith vibe.</p>
                <span className="text-xs text-[#b8c3ff] font-bold mt-2 block">@arch_daily_nexus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Row: Attendance Distribution & Log */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-[#131b2e] rounded-lg p-8">
          <h3 className="font-headline font-bold text-lg text-[#dae2fd] mb-8">Attendance Flow Visualization</h3>
          <div className="h-64 flex items-end justify-between gap-4">
            <div className="flex-1 bg-[#2e5bff]/20 hover:bg-[#2e5bff] transition-colors relative group h-[40%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#2e5bff]/30 hover:bg-[#2e5bff] transition-colors relative group h-[65%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#2e5bff]/40 hover:bg-[#2e5bff] transition-colors relative group h-[85%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#2e5bff] hover:bg-[#2e5bff] transition-colors relative group h-[100%] rounded-t-sm">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#b8c3ff] uppercase">Peak (09:30)</span>
            </div>
            <div className="flex-1 bg-[#2e5bff]/60 hover:bg-[#2e5bff] transition-colors relative group h-[70%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#2e5bff]/40 hover:bg-[#2e5bff] transition-colors relative group h-[55%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#2e5bff]/30 hover:bg-[#2e5bff] transition-colors relative group h-[45%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#2e5bff]/20 hover:bg-[#2e5bff] transition-colors relative group h-[30%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#2e5bff]/10 hover:bg-[#2e5bff] transition-colors relative group h-[20%] rounded-t-sm"></div>
          </div>
        </div>
        
        <div className="md:col-span-4 bg-[#131b2e] rounded-lg p-1 flex flex-col">
          <div className="p-6 border-b border-[#434656]/10">
            <h3 className="font-headline font-bold text-lg text-[#dae2fd]">Activity Log</h3>
          </div>
          <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[29rem]">
            <div className="flex gap-4">
              <div className="w-1 bg-[#2e5bff] rounded-full"></div>
              <div>
                <p className="text-sm font-bold text-[#dae2fd]">Keynote Broadcaster Active</p>
                <span className="text-xs text-[#c4c5d9]">Stage Alpha • Now</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-[#4edea3] rounded-full"></div>
              <div>
                <p className="text-sm font-bold text-[#dae2fd]">500th Attendee Checked In</p>
                <span className="text-xs text-[#c4c5d9]">South Lobby • 14m ago</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-[#8e90a2] rounded-full"></div>
              <div>
                <p className="text-sm font-bold text-[#dae2fd]">WiFi Load Balanced</p>
                <span className="text-xs text-[#c4c5d9]">System • 32m ago</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-[#2e5bff] rounded-full"></div>
              <div>
                <p className="text-sm font-bold text-[#dae2fd]">Morning Breakout Concluded</p>
                <span className="text-xs text-[#c4c5d9]">Hall D • 45m ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
