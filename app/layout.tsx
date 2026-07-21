import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import CustomCursor from "@/components/ui/CustomCursor";
import NavBar from "@/components/ui/NavBar";

// Google Fonts Setup
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adonis Jeswin",
    "jobTitle": "Full-Stack Developer & UI/UX Designer",
    "url": siteConfig.url,
    "sameAs": [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ],
    "knowsAbout": [
      "Computer Science",
      "Artificial Intelligence",
      "Cybersecurity",
      "Cloud Computing",
      "Full-Stack Development",
      "Next.js",
      "Solidity Web3",
      "Node.js",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
        id="top"
      >
        {/* Custom cursor (mouse only) */}
        <CustomCursor />
        
        {/* Persistent top navbar */}
        <NavBar />
        
        {/* Primary page tree */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
