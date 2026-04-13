"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const markUserPaid = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          router.push("/login");
          return;
        }

        const { error: profileError } = await supabase.from("profiles").upsert(
          {
            user_id: user.id,
            paid: true,
          },
          {
            onConflict: "user_id",
          }
        );

        if (profileError) {
          console.error("Error updating profile:", profileError);
        }

        router.push("/disclaimer");
      } catch (error) {
        console.error("Unexpected success page error:", error);
        router.push("/login");
      }
    };

    markUserPaid();
  }, [router]);

  return <div className="p-10 text-center">Processing payment...</div>;
}