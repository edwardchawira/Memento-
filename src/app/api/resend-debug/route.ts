import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { domainFromResendFromHeader, normalizeResendFrom } from "@/lib/resendFrom";

/**
 * GET — compare RESEND_FROM domain to domains registered on this API key.
 * Requires: Authorization: Bearer <RESEND_DEBUG_SECRET> and RESEND_DEBUG_SECRET in env.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.RESEND_DEBUG_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: "Set RESEND_DEBUG_SECRET in env to use this endpoint." },
      { status: 404 }
    );
  }

  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.RESEND_API_KEY?.trim();
  const fromRaw = process.env.RESEND_FROM;
  if (!key) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set" }, { status: 500 });
  }
  if (!fromRaw?.trim()) {
    return NextResponse.json({ error: "RESEND_FROM is not set" }, { status: 500 });
  }

  const resend = new Resend(key);
  const listResult = await resend.domains.list();

  if (listResult.error) {
    return NextResponse.json(
      {
        error: "Could not list domains with this API key",
        resendMessage: listResult.error.message,
        hint: "If this fails, the API key may be invalid, revoked, or missing the Domains scope.",
      },
      { status: 502 }
    );
  }

  const rows = listResult.data?.data ?? [];
  const fromNormalized = normalizeResendFrom(fromRaw);
  const fromDomain = domainFromResendFromHeader(fromRaw);

  const domains = rows.map((d) => ({
    name: d.name,
    status: d.status,
    region: d.region,
    sending: d.capabilities?.sending,
    receiving: d.capabilities?.receiving,
  }));

  const match = fromDomain
    ? rows.find((d) => d.name.toLowerCase() === fromDomain.toLowerCase())
    : undefined;

  let diagnosis: string;
  if (!fromDomain) {
    diagnosis = "Could not parse a domain from RESEND_FROM. Use: Name <user@yourdomain.com> or user@yourdomain.com";
  } else if (!match) {
    diagnosis = `No domain named "${fromDomain}" exists for this API key. Add it in Resend (same account as this key) or fix RESEND_FROM.`;
  } else if (match.status !== "verified") {
    diagnosis = `Domain "${match.name}" exists but status is "${match.status}", not verified — fix DNS records in Resend.`;
  } else if (match.capabilities?.sending !== "enabled") {
    diagnosis = `Domain "${match.name}" is verified but outbound sending is "${match.capabilities?.sending ?? "unknown"}". Enable sending for this domain in Resend.`;
  } else {
    diagnosis = "Domain and sending look correct for this API key. If email send still fails, contact Resend support with the exact error.";
  }

  return NextResponse.json({
    fromNormalized,
    fromDomainParsed: fromDomain,
    domainsOnThisApiKey: domains,
    matchedDomain: match
      ? {
          name: match.name,
          status: match.status,
          region: match.region,
          sending: match.capabilities?.sending,
          receiving: match.capabilities?.receiving,
        }
      : null,
    diagnosis,
  });
}
