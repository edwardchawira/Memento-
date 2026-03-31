import { supabase } from "./client";

export type SupabaseEventInsert = {
  theme?: string;
  title?: string | null;
  host_name?: string | null;
  date_text?: string | null;
  time_text?: string | null;
  location_text?: string | null;
  dress_code_text?: string | null;
  rsvp_deadline_text?: string | null;
  additional_notes?: string | null;
  poster_raw_text?: string | null;
  poster_extracted?: unknown;
};

export async function createEvent(input: SupabaseEventInsert) {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase.from("events").insert(input).select("id").single();
  if (error) throw error;
  return data;
}

export async function updateEvent(eventId: string, patch: Partial<SupabaseEventInsert>) {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from("events")
    .update(patch)
    .eq("id", eventId)
    .select("id")
    .single();
  if (error) throw error;
  return data;
}

