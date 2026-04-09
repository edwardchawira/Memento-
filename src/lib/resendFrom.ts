/**
 * Strip BOM/quotes from env, remove stray spaces in the address,
 * and lowercase the domain (Resend matches verified domains strictly).
 */
export function normalizeResendFrom(raw: string): string {
  let s = raw
    .trim()
    .replace(/^\uFEFF/, "")
    .replace(/^["']|["']$/g, "")
    .trim();
  const bracket = s.match(/^([\s\S]*?)\s*<([^>]+)>$/);
  if (bracket) {
    const display = bracket[1].trim();
    const addrRaw = bracket[2].trim().replace(/\s+/g, "");
    const at = addrRaw.lastIndexOf("@");
    if (at === -1) return s;
    const local = addrRaw.slice(0, at);
    const domain = addrRaw.slice(at + 1).toLowerCase();
    const email = `${local}@${domain}`;
    return display ? `${display} <${email}>` : email;
  }
  const compact = s.replace(/\s+/g, "");
  const at = compact.lastIndexOf("@");
  if (at === -1) return s;
  return `${compact.slice(0, at)}@${compact.slice(at + 1).toLowerCase()}`;
}

/** Domain part of the sender address after normalization (e.g. hspcn.cloud). */
export function domainFromResendFromHeader(from: string): string | null {
  const n = normalizeResendFrom(from);
  const m = n.match(/<([^>]+)>/);
  const email = (m ? m[1] : n).trim();
  const at = email.lastIndexOf("@");
  if (at === -1) return null;
  return email.slice(at + 1).toLowerCase();
}

export function resendErrorMessage(err: unknown): string {
  if (err == null) return "Resend error";
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null && "message" in err) {
    const m = (err as { message?: unknown }).message;
    if (typeof m === "string" && m.length > 0) return m;
  }
  try {
    return JSON.stringify(err);
  } catch {
    return "Resend error";
  }
}
