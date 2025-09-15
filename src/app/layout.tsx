import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "Next.js Blog Practice",
    template: "%s | Next.js Blog Practice",
  },
  description:
    "A modern blog built with Next.js 15, Radix UI, and Tailwind CSS. Featuring internationalization, dark mode, and responsive design.",
  keywords: ["blog", "nextjs", "radix-ui", "tailwind", "typescript", "react"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Next.js Blog Practice",
    description:
      "A modern blog built with Next.js 15, Radix UI, and Tailwind CSS",
    siteName: "Next.js Blog Practice",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Next.js Blog Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Blog Practice",
    description:
      "A modern blog built with Next.js 15, Radix UI, and Tailwind CSS",
    images: ["/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
