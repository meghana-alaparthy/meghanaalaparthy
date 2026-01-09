import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://meghanaalaparthy.com'),
  title: {
    default: "Meghana Alaparthy | Software Developer III (Distributed Systems)",
    template: "%s | Meghana Alaparthy"
  },
  description: "Senior Software Developer specializing in distributed systems, microservices, and high-scale backend architecture. Currently SDE III at Paycom.",
  keywords: ["Meghana Alaparthy", "Software Developer", "SDE III", "Distributed Systems", "Backend Engineer", "Paycom", "Java", "Microservices"],
  authors: [{ name: "Meghana Alaparthy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meghanaalaparthy.com",
    title: "Meghana Alaparthy | Software Developer III",
    description: "Building scalable distributed systems and resilient microservices.",
    siteName: "Meghana Alaparthy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meghana Alaparthy | Software Developer III",
    description: "Building scalable distributed systems and resilient microservices.",
  },
  robots: {
    index: true,
    follow: true,
  }
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
        <Navbar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Meghana Alaparthy",
              "url": "https://meghanaalaparthy.com",
              "jobTitle": "Software Developer III",
              "worksFor": {
                "@type": "Organization",
                "name": "Paycom"
              },
              "sameAs": [
                "https://www.linkedin.com/in/meghanaalaparthy/",
                "https://github.com/meghana-alaparthy"
              ],
              "alumniOf": [
                {
                  "@type": "CollegeOrUniversity",
                  "name": "The University of Oklahoma"
                },
                {
                  "@type": "CollegeOrUniversity",
                  "name": "Shiv Nadar University"
                }
              ],
              "knowsAbout": ["Distributed Systems", "Microservices", "Java", "Python", "System Design"]
            })
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
