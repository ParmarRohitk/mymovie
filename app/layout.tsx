import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Top Movie Streaming Platform - Watch Latest Movies",
  description: "Discover and stream the latest movies, including action, drama, comedy, and more. Watch trailers and find your favorite films now.",
  keywords: "movies, streaming, watch online, latest movies, HD movies, trailers, action, drama, comedy",
  authors: [{ name: "Movie", url: "https://cinemaio.vercel.app" }],
  openGraph: {
    title: "Stream Latest Movies - Movie",
    description: "Explore the best movies in various genres. Watch trailers, get movie details, and stream movies in HD.",
    url: "https://cinemaio.vercel.app",
    siteName: "Movie",
    images: [
      {
        url: "https://cinemaio.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Movie Streaming Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stream the Best Movies - Movie",
    description: "Watch the latest movies and trailers. Your favorite films in action, comedy, and more are available here.",
    images: ["https://cinemaio.vercel.app/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // canonical: "https://cinemaio.vercel.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="google-site-verification" content="O5RyKRlsslVL2SRzbfS8uWFZJyaTm7fLpN3x5u1BG4g" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="-p-4 pb-9">{children}</main>
        <Footer />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-MWK28923Y1`}
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MWK28923Y1', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
