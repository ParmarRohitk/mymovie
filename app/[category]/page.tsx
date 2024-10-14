"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Next.js Link for client-side navigation

// Define the type for the movie data
interface Movie {
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  releaseDate: string;
  duration: string;
  rating: number;
}

// Dynamic Page Component to Handle Category Routes
const CategoryPage = ({ params }: { params: { category: string } }) => {
  const { category } = params; // Get the dynamic category from the URL
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch movies from the API
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data: Movie[]) => {
        console.log("API Response:", data);

        // Filter movies by category (case-insensitive comparison)
        const filteredMovies = data.filter(
          (movie) => movie.category.toLowerCase() === category.toLowerCase()
        );

        console.log("Filtered Movies:", filteredMovies);
        setMovies(filteredMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [category]);

  // Render loading state if movies are not yet available
  if (!movies.length) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="pt-[100px] px-9 pt-[50px]">
      <h1 className="pb-5 text-xl">{category} Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              key={movie.slug}
              href={`/${movie.category}/${movie.slug}`} // Create dynamic link to movie page
            >
              <div className="movie-card cursor-pointer"> {/* Added cursor-pointer for better UX */}
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-auto rounded-lg"
                />
                <h2 className="text-xl mt-2">{movie.name}</h2>
                <div className="flex justify-between items-center mt-2">
                  <h3 className="text-lg font-medium">{movie.category}</h3>
                  <p className="text-yellow-400">{movie.rating} ⭐</p>
                  <p className="text-sm">{movie.duration}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No movies found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
