import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist', // Defines the CSS variable name
  weight: ['400', '500', '600', '700'], // Choose your needed weights
});

export const metadata: Metadata = {
  title: "KAAS",
  description: "Heavy haul and pilot cars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
