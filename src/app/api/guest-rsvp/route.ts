import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED = new Set(["attending", "declined", "pending"]);

export async function GET(req: NextRequest) {
  try {
    const guestId = req.nextUrl.searchParams.get("guestId")?.trim();
    const eventId = req.nextUrl.searchParams.get("eventId")?.trim();
    if (!guestId || !eventId) {
      return NextResponse.json({ error: "Missing guestId or eventId" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("guests")
      .select("id,rsvp_status,event_id")
      .eq("id", guestId)
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.event_id !== eventId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ rsvp_status: data.rsvp_status ?? "pending" });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { guestId?: string; eventId?: string; status?: string };
    const guestId = body.guestId?.trim();
    const eventId = body.eventId?.trim();
    const status = body.status?.trim();

    if (!guestId || !eventId || !status || !ALLOWED.has(status)) {
      return NextResponse.json({ error: "Invalid guestId, eventId, or status" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: row, error: fetchErr } = await admin
      .from("guests")
      .select("id,event_id")
      .eq("id", guestId)
      .maybeSingle();

    if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    if (!row || row.event_id !== eventId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { data: updated, error: upErr } = await admin
      .from("guests")
      .update({ rsvp_status: status })
      .eq("id", guestId)
      .select("id,rsvp_status")
      .single();

    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

    return NextResponse.json({ guest: updated });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed" }, { status: 500 });
  }
}
