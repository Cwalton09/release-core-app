import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Quiz: What Is Your Body Protecting You From?",
  description:
    "A free 2-minute quiz to find the protection pattern your nervous system is running: The Guard, The Peacekeeper, The Holder, or The Shutdown.",
  alternates: { canonical: "/quiz" },
};

export default function QuizPage() {
  return (
    <AppShell title="What is your body protecting you from?" bare>
      <QuizClient />
    </AppShell>
  );
}
