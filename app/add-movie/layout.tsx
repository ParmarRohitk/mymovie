import type { Metadata } from "next";

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
      <body
      >
        <header className="fixed top-0 left-0 w-full p-5  z-50 ">
          <div className="container mx-auto flex justify-between items-center">
            <a href="/">
              {<img alt="Moviestreamtv" src="/logo.png" height={80} width={80} />}

              {/* <h1 className="text-3xl font-bold text-white">Movie</h1> */}
            </a>

            <nav className={` absolute lg:static top-16 right-0 bg-black lg:bg-transparent w-full lg:w-auto`}>
              <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 p-6 lg:p-0 text-center lg:text-left">
                <li><a href="/add-movie/list" className="text-white hover:text-gray-300">Movies</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="-p-4 pb-9">{children}</main>
      </body>
    </html>
  );
}