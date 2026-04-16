import type { Metadata } from "next";
import { Inter, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Greenville Garden Club",
  description: "An active gardening community with programs and activities for all levels of interest and experience.",
  openGraph: {
    title: "Greenville Garden Club",
    description: "An active gardening community with programs and activities for all levels of interest and experience.",
    images: [{ url: '/images/OG-Hero.png', width: 1200, height: 630 }],
    siteName: "Greenville Garden Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenville Garden Club",
    description: "An active gardening community with programs and activities for all levels of interest and experience.",
    images: ['/images/OG-Hero.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
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
        className={`${inter.variable} ${playfair.variable} ${lato.variable} flex flex-col min-h-screen bg-surface`}
      >
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

