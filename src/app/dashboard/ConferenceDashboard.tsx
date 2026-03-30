import React from "react";

// Stitch "Conference Host Dashboard (Desktop)" — screen faa1992248b54d529456b10f1e52dca8
// Project: Digital Memory Booklet (5929816749829680234)
// Design System: Memento Summit (assets/4f02613b68334037a398ab43ad1932e8)

const MOMENTS = [
  {
    tag: "MAIN STAGE",
    tagStyle: "bg-[#2e5bff] text-[#efefff]",
    ago: "2m ago",
    text: '"Incredible insights on the future of neural architecture by Dr. Aris."',
    handle: "tech_lead_nx",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZqwl7h_ekIxi6GtZEGe1KmcbIBDWG0X3AxWs8gZ4-HYsHaQQUCdY9q96V9zZpk8LdgdNyn_ehjJMFukLVyzrwtEJs6ONGZUJ1JfhT8ilRp4Yhm2BdQuVA_0Dv126C3_xcR7Jt1wgZECWgL-UFKxxPEOVAJ4-VtPlq09lz-4oLRzQo9qtV6Y4ey0WP-uk-4ACnVreawd4gPB13s-Lrrx5f6rnx7UIp51R8LMgSxCSgxvnK5F22_ymb8CNBWFE9v6sa9ZoQBxpxMyI",
  },
  {
    tag: "NETWORKING",
    tagStyle: "bg-[#007d55] text-[#bdffdb]",
    ago: "8m ago",
    text: "Great turnout at the Innovation Hub mixer this afternoon.",
    handle: "global_visionary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHwb_q1QRMhjUqcJzmrBn63rHeuLr-GryX7i3QpqXzGizVXlGQfbCbSYVAGO9CR_hqnhiILRYDIvhN7G4Vf82T89Vr89nzMPGs-faawxVp4cf9gmpPcsvATNnwuUBiFJ2K_Ak9uGV20urDzy7WImwl9xjF-7wIYq5-ruuDaM9lrnftzpha2kWZedBQwLIZwphsL9p4GO8fiexQSOaBX-QEFHkqbiChbI8ncTv5azUs4LyFgzaipWBSSbLQIXDSdEo7qo9wJIKnYY",
  },
  {
    tag: "WORKSHOP",
    tagStyle: "bg-[#3f465c] text-[#adb4ce]",
    ago: "15m ago",
    text: "Hands-on with the new Memento Framework in Hall B.",
    handle: "dev_ops_sarah",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe0PJpwyNc4d__ZQC8CrTQNG8yejsOPAYmanSwA6ERd1vshRJvkwjwLd9-SVFegueXIyWvcrJiC9M29v1wFVBG3mU9OJlempK0LzFZ8ijeuhnf_RCvAVZhAhwUoZ5Hs7d49v-pWCAGEa22p3vrKOjlKPQXmNhacvTF3Ar_4w8OaLdkLovwzLcIkuE-q8Z3DjvOZOqq7bnCdh0J3duEmtF0QLnMGodJmI__DAOLm8lB45Z93wNXc1WIcs3Ks88sjI7iXQ4gx3X_TQQ",
  },
  {
    tag: "LOBBY",
    tagStyle: "bg-[#2d3449] text-[#dae2fd]",
    ago: "22m ago",
    text: "The architectural layout this year is stunning. True monolith vibe.",
    handle: "arch_daily_nexus",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS1o4_qVZL-HdpU1uaRW78wso0PwFCDcX12a6waKosk4YmrJQyHNFxqk4Jf4P8Q_I96dqcrsS5RA14dvhlio9CiiUWTmIlOmLvuTVQYJGWKyls1mTpBe5WewGeGqZV6cUZ7fCTtAN3y-k9igejNx1kDSIGB8d5RjM9WUuTnhX3TuJcJUsiBTpr5bkivsKtaup99KgpN7Gw1c9DMjM-brwhpQ0nBuWAmrehMbsWtZSb9u74RpYYH3oIaxhQBTnF-ZDbwATmgQHhIcc",
  },
];

const HISTOGRAM = [40, 65, 85, 100, 70, 55, 45, 30, 20];

const ACTIVITY = [
  { title: "Keynote Broadcaster Active", meta: "Stage Alpha • Now", color: "bg-[#2e5bff]" },
  { title: "500th Attendee Checked In", meta: "South Lobby • 14m ago", color: "bg-[#4edea3]" },
  { title: "WiFi Load Balanced", meta: "System • 32m ago", color: "bg-[#434656]" },
  { title: "Morning Breakout Concluded", meta: "Hall D • 45m ago", color: "bg-[#2e5bff]" },
];

export default function ConferenceDashboard() {
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

        {/* Summit Moments Live Feed */}
        <div className="md:col-span-8 bg-[#131b2e] rounded-lg p-1">
          <div className="p-6 flex justify-between items-center border-b border-[#434656]/10">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-[#4edea3] animate-pulse" />
              <h3 className="font-headline font-bold text-lg text-[#dae2fd]">Summit Moments</h3>
            </div>
            <span className="text-xs font-headline font-bold text-[#c4c5d9] uppercase tracking-widest">Live Stream</span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOMENTS.map((m) => (
              <div key={m.handle} className="group relative overflow-hidden rounded-sm bg-[#060e20]">
                <img
                  alt={m.tag}
                  className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  src={m.img}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0b1326] to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 font-bold rounded-sm ${m.tagStyle}`}>{m.tag}</span>
                    <span className="text-xs text-[#dae2fd]/60">{m.ago}</span>
                  </div>
                  <p className="text-sm font-medium text-[#dae2fd]">{m.text}</p>
                  <span className="text-xs text-[#b8c3ff] font-bold mt-2 block">@{m.handle}</span>
                </div>
              </div>
            ))}
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
