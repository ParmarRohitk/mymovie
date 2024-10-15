"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Movie {
  id: number;
  slug: string;
  name: string;
  category: string;
  rating: number;
  duration: string;
  releaseDate: string;
  language: string;
  description: string;
  image: string;
  trailer: string;
  screenshots: string[];
  recommended: number[];
}

const MovieDetailPage = () => {
  const { category, movie } = useParams(); // Get category and movie from the URL
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  // Function to convert YouTube URL to embed format
  const getEmbedUrl = (trailerUrl: string) => {
    const videoId = trailerUrl.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Fetch the movie data
  useEffect(() => {
    fetch(`/api/movies`)
      .then((response) => response.json())
      .then((data) => {
        const foundMovie = data.find(
          (m: Movie) =>
            m.slug === movie && m.category.toLowerCase() === category.toLowerCase()
        );
        setMovieData(foundMovie);

        if (foundMovie && foundMovie.recommended.length > 0) {
          const recommendedData = data.filter((m: Movie) =>
            foundMovie.recommended.includes(m.id) &&
            m.language.toLowerCase() === foundMovie.language.toLowerCase()
          );
          setRecommendedMovies(recommendedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [category, movie]);

  return (
    <div className="movie-detail-page pt-12 px-5 sm:px-9">
      {movieData ? (
        <div className="max-w-screen-lg mx-auto">
          {/* Movie Title */}
          <h1 className="text-3xl font-bold text-center mb-6">{movieData.name}</h1>

          {/* Embedding YouTube Trailer */}
          {movieData.trailer && (
            <div className="flex justify-center mb-8">
              <iframe
                width="100%"
                height="315"
                className="md:w-[850px] md:h-[478px] rounded-lg shadow-lg"
                src={getEmbedUrl(movieData.trailer)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Movie Info */}
          <div className="flex flex-wrap justify-center text-lg text-gray-600 space-x-6 mb-6">
            {/* Category */}
            <div className="flex items-center space-x-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 0 0-2 2v1h14V5a2 2 0 0 0-2-2H5zM3 8h14v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
              </svg>
              <p><span className="font-semibold text-gray-700">Category:</span> {movieData.category}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.462 4.5h4.743c.97 0 1.371 1.24.588 1.81l-3.83 2.764 1.463 4.5c.3.921-.755 1.688-1.538 1.122L10 13.011l-3.837 2.612c-.783.566-1.838-.201-1.538-1.122l1.462-4.5-3.83-2.764c-.782-.57-.382-1.81.588-1.81h4.743l1.462-4.5z" />
              </svg>
              <p>{movieData.rating} ⭐</p>
            </div>

            {/* Duration */}
            <div className="flex items-center space-x-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-7.586V6a1 1 0 10-2 0v5a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414l-2.707-2.707z" clipRule="evenodd" />
              </svg>
              <p><span className="font-semibold text-gray-700">Duration:</span> {movieData.duration}</p>
            </div>

            {/* Release Date */}
            <div className="flex items-center space-x-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H3a1 1 0 00-1 1v11a2 2 0 002 2h12a2 2 0 002-2V5a1 1 0 00-1-1h-2V3a1 1 0 00-2 0v1H7V3a1 1 0 00-1-1zM4 7v9a1 1 0 001 1h10a1 1 0 001-1V7H4z" clipRule="evenodd" />
              </svg>
              <p><span className="font-semibold text-gray-700">Release Date:</span> {movieData.releaseDate}</p>
            </div>

            {/* Language */}
            <div className="flex items-center space-x-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-6.293-7H9v5.986A6.005 6.005 0 013.707 11zM9 4.014V10H3.707A6.005 6.005 0 019 4.014zM11 4.014A6.005 6.005 0 0116.293 10H11V4.014zM16.293 11H11v5.986A6.005 6.005 0 0116.293 11z" clipRule="evenodd" />
              </svg>
              <p><span className="font-semibold text-gray-700">Language:</span> {movieData.language}</p>
            </div>
          </div>

          {/* Movie Description */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Brief Story</h2>
            <p className="text-gray-500">{movieData.description}</p>
          </div>

          {/* Screenshots */}
          {movieData.screenshots && movieData.screenshots.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {movieData.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-[200px] object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recommended Movies */}
          {recommendedMovies.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl font-semibold mb-6 text-center">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommendedMovies.map((recMovie) => (
                  <a
                    key={recMovie.slug}
                    href={`/${recMovie.category.split(", ")[0]}/${recMovie.slug}`}
                    className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={recMovie.image}
                      alt={recMovie.name}
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{recMovie.name}</h3>
                      <p className="text-gray-500">{recMovie.category.split(", ")[0]}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg font-semibold">Loading movie details...</p>
        </div>
      )
      }
    </div >
  );
};

export default MovieDetailPage;
