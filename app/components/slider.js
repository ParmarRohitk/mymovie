import { useState, useEffect } from "react";
import Link from "next/link"; // Import Next.js Link for client-side navigation

const Slider = ({ movies }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Function to handle the next slide
  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % movies.length); // Loop back to the first slide
  };

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [movies.length]);

  return (
    <div className="relative w-full min-h-screen bg-gray-800 overflow-hidden">
      {movies.map((movie, index) => (
        // <Link key={index} href={`/${movie.language}/${movie.slug}`}>
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Movie Image */}
          {movie.image ? (
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-black"></div>
          )}

          {/* Left-Side Black Shadow with Movie Info */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 p-8 text-white max-w-md">
              <h2 className="text-4xl font-bold mb-4">{movie.name}</h2>
              <p className="text-lg">{movie.description}</p>
              <div className="mt-4">
                <span className="text-yellow-400">{movie.rating} ⭐</span>
                <span className="ml-4">{movie.releaseDate}</span>
              </div>
            </div>
          </div>

          {/* Top-to-Bottom Black Shadow */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60"></div>
        </div>
        // </Link>
      ))}

      {/* Optional: Manual Navigation Controls */}
      {/* <button
        onClick={() =>
          setActiveSlide((activeSlide - 1 + movies.length) % movies.length)
        }
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        Next
      </button> */}
    </div>
  );
};

export default Slider;
