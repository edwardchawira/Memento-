export interface ExtractedData {
  eventName: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  dressCode: string | null;
  hostName: string | null;
  rsvpDeadline: string | null;
  additionalNotes: string | null;
  rawTextBlocks: string[];
}

export interface EventDetails {
  eventName: string;
  dateTime: string;
  location: string;
  rsvpDeadline: string;
  dressCode: string;
  hostName: string;
  notes: string;
}

export type HotspotType = 'selfie' | 'video' | 'voice';

export interface Hotspot {
  id: string;
  type: HotspotType;
  xPercent: number; // 0-100
  yPercent: number; // 0-100
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  isActive: boolean;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  status: 'attending' | 'declined' | 'pending' | 'late';
  checkedInAt: string | null;
  uploads: number;
}

export interface MementoEvent {
  id: string;
  posterImage: string | null;
  extractedData: ExtractedData | null;
  eventDetails: EventDetails;
  hotspots: Hotspot[];
  itinerary: ItineraryItem[];
  guests: Guest[];
  aiFieldsEdited: Record<string, boolean>; // track which AI fields user has manually edited
}

export const defaultEventDetails: EventDetails = {
  eventName: '',
  dateTime: '',
  location: '',
  rsvpDeadline: '',
  dressCode: '',
  hostName: '',
  notes: '',
};

export const defaultEvent: MementoEvent = {
  id: crypto.randomUUID?.() || 'evt-001',
  posterImage: null,
  extractedData: null,
  eventDetails: { ...defaultEventDetails },
  hotspots: [],
  itinerary: [
    { id: '1', time: '20:30 PM', title: 'Cake Cutting Ceremony', description: 'Main Hall, North Wing. Traditional bagpipe accompaniment.', isActive: true },
    { id: '2', time: '21:15 PM', title: 'First Dance', description: 'Ballroom floor. Song: "At Last" by Etta James.', isActive: false },
  ],
  guests: [
    { id: '1', name: 'Julianne Moore', email: 'julianne@mail.com', status: 'pending', checkedInAt: null, uploads: 12 },
    { id: '2', name: 'Sterling Archer', email: 'sterling@mail.com', status: 'late', checkedInAt: null, uploads: 0 },
    { id: '3', name: 'Sofia Coppola', email: 'sofia@mail.com', status: 'attending', checkedInAt: '18:15 PM', uploads: 34 },
  ],
  aiFieldsEdited: {},
};
