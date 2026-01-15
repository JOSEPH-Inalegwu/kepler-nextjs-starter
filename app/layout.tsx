import type { Metadata } from "next";
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
  title: "Keplars Next.js Form - Secure Contact Form with Server Actions",
  description: "A secure, server-side contact form pattern for Next.js applications using the Keplars Email API. Zero client-side API keys, built with Server Actions and TypeScript.",
  keywords: ["Next.js", "Contact Form", "Server Actions", "Keplars Email", "TypeScript", "Tailwind CSS", "React"],
  authors: [{ name: "Joseph Inalegwu", url: "https://github.com/JOSEPH-Inalegwu" }],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Keplars Next.js Form",
    description: "Secure contact form pattern with Next.js Server Actions and Keplars Email API",
    type: "website",
    url: "https://github.com/JOSEPH-Inalegwu/kepler-nextjs-starter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keplars Next.js Form",
    description: "Secure contact form pattern with Next.js Server Actions",
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
