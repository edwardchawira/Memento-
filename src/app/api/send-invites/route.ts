import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

type Body = {
  eventId: string;
  emails: string[];
  appUrl?: string;
};

function uniqNormalizedEmails(emails: string[]) {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const e of emails) {
    const v = String(e || "").trim().toLowerCase();
    if (!v || !v.includes("@")) continue;
    if (seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Body>;
    const eventId = body.eventId?.trim();
    const emails = uniqNormalizedEmails(body.emails ?? []);

    if (!eventId || emails.length === 0) {
      return NextResponse.json({ error: "Missing eventId or emails" }, { status: 400 });
    }

    const admin = createAdminClient();

    // One row per email (skip duplicates for this event so re-sends still work)
    const guests: { id: string; email: string }[] = [];
    for (const email of emails) {
      const { data: existing } = await admin
        .from("guests")
        .select("id,email")
        .eq("event_id", eventId)
        .eq("email", email)
        .maybeSingle();
      if (existing) {
        guests.push(existing);
        continue;
      }
      const { data: inserted, error: insErr } = await admin
        .from("guests")
        .insert({ event_id: eventId, email, rsvp_status: "pending" })
        .select("id,email")
        .single();
      if (insErr) {
        return NextResponse.json({ error: insErr.message }, { status: 500 });
      }
      if (inserted) guests.push(inserted);
    }

    const resendKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;

    // If Resend isn't configured, still return created guests.
    if (!resendKey || !resendFrom) {
      return NextResponse.json({ guests, sent: 0, skipped: emails.length }, { status: 200 });
    }

    const resend = new Resend(resendKey);
    const baseUrl = body.appUrl || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    let sent = 0;
    const sendErrors: Array<{ email: string; message: string }> = [];
    for (const g of guests ?? []) {
      const link = `${baseUrl}/invite?eventId=${encodeURIComponent(eventId)}&guestId=${encodeURIComponent(
        g.id
      )}`;

      const { error } = await resend.emails.send({
        from: resendFrom,
        to: [g.email],
        subject: "RSVP — your invite, live itinerary & guest gallery",
        html: `
          <div style="font-family:ui-sans-serif,system-ui,-apple-system;line-height:1.6;color:#111827">
            <h2 style="margin:0 0 12px 0">You’re invited</h2>
            <p style="margin:0 0 12px 0">Open your personal link to:</p>
            <ul style="margin:0 0 16px 18px;padding:0">
              <li>RSVP (Accept or Decline)</li>
              <li>See the <strong>live itinerary</strong> — updates appear as the host makes changes</li>
              <li>Share <strong>photos, voice notes, and short videos</strong> — visible to other guests on the same invite experience and on the host dashboard</li>
            </ul>
            <p style="margin:0 0 24px 0">
              <a href="${link}" style="display:inline-block;background:#2e5bff;color:#fff;text-decoration:none;padding:12px 18px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:12px;border-radius:4px">
                Open RSVP &amp; live invite
              </a>
            </p>
            <p style="margin:0;color:#6b7280;font-size:12px">If the button doesn’t work, copy this URL into your browser:<br/>${link}</p>
          </div>
        `,
      });

      if (!error) {
        sent += 1;
      } else {
        const msg = typeof (error as any)?.message === "string" ? (error as any).message : "Resend error";
        sendErrors.push({ email: g.email, message: msg });
        console.error("[send-invites] resend error", { email: g.email, message: msg });
      }
    }

    return NextResponse.json(
      { guests, sent, skipped: (guests?.length ?? 0) - sent, sendErrors },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to send invites" }, { status: 500 });
  }
}

