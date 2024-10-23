"use client";
import Link from "next/link";
import { useRef } from "react";

interface Movie {
    id: number;
    name: string;
    slug: string;
    image: string;
    category: string;
    rating: number;
}

interface MovieScrollProps {
    title: string;
    slug: string;
    movies: Movie[];
}

const Swiper: React.FC<MovieScrollProps> = ({ title, movies, slug }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    /*  const handleScrollLeft = () => {
         if (scrollContainerRef.current) {
             scrollContainerRef.current.scrollBy({
                 left: -300,
                 behavior: "smooth",
             });
         }
     };
 
     const handleScrollRight = () => {
         if (scrollContainerRef.current) {
             scrollContainerRef.current.scrollBy({
                 left: 300,
                 behavior: "smooth",
             });
         }
     }; */

    return (
        <div className="relative p-4 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg">
            <Link href={slug}>
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            </Link>

            <div
                className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide"
                ref={scrollContainerRef}
            >
                {movies.map((movie) => (
                    <>
                        <Link href={`/${movie.category}/${movie.slug}`} className="p-2">

                            <div
                                key={movie.id}
                                className="min-w-[200px] w-[200px] bg-gradient-to-b from-gray-400 to-gray-300 p-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                            >
                                <img
                                    src={movie.image}
                                    alt={movie.name}
                                    className="h-[300px] object-cover rounded-lg"
                                />
                                <h3 className="mt-2 text-lg font-bold text-black">{movie.name}</h3>
                                <p className="text-sm text-gray-500">{movie.category}</p>
                                <p className="text-sm text-gray-500">Rating: {movie.rating} ⭐</p>
                            </div>
                        </Link>
                    </>
                ))}
            </div>

            {/* Scroll Buttons */}
            {/*  <button
                onClick={handleScrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            >
                {"<"}
            </button>
            <button
                onClick={handleScrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            >
                {">"}
            </button> */}
        </div>
    );
};

export default Swiper;
