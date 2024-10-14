"use client"
import { useState, useEffect } from 'react';
import Slider from '@/app/components/slider';  // Full-width slider for latest movies
import Image from 'next/image';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  const latestMovies = movies.slice(0, 4);  // First 4 movies
  const topRatedMovies = movies.filter(movie => movie.rating > 8.0);
  const actionMovies = movies.filter(movie => movie.category === 'Action');
  const horrorMovies = movies.filter(movie => movie.category === 'Horror');
  console.log(actionMovies)
  return (
    <div className="container mx-auto -p-6">
      {/* Full Page Slider */}
      <Slider movies={latestMovies} />

      {/* New Movies */}
      <section>
        <h2 className="text-3xl font-semibold my-4">New Movies</h2>
        <div className="flex  space-x-4">
          {movies.slice(4, 10).map((movie) => (
            <div key={movie.slug} className="min-w-[150px]">
              <a href={`/${movie.category}/${movie.slug}`} className="block">
                <img
                  src={movie.image}
                  alt={movie.name}
                  width={500}
                  className="w-full h-[250px] object-cover" // Ensuring the same height for all images
                />
                <p className="text-center">{movie.name}</p>
              </a>
            </div>
          ))}
        </div>
      </section>


      {/* Top Rated Movies Slider */}
      <section>
        <h2 className="text-3xl font-semibold my-4">Top Rated Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topRatedMovies.map((movie) => (
            <a
              key={movie.slug}
              href={`/${movie.category}/${movie.slug}`} // Assuming the URL format is /category/movie-slug
              className="movie-card group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-medium">{movie.name}</h3>
                <p className="text-white mt-2">{movie.rating} ⭐</p>
              </div>
            </a>
          ))}
        </div>
      </section>


      {/* Action Movies */}
      <section>
        <h2 className="text-3xl font-semibold my-4">Action Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {actionMovies.map(movie => (
            <a
              key={movie.slug}
              href={`/${movie.category}/${movie.slug}`} // Assuming the URL format is /category/movie-slug
              className=" relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" // Added hover shadow effect
            >
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full object-cover transform transition-transform duration-300 hover:scale-105" // Set fixed height and hover effect
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <h3 className="text-white text-lg font-medium">{movie.name}</h3>
                <p className="text-white mt-2 p-3">{movie.description}</p>
              </div>
              <div className="bg-stone-900 px-3 py-2 flex justify-between">
                <p className="text-white p-1">{movie.rating}</p>
                <p className="text-white p-1">{movie.releaseDate}</p>
              </div>



            </a>
          ))}
        </div>
      </section>


      {/* Horror Movies */}
      <section>
        <h2 className="text-3xl font-semibold my-4">Horror Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {horrorMovies.map(movie => (
            <div key={movie.slug} className="movie-card">
              {/* <Image src={movie.image} alt={movie.name} width={500} /> */}
              <h3>{movie.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
