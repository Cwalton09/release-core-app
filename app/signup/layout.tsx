import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Account",
  description:
    "Start using Release Core to uncover the nervous system patterns behind anxiety, panic, overthinking, and shutdown, at your own pace.",
  alternates: { canonical: "/signup" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
