"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddMovieForm = () => {
  const router = useRouter();
  const [movieData, setMovieData] = useState({
    name: "",
    slug: "",
    category: "",
    rating: "",
    duration: "",
    releaseDate: "",
    language: "",
    description: "",
    image: "",
    trailer: "",
    screenshots: [""],
    recommended: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  // Function to generate slug
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;

    if (name === "screenshots" && index !== undefined) {
      const newScreenshots = [...movieData.screenshots];
      newScreenshots[index] = `${generateSlug(movieData.name)}-${index + 1}.webp`; // Generate screenshot filename
      setMovieData({ ...movieData, screenshots: newScreenshots });
    } else if (name === "name") {
      const slug = generateSlug(value);
      setMovieData({ ...movieData, name: value, slug, image: `/images/${slug}.webp` });
    } else {
      setMovieData({ ...movieData, [name]: value });
    }
  };


  // Add new screenshot field
  const addScreenshot = () => {
    setMovieData({ ...movieData, screenshots: [...movieData.screenshots, ""] });
  };

  // Remove screenshot field
  const removeScreenshot = (index: number) => {
    const newScreenshots = movieData.screenshots.filter((_, i) => i !== index);
    setMovieData({ ...movieData, screenshots: newScreenshots });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newMovie = {
        ...movieData,
        rating: parseFloat(movieData.rating),
        recommended: movieData.recommended.split(",").map((id) => parseInt(id.trim())),
      };

      const response = await fetch('/api/addmovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });

      if (response.ok) {
        setMessage("Movie added successfully!");
        setMovieData({
          name: "",
          slug: "",
          category: "",
          rating: "",
          duration: "",
          releaseDate: "",
          language: "",
          description: "",
          image: "",
          trailer: "",
          screenshots: [""],
          recommended: "",
        });

        setTimeout(() => {
          setMessage(null);
          router.push("/add-movie/secure-page");
        }, 5000);
      } else {
        throw new Error("Failed to add movie");
      }
    } catch (error) {
      setMessage("Failed to add movie. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Add New Movie</h1>
        {message && (
          <div className={`mb-4 p-2 text-center text-white rounded-md ${message.includes("success") ? "bg-green-500" : "bg-red-500"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleInputChange}
            placeholder="Movie Name"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {/* Category */}
          <input
            type="text"
            name="category"
            value={movieData.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {/* Rating */}
          <input
            type="number"
            name="rating"
            value={movieData.rating}
            onChange={handleInputChange}
            placeholder="Rating (out of 10)"
            required
            step="0.1"
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {/* Duration */}
          <input
            type="text"
            name="duration"
            value={movieData.duration}
            onChange={handleInputChange}
            placeholder="Duration (e.g., 140 minutes)"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {/* Release Date */}
          <input
            type="text"
            name="releaseDate"
            value={movieData.releaseDate}
            onChange={handleInputChange}
            placeholder="Release Date (e.g., May 25, 2024)"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {/* Language */}
          <input
            type="text"
            name="language"
            value={movieData.language}
            onChange={handleInputChange}
            placeholder="Language"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {/* Description */}
          <textarea
            name="description"
            value={movieData.description}
            onChange={handleInputChange}
            placeholder="Movie Description"
            required
            className="w-full md:col-span-2 p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300 h-28 resize-none"
          />
          {/* Image */}
          <input
            type="file"
            name="image"
            value={movieData.image}
            placeholder="Auto-generated Image URL"
            className="w-full p-2 border rounded-md text-black bg-gray-100 focus:outline-none"
          />
          {/* Trailer */}
          <input
            type="text"
            name="trailer"
            value={movieData.trailer}
            onChange={handleInputChange}
            placeholder="YouTube Trailer Link"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {/* Screenshots */}
          {movieData.screenshots.map((screenshot, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                name="screenshots"
                value={screenshot}
                onChange={(e) => handleInputChange(e, index)}
                placeholder={`Screenshot ${index + 1} URL (auto-generated)`}
                readOnly
                className="w-full p-2 border rounded-md text-black bg-gray-100 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeScreenshot(index)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addScreenshot}
            className="w-full md:col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
          >
            Add Screenshot
          </button>
          {/* Recommended Movies */}
          <input
            type="text"
            name="recommended"
            value={movieData.recommended}
            onChange={handleInputChange}
            placeholder="Recommended Movie IDs (comma-separated)"
            required
            className="w-full md:col-span-2 p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <button
            type="submit"
            className="w-full md:col-span-2 bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-500 transition duration-300 ease-in-out"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
