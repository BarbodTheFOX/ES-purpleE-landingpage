import type { Metadata, Viewport } from "next";
import { siteContent } from "@/lib/content";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
