import type { Metadata, Viewport } from "next";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "#lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hamza's Portfolio",
  description: "Interactive macOS & iOS styled portfolio of Hamza Jabbar — Software Developer specializing in React, Next.js, TypeScript and modern web applications.",
  icons: {
    icon: "/images/finder.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = buildPersonJsonLd();
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Georama:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}
