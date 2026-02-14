import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://love.narendran.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Will You Marry Me? - Create a Personalized Proposal Page",
    template: "%s | Will You Marry Me?",
  },
  description:
    "Create a beautiful, personalized 'Will You Marry Me?' proposal page and share it with the love of your life. Choose from stunning themes, add your message, and watch the magic happen — the No button runs away!",
  keywords: [
    "will you marry me",
    "marriage proposal",
    "proposal page",
    "online proposal",
    "personalized proposal",
    "romantic proposal",
    "proposal link",
    "marry me website",
    "proposal generator",
    "creative proposal ideas",
    "digital proposal",
    "surprise proposal",
    "love proposal",
    "engagement",
    "proposal card online",
  ],
  authors: [{ name: "Narendran", url: siteUrl }],
  creator: "Narendran",
  publisher: "Narendran",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Will You Marry Me?",
    title: "Will You Marry Me? - Create a Personalized Proposal Page",
    description:
      "Create a beautiful, personalized proposal page and share it with your special someone. Choose from stunning themes, add a heartfelt message, and watch the No button run away!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Will You Marry Me? - Personalized Proposal Page Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will You Marry Me? - Create a Personalized Proposal Page",
    description:
      "Create a beautiful, personalized proposal page. Choose themes, add your message, and share it — the No button runs away!",
    images: ["/og-image.png"],
    creator: "@narendran",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  category: "lifestyle",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f48fb1" },
    { media: "(prefers-color-scheme: dark)", color: "#ec407a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Will You Marry Me?",
              url: siteUrl,
              description:
                "Create a beautiful, personalized marriage proposal page and share it with the love of your life.",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Personalized proposal pages",
                "6 beautiful color themes",
                "Shareable proposal links",
                "Interactive Yes/No buttons",
                "Celebration animations",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
