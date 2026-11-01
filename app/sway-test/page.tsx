import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import SwayTestClient from "./SwayTestClient";

export const metadata: Metadata = {
  title: "Free Sway Test: Ask Your Body a Yes or No Question",
  description:
    "A free 3-minute guided sway test. Find your body's yes and no, then ask it one question about what you're dealing with.",
  alternates: { canonical: "/sway-test" },
};

export default function SwayTestPage() {
  return (
    <AppShell title="Ask your body" bare>
      <SwayTestClient />
    </AppShell>
  );
}
