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

    // Create guest rows first (so we can deep-link with guestId)
    const { data: guests, error: guestErr } = await admin
      .from("guests")
      .insert(
        emails.map((email) => ({
          event_id: eventId,
          email,
          rsvp_status: "pending",
        }))
      )
      .select("id,email");

    if (guestErr) {
      return NextResponse.json({ error: guestErr.message }, { status: 500 });
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
        subject: "You’re invited — RSVP",
        html: `
          <div style="font-family:ui-sans-serif,system-ui,-apple-system;line-height:1.6">
            <h2 style="margin:0 0 12px 0">You’re invited</h2>
            <p style="margin:0 0 16px 0">Tap below to RSVP and access the live itinerary.</p>
            <p style="margin:0 0 24px 0">
              <a href="${link}" style="display:inline-block;background:#2e5bff;color:#fff;text-decoration:none;padding:12px 18px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:12px">
                Open Invite
              </a>
            </p>
            <p style="margin:0;color:#6b7280;font-size:12px">If the button doesn’t work, open: ${link}</p>
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

