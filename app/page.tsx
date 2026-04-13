"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      // 🚫 NOT logged in → go to login
      if (!user) {
        window.location.href = "/login";
        return;
      }

      // ✅ Logged in → check payment
      const { data: profile } = await supabase
        .from("profiles")
        .select("paid")
        .eq("user_id", user.id)
        .single();

      // ❌ Not paid → Stripe
      if (!profile?.paid) {
        window.location.href = "https://buy.stripe.com/your-link";
        return;
      }

      // ✅ Paid → dashboard
      window.location.href = "/dashboard";
    };

    checkUser();
  }, []);

  return <p>Loading...</p>;
}