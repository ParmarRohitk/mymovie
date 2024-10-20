import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const newMovie = await request.json();

    // Load existing movies from JSON file
    const filePath = path.join(process.cwd(), 'app', 'data', 'movies.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const movies = JSON.parse(data);

    // Determine the next ID based on existing movies
    const lastId = movies.length > 0 ? Math.max(...movies.map((movie: { id: number; }) => movie.id)) : 0;
    newMovie.id = lastId + 1; // Increment the last ID

    // Add the new movie to the movies array
    movies.push(newMovie);

    // Write updated movies back to JSON file
    fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));

    return NextResponse.json({ message: "Movie added successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add movie. Please try again." }, { status: 500 });
  }
}
