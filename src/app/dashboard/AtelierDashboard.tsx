"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useEvent } from "@/context/EventContext";
import { ItineraryItem } from "@/lib/eventTypes";

export default function AtelierDashboard() {
  const {
    event, updateEventDetail, markFieldEdited,
    addItineraryItem, updateItineraryItem, removeItineraryItem,
    triggerToast, showToast,
  } = useEvent();

  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [newItemTime, setNewItemTime] = useState("");
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");

  const handleAddItineraryItem = () => {
    if (!newItemTime || !newItemTitle) return;
    addItineraryItem({
      id: `it-${Date.now()}`,
      time: newItemTime,
      title: newItemTitle,
      description: newItemDesc,
      isActive: false,
    });
    setNewItemTime("");
    setNewItemTitle("");
    setNewItemDesc("");
    triggerToast("Itinerary item added");
  };

  const handleSaveDetails = () => {
    triggerToast("Changes saved — live across all views");
  };

  const guests = event.guests;
  const attending = guests.filter(g => g.status === 'attending').length;
  const declined = guests.filter(g => g.status === 'declined').length;
  const checkedIn = guests.filter(g => g.checkedInAt).length;
  const totalUploads = guests.reduce((sum, g) => sum + g.uploads, 0);

  return (
    <>
      {/* Toast */}
      {showToast && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] px-8 py-3 bg-gradient-to-r from-[#735c00] to-[#d4af37] text-white font-label text-sm uppercase tracking-widest rounded-sm shadow-2xl animate-[fadeInDown_0.3s_ease]">
          {showToast}
        </div>
      )}

      {/* Edit Drawer Overlay */}
      {editDrawerOpen && (
        <div className="fixed inset-0 z-[80] flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setEditDrawerOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-[var(--color-surface)] h-full overflow-y-auto shadow-2xl border-l border-[var(--color-outline-variant)]/20 p-10 z-10">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-headline text-3xl">Edit Event Details</h2>
              <button onClick={() => setEditDrawerOpen(false)} className="material-symbols-outlined text-[var(--color-secondary)] hover:text-[var(--color-on-surface)] cursor-pointer bg-transparent border-none text-2xl">close</button>
            </div>

            <div className="space-y-8">
              {/* Event Name */}
              <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                <label className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] mb-2">Event Name</label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-headline text-xl placeholder:text-[var(--color-outline-variant)]/60"
                  value={event.eventDetails.eventName}
                  onChange={(e) => { updateEventDetail("eventName", e.target.value); markFieldEdited("eventName"); }}
                  placeholder="Event Name"
                />
              </div>
              {/* Date & Time */}
              <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                <label className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] mb-2">Date & Time</label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-headline text-xl placeholder:text-[var(--color-outline-variant)]/60"
                  value={event.eventDetails.dateTime}
                  onChange={(e) => { updateEventDetail("dateTime", e.target.value); markFieldEdited("dateTime"); }}
                  placeholder="Date & Time"
                />
              </div>
              {/* Location */}
              <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                <label className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] mb-2">Location</label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-headline text-xl placeholder:text-[var(--color-outline-variant)]/60"
                  value={event.eventDetails.location}
                  onChange={(e) => { updateEventDetail("location", e.target.value); markFieldEdited("location"); }}
                  placeholder="Location"
                />
              </div>
              {/* Dress Code */}
              <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                <label className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] mb-2">Dress Code</label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-headline text-xl placeholder:text-[var(--color-outline-variant)]/60"
                  value={event.eventDetails.dressCode}
                  onChange={(e) => { updateEventDetail("dressCode", e.target.value); markFieldEdited("dressCode"); }}
                  placeholder="Black Tie"
                />
              </div>
              {/* RSVP Deadline */}
              <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                <label className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] mb-2">RSVP Deadline</label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-headline text-xl placeholder:text-[var(--color-outline-variant)]/60"
                  value={event.eventDetails.rsvpDeadline}
                  onChange={(e) => { updateEventDetail("rsvpDeadline", e.target.value); markFieldEdited("rsvpDeadline"); }}
                  placeholder="RSVP Deadline"
                />
              </div>
              {/* Host Notes */}
              <div className="flex flex-col border-b border-[var(--color-outline-variant)] py-2">
                <label className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] mb-2">Host Notes</label>
                <textarea
                  className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-body text-sm placeholder:text-[var(--color-outline-variant)]/60 resize-none"
                  value={event.eventDetails.notes}
                  onChange={(e) => { updateEventDetail("notes", e.target.value); markFieldEdited("notes"); }}
                  placeholder="Additional notes for guests…"
                  rows={3}
                />
              </div>

              <button
                onClick={handleSaveDetails}
                className="w-full py-4 bg-gradient-to-br from-[#735c00] to-[#d4af37] text-white font-label text-sm uppercase tracking-[0.2em] border-none cursor-pointer hover:brightness-110 transition-all shadow-lg"
              >
                Save Changes
              </button>
            </div>

            {/* Itinerary Management */}
            <div className="mt-16">
              <h3 className="font-headline text-2xl mb-8">Manage Itinerary</h3>
              <div className="space-y-4 mb-8">
                {event.itinerary.map((item) => (
                  <div key={item.id} className="p-4 bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/20 group">
                    <div className="flex items-start justify-between mb-2">
                      <input
                        className="font-label text-xs uppercase tracking-widest text-[var(--color-secondary)] bg-transparent border-none p-0 focus:ring-0 focus:outline-none w-24"
                        value={item.time}
                        onChange={(e) => updateItineraryItem(item.id, { time: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateItineraryItem(item.id, { isActive: !item.isActive })}
                          className={`text-[10px] font-label uppercase tracking-widest px-2 py-0.5 rounded-full border-none cursor-pointer ${item.isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface-container)] text-[var(--color-secondary)]'}`}
                        >
                          {item.isActive ? "Active" : "Set Active"}
                        </button>
                        <button
                          onClick={() => removeItineraryItem(item.id)}
                          className="material-symbols-outlined text-sm text-[var(--color-outline)] hover:text-red-500 bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        >delete</button>
                      </div>
                    </div>
                    <input
                      className="font-headline text-lg bg-transparent border-none p-0 focus:ring-0 focus:outline-none w-full mb-1"
                      value={item.title}
                      onChange={(e) => updateItineraryItem(item.id, { title: e.target.value })}
                    />
                    <input
                      className="text-sm text-[var(--color-secondary)] bg-transparent border-none p-0 focus:ring-0 focus:outline-none w-full"
                      value={item.description}
                      onChange={(e) => updateItineraryItem(item.id, { description: e.target.value })}
                    />
                  </div>
                ))}
              </div>

              {/* Add new item */}
              <div className="p-4 border border-dashed border-[var(--color-outline-variant)]/40 space-y-3">
                <p className="text-[10px] font-label uppercase tracking-widest text-[var(--color-primary)]">Add Item</p>
                <div className="grid grid-cols-4 gap-3">
                  <input className="col-span-1 bg-[var(--color-surface-container)] p-2 text-sm border-none focus:ring-0 outline-none" placeholder="Time" value={newItemTime} onChange={(e) => setNewItemTime(e.target.value)} />
                  <input className="col-span-3 bg-[var(--color-surface-container)] p-2 text-sm border-none focus:ring-0 outline-none" placeholder="Title" value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} />
                </div>
                <input className="w-full bg-[var(--color-surface-container)] p-2 text-sm border-none focus:ring-0 outline-none" placeholder="Description" value={newItemDesc} onChange={(e) => setNewItemDesc(e.target.value)} />
                <button onClick={handleAddItineraryItem} className="w-full py-2 bg-[var(--color-surface-container-high)] text-[var(--color-primary)] font-label text-xs uppercase tracking-widest border-none cursor-pointer hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                  + Add to Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pb-24 px-8 max-w-[1440px] mx-auto pt-8">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-label text-sm uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-4 block">Event Management</span>
            <h1 className="font-headline text-5xl md:text-6xl text-[var(--color-on-surface)] tracking-tight leading-tight">
              {event.eventDetails.eventName || "The Highland"} <span className="italic font-normal">Soirée</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEditDrawerOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#735c00] to-[#d4af37] text-white font-label text-xs uppercase tracking-widest border-none cursor-pointer hover:brightness-110 transition-all shadow-lg rounded-sm"
            >
              <span className="material-symbols-outlined text-sm">edit_note</span>
              Edit Event Details
            </button>
            <div className="flex items-center gap-0 bg-[var(--color-surface-container)] p-1 rounded-sm">
              <button className="px-4 py-2 text-sm font-label uppercase tracking-wider bg-[var(--color-surface-container-lowest)] text-[var(--color-primary)] shadow-sm border-none cursor-pointer">Current</button>
              <button className="px-4 py-2 text-sm font-label uppercase tracking-wider text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors border-none bg-transparent cursor-pointer">Archive</button>
              <button className="px-4 py-2 text-sm font-label uppercase tracking-wider text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors border-none bg-transparent cursor-pointer">Drafts</button>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
          <div className="bg-[var(--color-surface-container-low)] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-40">
            <span className="font-label text-xs uppercase tracking-widest text-[var(--color-secondary)]">Total Opens</span>
            <span className="font-headline text-4xl text-[var(--color-primary)]">1,284</span>
          </div>
          <div className="bg-[var(--color-surface-container-high)] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-40">
            <div className="flex justify-between items-start">
              <span className="font-label text-xs uppercase tracking-widest text-[var(--color-secondary)]">RSVP Status</span>
              <span className="font-label text-[10px] bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 py-0.5 rounded-full">{guests.length > 0 ? Math.round((attending / guests.length) * 100) : 0}% Rate</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-4xl text-[var(--color-primary)]">{guests.length}</span>
              <span className="font-label text-[10px] text-[var(--color-secondary)] mt-1">{attending} ATTENDING / {declined} DECLINED</span>
            </div>
          </div>
          <div className="bg-[var(--color-surface-container-highest)] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-40">
            <span className="font-label text-xs uppercase tracking-widest text-[var(--color-secondary)]">Checked-In</span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-4xl text-[var(--color-primary)]">{checkedIn}</span>
              <span className="font-label text-sm text-[var(--color-secondary)]">/ {guests.length}</span>
            </div>
          </div>
          <div className="bg-[var(--color-primary)] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:h-40 text-[var(--color-on-primary)]">
            <span className="font-label text-xs uppercase tracking-widest opacity-80">Media Uploads</span>
            <div className="flex items-center justify-between">
              <span className="font-headline text-4xl">{totalUploads}</span>
              <span className="material-symbols-outlined text-3xl">auto_awesome</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline text-3xl">Live Guest Feed</h2>
                <button className="border-none bg-transparent font-label text-xs uppercase tracking-widest text-[var(--color-primary)] border-b border-[var(--color-outline-variant)] pb-1 cursor-pointer">View Full Gallery</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="aspect-[3/4] bg-[var(--color-surface-container)] overflow-hidden group relative">
                  <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="candid photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNylqaKti4frHoJgoEyiZo8rqSmlncq92ki3lYm3dAChBUGBMrMQhq_XWw42FDp1JzhXetez7kz5HVJ8IvRjd0YLFO3IWPWkDQG6__7ZeSuEKlSRHTczwZqpdtb3KXtjwTm78wYH4FUltU9VLCZZjk7YwkUeveA2XCfZi6bzdX1NNuwriKVG_IE_gf2_kcymZKgXjOUfDGw6jJhf8Pdxd-dQT4t8qdMiCoC3PKcn_QJqRQxQlQA-gLWZQXI57ejo4dGFFj090a8-Y"/>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[10px] font-label uppercase tracking-tighter">Uploaded by Elena V.</span>
                  </div>
                </div>
                <div className="aspect-[3/4] bg-[var(--color-surface-container)] overflow-hidden group relative">
                  <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="elegant table setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdi4OkuuNwCcDReSlpt-X5PULpmz9L7WBvfsXQEO2qRZ1ZaDEOzR6LXGf03dnp6b5_sMxBkSaPRQv1VRJAJwpydumIy84-B5TYE1hlMU1uPl_Cm60bT4tx7p4sKAXz8Yqyy1ZlDW5-Q41CSzBAVO_8E7uEZqieZ-UrHo9pSfOrI55Wg8wD466NNnu9QaiwdVH9gimuHE3McEnWfJWMqarxEj5OKhBdBzyDo8iTD5oE6s2y1F1ikIm8N41bOcZG7NLlUNaQA4lGOB4"/>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[10px] font-label uppercase tracking-tighter">Uploaded by Marcus T.</span>
                  </div>
                </div>
                <div className="aspect-[3/4] bg-[var(--color-surface-container)] p-6 flex flex-col justify-between border border-[var(--color-outline-variant)]/20">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">mic</span>
                  <p className="text-xs italic text-[var(--color-secondary)] leading-relaxed">&quot;The ceremony was absolutely breathtaking. I&apos;ve never seen her so happy...&quot;</p>
                  <span className="font-label text-[10px] uppercase tracking-widest text-[var(--color-primary)]">Voice Note • 0:12</span>
                </div>
                <div className="aspect-[3/4] bg-[var(--color-surface-container)] overflow-hidden group relative">
                  <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="celebratory toast" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA84Z1YG0ZEn-luJOydNxrvMlYPCwhiePHP4vgwEYbuN6lX5biKuHx49q5en23_Q9P_57RGBYOmpqv36j9QBl0Oolc8EkPH-YvlTOwLOZezNQrF40WjD7Xj3HePwqy4EthtsskrBQMd8vW1TyQhpQ1HpSEQbaIvrlavW42IxUk1VdDiMzyJY_itN5YDCwodxJXm0ADDvpzBVAkAsJyWahUkTLMypO9bYXkLbK5RVbgnt-odcERT3WbvEYBfI4_IVFHVL9eFtH8ATk"/>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline text-3xl">Guest List</h2>
                <div className="flex gap-4">
                  <button className="bg-transparent border-none material-symbols-outlined p-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] cursor-pointer">search</button>
                  <button className="bg-transparent border-none material-symbols-outlined p-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] cursor-pointer">filter_list</button>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color-outline-variant)]">
                      <th className="py-4 font-label text-xs uppercase tracking-widest text-[var(--color-secondary)]">Name</th>
                      <th className="py-4 font-label text-xs uppercase tracking-widest text-[var(--color-secondary)]">Status</th>
                      <th className="py-4 font-label text-xs uppercase tracking-widest text-[var(--color-secondary)]">Check-in</th>
                      <th className="py-4 font-label text-xs uppercase tracking-widest text-[var(--color-secondary)] text-right">Uploads</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-outline-variant)]/10">
                    {guests.map((guest) => (
                      <tr key={guest.id}>
                        <td className="py-6 font-headline text-lg">{guest.name}</td>
                        <td className="py-6">
                          <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-tighter rounded-full ${
                            guest.status === 'attending' ? 'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]' :
                            guest.status === 'declined' ? 'bg-red-100 text-red-700' :
                            'bg-[var(--color-surface-container-highest)] text-[var(--color-secondary)]'
                          }`}>{guest.status === 'late' ? 'Late Response' : guest.status}</span>
                        </td>
                        <td className="py-6 text-sm text-[var(--color-secondary)]">{guest.checkedInAt || '—'}</td>
                        <td className="py-6 text-sm text-[var(--color-secondary)] text-right">{guest.uploads}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-16">
            <section className="bg-[var(--color-surface-container-low)] p-10 relative group cursor-pointer overflow-hidden border border-[var(--color-outline-variant)]/20">
              <div className="relative z-10">
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--color-primary)] mb-6 block">Live Publication</span>
                <h3 className="font-headline text-2xl mb-8 leading-tight italic">Digital Guest Booklet: The Memories</h3>
                <div className="aspect-[4/5] bg-white shadow-2xl p-6 flex flex-col items-center justify-center text-center">
                  <span className="font-headline text-4xl mb-4">M</span>
                  <div className="w-12 h-[1px] bg-[var(--color-outline-variant)] mb-4"></div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-[var(--color-secondary)]">Page 1 of 42</span>
                </div>
                <Link className="mt-8 flex items-center gap-2 font-label text-xs uppercase tracking-widest text-[var(--color-primary)] group-hover:gap-4 transition-all" href="/booklet">
                  Preview Booklet <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[var(--color-primary)]/5 rounded-full blur-3xl group-hover:bg-[var(--color-primary)]/10 transition-colors"></div>
            </section>

            {/* Live Itinerary — reads from EventContext */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-headline text-2xl">Live Itinerary</h3>
                <button onClick={() => setEditDrawerOpen(true)} className="bg-transparent border-none material-symbols-outlined text-[var(--color-primary)] cursor-pointer">edit_note</button>
              </div>
              <div className="space-y-6">
                {event.itinerary.map((item, idx) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full mb-2 ${item.isActive ? 'bg-[var(--color-primary)]' : 'border border-[var(--color-outline-variant)]'}`}></div>
                      {idx < event.itinerary.length - 1 && <div className="w-[1px] h-full bg-[var(--color-outline-variant)]"></div>}
                    </div>
                    <div className={`pb-8 ${!item.isActive ? 'opacity-60' : ''}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-label uppercase text-[var(--color-secondary)] tracking-widest">{item.time}{item.isActive ? ' • Active' : ''}</span>
                      </div>
                      <h4 className="font-headline text-lg">{item.title}</h4>
                      <p className="text-sm text-[var(--color-secondary)] mt-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => triggerToast("Notification sent to all guests")}
                className="w-full mt-8 py-4 bg-transparent border border-[var(--color-outline-variant)] text-xs font-label uppercase tracking-[0.2em] hover:bg-[var(--color-surface-container)] transition-colors cursor-pointer text-[var(--color-on-surface)]"
              >
                Notify All Guests
              </button>
            </section>

            <div className="bg-[var(--color-surface-dim)] p-8 space-y-4">
              <h4 className="font-label text-xs uppercase tracking-widest text-[var(--color-secondary)] mb-6">Quick Actions</h4>
              <button className="bg-transparent border-none w-full flex justify-between items-center group cursor-pointer text-[var(--color-on-surface)]">
                <span className="font-headline text-lg">Export Guest List</span>
                <span className="material-symbols-outlined text-[var(--color-primary)] group-hover:translate-x-1 transition-transform">download</span>
              </button>
              <div className="h-[1px] bg-[var(--color-outline-variant)]/30 w-full"></div>
              <button className="bg-transparent border-none w-full flex justify-between items-center group cursor-pointer text-[var(--color-on-surface)]">
                <span className="font-headline text-lg">Broadcast Message</span>
                <span className="material-symbols-outlined text-[var(--color-primary)] group-hover:translate-x-1 transition-transform">campaign</span>
              </button>
            </div>
          </aside>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}} />
    </>
  );
}
