import "./globals.css";
import "./screenshot-home.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LuxuryScroll } from "@/components/motion/LuxuryScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://docksideconstructions.com"),
  title: {
    default: "Dockside Constructions Private Limited",
    template: "%s | Dockside Constructions",
  },
  description:
    "Dockside Constructions Private Limited is a premium infrastructure and construction company delivering civil, industrial, road, electrical, drainage and public-sector works with disciplined project controls.",
  keywords: [
    "Dockside Constructions",
    "civil construction",
    "industrial construction",
    "road infrastructure",
    "electrical works",
    "infrastructure company Tamil Nadu",
  ],
  icons: {
    icon: [
      {
        url: "/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  appleWebApp: {
    title: "Dockside",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Dockside Constructions Private Limited | Premium Infrastructure Delivery",
    description:
      "Premium civil, industrial and infrastructure delivery with cinematic project presentation, quality controls and executive-grade site discipline.",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark h-full antialiased ${inter.variable}`}>
      <body className="flex min-h-full flex-col">
        <LuxuryScroll />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
