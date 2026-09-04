import type { Metadata, Viewport } from "next";
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
  return (
    <html lang="en">
      <body className="antialiased overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}
