import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Release Core collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
