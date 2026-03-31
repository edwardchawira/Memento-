import { supabase } from "./client";

export type SupabaseItineraryInsert = {
  event_id: string;
  position: number;
  starts_at_text?: string | null;
  title: string;
  description?: string | null;
  location_text?: string | null;
  speaker_name?: string | null;
  duration_minutes?: number | null;
};

export async function insertItineraryItems(items: SupabaseItineraryInsert[]) {
  if (!supabase) throw new Error("Supabase is not configured");
  if (items.length === 0) return { count: 0 };

  const { error } = await supabase.from("itinerary_items").insert(items);
  if (error) throw error;
  return { count: items.length };
}

