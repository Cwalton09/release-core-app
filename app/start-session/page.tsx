"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { goToCheckout } from "@/lib/checkout";

export default function StartSessionPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Not logged in
      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("paid")
        .eq("user_id", user.id)
        .single();

      // Not paid
      if (error || !profile?.paid) {
        goToCheckout(user);
        return;
      }

      // ✅ Only allowed if paid
      router.replace("/body-awareness");
    };

    checkAccess();
  }, [router]);

  return null;
}