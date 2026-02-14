import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Proposal",
  description:
    "Design a personalized 'Will You Marry Me?' proposal page. Choose a beautiful theme, add their name, write a heartfelt message, and get a shareable link to pop the question.",
  openGraph: {
    title: "Create Your Proposal | Will You Marry Me?",
    description:
      "Design a personalized proposal page with beautiful themes and a heartfelt message. Get a shareable link to pop the question!",
    url: "/create",
  },
  twitter: {
    title: "Create Your Proposal | Will You Marry Me?",
    description:
      "Design a personalized proposal page with beautiful themes and a heartfelt message.",
  },
  alternates: {
    canonical: "/create",
  },
};

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
