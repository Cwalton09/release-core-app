import { createHmac, timingSafeEqual } from "crypto";

// Signed unsubscribe links, so a link only works for the account it was sent to.
// The service role key already lives only on the server, so it doubles as the secret.
function sign(userId: string) {
  return createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY!)
    .update(`unsubscribe:${userId}`)
    .digest("base64url");
}

export function unsubscribeUrl(userId: string) {
  const url = new URL("https://release-core.com/api/unsubscribe");
  url.searchParams.set("u", userId);
  url.searchParams.set("t", sign(userId));
  return url.toString();
}

export function isValidUnsubscribe(userId: string, token: string) {
  const expected = Buffer.from(sign(userId));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
