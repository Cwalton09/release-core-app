import { supabase } from "@/lib/supabase";

// fetch() that sends the logged-in member's access token, for paid-only API routes.
export async function memberFetch(url: string, init: RequestInit = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(init.headers);
  if (session) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  return fetch(url, { ...init, headers });
}
