"use client"
import { useState, useEffect } from 'react';
import Slider from '@/app/components/slider';  // Full-width slider for latest movies

interface SkeletonLoaderProps {
    width: number;
    height: number;
    className: string;
}

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

// Skeleton Loader CSS added in Tailwind config or global CSS
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width, height }) => (
    <div className={`skeleton w-${width} h-${height} rounded-lg`}></div>
);

const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/movies')
            .then(response => response.json())
            .then(data => {
                setMovies(data);
                setLoading(false);
            });
    }, []);

    const movieIdsToShow = [4, 5, 22, 20]; // Specify the IDs of the movies you want to show

    const latestMovies = movies.filter((movie) => movieIdsToShow.includes(movie.id));


    // const latestMovies = movies.slice(0, 23);  // First 4 movies
    const topRatedMovies = movies.filter(movie => movie.rating > 8.0);
    const actionMovies = movies.filter(movie => movie.category.split(", ")[0] === 'action');

    return (
        <>
            <div className="container mx-auto">
                {/* Full Page Hero Slider */}
                <section className='mb-10'>
                    {/* {loading ? (
                    <SkeletonLoader width="full" height="400px" />
                ) : ( */}
                    <Slider movies={latestMovies} />
                    {/* )} */}
                </section>

                {/* New Movies */}
                <section className="p-5">
                    <div className="p-4 bg-gradient-to-b from-pink-500 to-yellow-700 rounded-lg">
                        <h2 className="text-3xl font-semibold my-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-600 animate-pulse">
                            New Movies
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"> {/* Responsive grid layout */}
                            {loading ? (
                                Array(6)
                                    .fill(0)
                                    .map((_, index) => (
                                        <SkeletonLoader key={index} width={200} height={300} className="" />
                                    ))
                            ) : (
                                movies.slice(4, 10).map((movie) => (
                                    <div
                                        key={movie.slug}
                                        className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                                    >
                                        <a
                                            href={`/${movie.category.split(", ")[0]}/${movie.slug}`}
                                            className="block relative"
                                        >
                                            <img
                                                src={movie.image}
                                                alt={movie.name}
                                                className="w-full h-[auto] md:h-[300px] object-cover rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-110" // Full width with smooth scaling on hover
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <p className="text-white text-center text-lg font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    {movie.name}
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>


                {/* Top Rated Movies */}
                <section className='p-5'>
                    <div className='p-4 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg'>
                        <h2 className="text-3xl font-semibold my-4 text-white">Top Rated Movies</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {loading ? (
                                Array(4).fill(0).map((_, index) => (
                                    <SkeletonLoader key={index} height={400} width={200} className="w-full" />
                                ))
                            ) : (
                                topRatedMovies.map((movie) => (
                                    <a
                                        key={movie.slug}
                                        href={`/${movie.category.split(", ")[0]}/${movie.slug}`}
                                        className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                                    >
                                        <img
                                            src={movie.image}
                                            alt={movie.name}
                                            className="w-full h-[400px] object-cover rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <h3 className="text-white text-lg font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                                                {movie.name}
                                            </h3>
                                            <p className="text-white text-lg font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out mt-2">
                                                {movie.rating} ⭐
                                            </p>
                                        </div>
                                    </a>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* Action Movies */}
                <section className='p-5'>
                    <div className='p-4 bg-gradient-to-b from-pink-500 to-yellow-700 rounded-lg'>
                        <h2 className="text-3xl font-semibold my-4 text-white">Action Movies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {loading ? (
                                Array(4).fill(0).map((_, index) => (
                                    <SkeletonLoader key={index} width={200} height={300} className="full" />
                                ))
                            ) : (
                                actionMovies.map((movie) => (
                                    <a
                                        key={movie.slug}
                                        href={`/${movie.category.split(", ")[0]}/${movie.slug}`}
                                        className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                                    >
                                        <img
                                            src={movie.image}
                                            alt={movie.name}
                                            className="w-full h-[auto] md:h-[300px] sm:h-[300px] lg:h-[300px] object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
                                        // className="w-full h-[350px] md:[300px] object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
                                        />
                                        <div className="absolute inset-0 text-center bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                            <h3 className="text-white mb-2 text-lg font-semibold translate-y-4 hover:translate-y-0 transition-transform duration-500 ease-in-out">
                                                {movie.name}
                                            </h3>
                                            <p className="text-white mt-2 text-center px-4 text-sm hover:translate-y-0 transition-transform duration-500 ease-in-out">
                                                {movie.description}
                                            </p>
                                        </div>
                                        <div className="bg-stone-900 px-3 py-2 flex justify-between items-center">
                                            <p className="text-white text-sm">{movie.rating} ⭐</p>
                                            <p className="text-white text-sm">{movie.releaseDate}</p>
                                        </div>
                                    </a>
                                ))
                            )}
                        </div>
                    </div>
                </section >
            </div >
        </>
    );
};

export default Home;
