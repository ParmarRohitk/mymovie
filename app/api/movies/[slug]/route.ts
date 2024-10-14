// app/api/movies/[slug]/route.ts

import { NextResponse } from 'next/server';

const movies = [
  { title: 'Movie 1', slug: 'movie-one', description: 'Description for Movie 1', poster: '/movie1.jpg' },
  { title: 'Movie 2', slug: 'movie-2', description: 'Description for Movie 2', poster: '/movie2.jpg' },
  { title: 'Movie 3', slug: 'movie-3', description: 'Description for Movie 3', poster: '/movie3.jpg' },
];

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const movie = movies.find((movie) => movie.slug === params.slug);

  if (!movie) {
    return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
  }

  return NextResponse.json(movie);
}
