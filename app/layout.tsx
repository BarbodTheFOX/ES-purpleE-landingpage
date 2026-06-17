import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteContent } from "@/lib/content";
import "./globals.css";

const eventumFont = localFont({
  src: [
    {
      path: "../public/fonts/eventum/PeydaWeb-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/eventum/PeydaWeb-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/eventum/PeydaWeb-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/eventum/PeydaWeb-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/eventum/PeydaWeb-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/eventum/PeydaWeb-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/eventum/PeydaWeb-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/eventum/PeydaWeb-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/eventum/PeydaWeb-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-eventum",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: `${siteContent.brand.campaign} | ${siteContent.brand.eventum}`,
  description: siteContent.hero.subtitle,
};

export const viewport: Viewport = {
  themeColor: "#07070B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${eventumFont.variable} font-sans`}>{children}</body>
    </html>
  );
}
