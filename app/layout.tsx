import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://firstcongregationalstalbans.org"),
  title: "First Congregational Church of St. Albans",
  description:
    "A joyful, welcoming, Open and Affirming church beside Taylor Park in St. Albans, Vermont. Sunday worship at 10:00 am.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    title: "There’s room for you here.",
    description:
      "Worship, music, reflection, and everyday community life in the heart of St. Albans, Vermont.",
    type: "website",
    locale: "en_US",
    siteName: "First Congregational Church of St. Albans",
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "First Congregational Church of St. Albans — There’s room for you here.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "There’s room for you here.",
    description:
      "Sunday worship at 10:00 am beside Taylor Park in St. Albans, Vermont.",
    images: ["/social-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
