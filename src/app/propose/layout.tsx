import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Someone Has a Question For You...",
  description:
    "Someone special has created a personalized proposal just for you. Open the link to see their heartfelt message and answer the most important question of your life!",
  openGraph: {
    title: "Someone Has a Question For You... 💍",
    description:
      "Someone special has a very important question to ask you. Open the link to find out!",
    url: "/propose",
  },
  twitter: {
    title: "Someone Has a Question For You... 💍",
    description:
      "Someone special has a very important question to ask you. Open the link to find out!",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProposeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
