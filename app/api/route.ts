import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const moviesPath = path.join(process.cwd(), 'app/data/movies.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      if (!fs.existsSync(moviesPath)) {
        fs.writeFileSync(moviesPath, JSON.stringify([]));
      }

      const fileData = fs.readFileSync(moviesPath, 'utf8');
      const movies = JSON.parse(fileData) || [];
      const newMovie = { ...req.body, id: movies.length + 1 };

      movies.push(newMovie);
      fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2), 'utf8');

      res.status(200).json({ message: 'Movie added successfully!', movie: newMovie });
    } catch (error) {
      console.error("Error adding movie:", error);
      res.status(500).json({ message: 'Failed to add movie.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
