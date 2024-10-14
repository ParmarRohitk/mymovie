'use client'
// import Image from 'next/image';
// app/movies/[slug]/page.tsx

import { useEffect, useState } from 'react';

interface MovieDetailProps {
    params: { slug: string };
}

interface Movie {
    title: string;
    description: string;
    poster: string;
}

const MovieDetail = ({ params }: MovieDetailProps) => {
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await fetch(`/api/movies/${params.slug}`);
            const data = await res.json();
            setMovie(data);
        };

        fetchMovie();
    }, [params.slug]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h1>{movie.title}</h1>
            {/* <Image src={movie.poster} alt={movie.title} /> */}
            <p>{movie.description}</p>
        </div>
    );
};

export default MovieDetail;
