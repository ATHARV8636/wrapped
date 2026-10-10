import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wrapped.example.app"),
  title: "Wrapped — Your Year, Wrapped.",
  description:
    "Turn your GitHub, LeetCode, or Goodreads data into a beautiful interactive story.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Wrapped — Your Year, Wrapped.",
    description:
      "Turn your GitHub, LeetCode, or Goodreads data into a beautiful interactive story.",
    type: "website",
    siteName: "Wrapped",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wrapped — Your Year, Wrapped.",
    description:
      "Turn your GitHub, LeetCode, or Goodreads data into a beautiful interactive story.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
