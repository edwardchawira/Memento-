"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  MementoEvent, defaultEvent, EventDetails, Hotspot, ItineraryItem, Guest, ExtractedData
} from '@/lib/eventTypes';

interface EventContextType {
  event: MementoEvent;
  setEventId: (id: string) => void;
  // Poster
  setPosterImage: (image: string) => void;
  setExtractedData: (data: ExtractedData) => void;
  // Event Details
  updateEventDetail: (field: keyof EventDetails, value: string) => void;
  markFieldEdited: (field: string) => void;
  // Hotspots
  addHotspot: (hotspot: Hotspot) => void;
  removeHotspot: (id: string) => void;
  updateHotspot: (id: string, updates: Partial<Hotspot>) => void;
  // Itinerary
  addItineraryItem: (item: ItineraryItem) => void;
  updateItineraryItem: (id: string, updates: Partial<ItineraryItem>) => void;
  removeItineraryItem: (id: string) => void;
  // Guests
  addGuest: (guest: Guest) => void;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
  // Flow tracking
  completedStep: number;
  setCompletedStep: (step: number) => void;
  // AI analysis
  isAnalysing: boolean;
  setIsAnalysing: (v: boolean) => void;
  // Toast
  showToast: string | null;
  triggerToast: (message: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [event, setEvent] = useState<MementoEvent>(defaultEvent);
  const [completedStep, setCompletedStep] = useState(0);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = useCallback((message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 2500);
  }, []);

  const setEventId = useCallback((id: string) => {
    setEvent(prev => ({ ...prev, id }));
  }, []);

  const setPosterImage = useCallback((image: string) => {
    setEvent(prev => ({ ...prev, posterImage: image }));
  }, []);

  const setExtractedData = useCallback((data: ExtractedData) => {
    setEvent(prev => {
      const newDetails = { ...prev.eventDetails };
      if (data.eventName) newDetails.eventName = data.eventName;
      if (data.date && data.time) newDetails.dateTime = `${data.date} • ${data.time}`;
      else if (data.date) newDetails.dateTime = data.date;
      if (data.location) newDetails.location = data.location;
      if (data.rsvpDeadline) newDetails.rsvpDeadline = data.rsvpDeadline;
      if (data.dressCode) newDetails.dressCode = data.dressCode;
      if (data.hostName) newDetails.hostName = data.hostName;
      if (data.additionalNotes) newDetails.notes = data.additionalNotes;
      const aiItinerary =
        Array.isArray(data.itineraryItems) && data.itineraryItems.length > 0
          ? data.itineraryItems
              .filter((i) => i && (i.title || i.time || i.description))
              .map((i, idx) => ({
                id: `ai-it-${Date.now()}-${idx}`,
                time: i.time ?? "",
                title: i.title ?? "Session",
                description: i.description ?? "",
                isActive: idx === 0,
                speakerName: i.speakerName ?? null,
                location: i.location ?? null,
                durationMinutes: i.durationMinutes ?? null,
              }))
          : null;

      return {
        ...prev,
        extractedData: data,
        eventDetails: newDetails,
        itinerary: aiItinerary ?? prev.itinerary,
        aiFieldsEdited: {},
      };
    });
  }, []);

  const updateEventDetail = useCallback((field: keyof EventDetails, value: string) => {
    setEvent(prev => ({
      ...prev,
      eventDetails: { ...prev.eventDetails, [field]: value }
    }));
  }, []);

  const markFieldEdited = useCallback((field: string) => {
    setEvent(prev => ({
      ...prev,
      aiFieldsEdited: { ...prev.aiFieldsEdited, [field]: true }
    }));
  }, []);

  const addHotspot = useCallback((hotspot: Hotspot) => {
    setEvent(prev => ({ ...prev, hotspots: [...prev.hotspots, hotspot] }));
  }, []);

  const removeHotspot = useCallback((id: string) => {
    setEvent(prev => ({ ...prev, hotspots: prev.hotspots.filter(h => h.id !== id) }));
  }, []);

  const updateHotspot = useCallback((id: string, updates: Partial<Hotspot>) => {
    setEvent(prev => ({
      ...prev,
      hotspots: prev.hotspots.map(h => h.id === id ? { ...h, ...updates } : h)
    }));
  }, []);

  const addItineraryItem = useCallback((item: ItineraryItem) => {
    setEvent(prev => ({ ...prev, itinerary: [...prev.itinerary, item] }));
  }, []);

  const updateItineraryItem = useCallback((id: string, updates: Partial<ItineraryItem>) => {
    setEvent(prev => ({
      ...prev,
      itinerary: prev.itinerary.map(i => i.id === id ? { ...i, ...updates } : i)
    }));
  }, []);

  const removeItineraryItem = useCallback((id: string) => {
    setEvent(prev => ({ ...prev, itinerary: prev.itinerary.filter(i => i.id !== id) }));
  }, []);

  const addGuest = useCallback((guest: Guest) => {
    setEvent(prev => ({ ...prev, guests: [...prev.guests, guest] }));
  }, []);

  const updateGuest = useCallback((id: string, updates: Partial<Guest>) => {
    setEvent(prev => ({
      ...prev,
      guests: prev.guests.map(g => g.id === id ? { ...g, ...updates } : g)
    }));
  }, []);

  return (
    <EventContext.Provider value={{
      event, setEventId, setPosterImage, setExtractedData,
      updateEventDetail, markFieldEdited,
      addHotspot, removeHotspot, updateHotspot,
      addItineraryItem, updateItineraryItem, removeItineraryItem,
      addGuest, updateGuest, completedStep, setCompletedStep,
      isAnalysing, setIsAnalysing,
      showToast, triggerToast,
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent must be used within EventProvider");
  return ctx;
}
