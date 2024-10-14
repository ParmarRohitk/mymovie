'use client'
import MovieCard from '../components/MovieCard';
import { useEffect, useState } from 'react';

interface Movie {
    title: string;
    slug: string;
    poster: string;
}

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch('/api/movies');
            const data = await res.json();
            setMovies(data);
        };

        fetchMovies();
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>

                {/* Responsive Grid for Movie Cards */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 w-full">
                    {movies.map((movie) => (
                        <>
                            <MovieCard key={movie.slug} movie={movie} />
                            {/* <h1>hello</h1> */}
                        </>
                    ))}
                </div>
            </main>

            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                {/* Footer content here */}
            </footer>
        </div>
    );
}
