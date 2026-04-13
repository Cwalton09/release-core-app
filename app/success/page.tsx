"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const markUserPaid = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      await supabase.from("profiles").upsert(
        {
          user_id: user.id,
          paid: true,
        },
        { onConflict: "user_id" }
      );

      router.replace("/dashboard");
    };

    markUserPaid();
  }, [router]);

  return <div className="p-10 text-center">Processing payment...</div>;
}