'use client'
// import type { Metadata } from "next";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

// export const metadata = {
//   title: "Admin - Movie Management",
//   description: "Admin interface for managing movies.",
//   robots: {
//     index: false,
//     follow: false,
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth'); // Log out user
    router.push('/add-movie/login'); // Redirect to login page
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      router.push('/add-movie/login');
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <header className="fixed top-0 left-0 w-full p-5 z-50  shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <a href="/" className="flex items-center mb-4 md:mb-0">
              <img alt="Moviestreamtv" src="/logo.png" height={80} width={80} />
            </a>

            <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <a href="/add-movie/secure-page" className="text-black bg-white p-2 border border-black rounded-lg hover:text-orange-700 text-xl">
                Add Movie
              </a>
              <a href="/add-movie/movies-list" className="text-black bg-white p-2 border border-black rounded-lg hover:text-orange-700 text-xl">
                Movies
              </a>
              <button
                onClick={handleLogout}
                className="text-black bg-red-600 p-2 border border-red-600 rounded-lg hover:bg-red-700 hover:text-white text-xl"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>
        <main className="mt-20">{children}</main> {/* Add margin to prevent content being hidden behind the fixed header */}

      </body>
    </html>
  );
}
