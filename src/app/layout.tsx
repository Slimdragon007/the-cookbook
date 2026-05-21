import type { Metadata, Viewport } from "next";
import {
  Caveat,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
  Lora,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

// Default voice fonts (always loaded).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Alternate voice fonts (loaded for TASK-026 tweaks-panel voice presets).
// Notebook: Caveat (display) + Lora (body). Studio: Space Grotesk all-sans.
// CSS variables only fire when [data-voice] picks them via the
// --font-display-active / --font-sans-active indirection in globals.css.
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julie's Cookbook",
  description: "A beautiful cookbook app for Julie",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Cookbook",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#D97757",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className={`${inter.variable} ${instrument.variable} ${jetbrains.variable} ${caveat.variable} ${lora.variable} ${spaceGrotesk.variable} font-sans antialiased text-ink bg-paper`}
      >
        <div className="ambient-bg">
          <div className="grid-overlay" />
        </div>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
