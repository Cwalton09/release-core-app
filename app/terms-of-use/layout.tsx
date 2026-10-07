import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms for using the Release Core website and app.",
  alternates: { canonical: "/terms-of-use" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
