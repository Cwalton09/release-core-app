import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qrfvgxbdjlhzlrjrjabfg.supabase.co";
const supabaseKey = "sb_publishable_1lxu0qNJ1ovOKsME1ZCM0Q_0ENG25qu";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});