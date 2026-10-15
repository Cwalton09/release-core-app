import { createClient } from "@supabase/supabase-js";

export type Subscriber = {
  id: string;
  email: string;
  first_name: string | null;
  source: string | null;
  quiz_pattern: string | null;
  quiz_started_at: string | null;
  created_at: string;
  welcome_sent: number;
  quiz_sent: number;
  unsubscribed_at: string | null;
  last_error: string | null;
};

export function serviceClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

export const QUIZ_PATTERNS = ["guard", "peacekeeper", "holder", "shutdown"];
