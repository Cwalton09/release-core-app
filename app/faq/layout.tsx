import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nervous System Release FAQ",
  description:
    "Answers about the Release Core Method: how many sessions to do, how to tell it's working, and how your nervous system processes and releases old patterns.",
  alternates: { canonical: "/faq" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
