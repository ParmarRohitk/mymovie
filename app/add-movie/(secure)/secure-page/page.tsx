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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  // Function to generate slug
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;

    // Cast to HTMLInputElement for file input
    const target = e.target as HTMLInputElement;

    if (name === "recommended") {
      setMovieData((prev) => ({ ...prev, [name]: value }));
    } else {
      if (name === "name") {
        const slug = generateSlug(value);
        setMovieData((prev) => ({ ...prev, name: value, slug }));
      } else {
        setMovieData((prev) => ({ ...prev, [name]: value }));
      }

      if (name === "screenshots" && index !== undefined && target.files?.[0]) {
        const file = target.files[0];
        if (!file.name.endsWith(".webp")) {
          setMessage("Only .webp files are allowed for screenshots.");
          return;
        }

        const newScreenshots = [...movieData.screenshots];
        const slugifiedScreenshot = `/images/${generateSlug(movieData.name)}_${index + 1}.webp`;
        newScreenshots[index] = slugifiedScreenshot;
        setMovieData({ ...movieData, screenshots: newScreenshots });

        const fileReader = new FileReader();
        fileReader.onload = () => {
          const newPreviews = [...screenshotPreviews];
          newPreviews[index] = fileReader.result as string;
          setScreenshotPreviews(newPreviews);
        };
        fileReader.readAsDataURL(file);
      } else if (name === "image" && target.files?.[0]) {
        const file = target.files[0];
        if (!file.name.endsWith(".webp")) {
          setMessage("Only .webp files are allowed for the poster image.");
          return;
        }

        const slug = generateSlug(movieData.name);
        setMovieData({ ...movieData, slug, image: `/images/${slug}.webp` });

        const fileReader = new FileReader();
        fileReader.onload = () => {
          setImagePreview(fileReader.result as string);
        };
        fileReader.readAsDataURL(file);
      }
    }
  };


  // Add new screenshot field
  const addScreenshot = () => {
    setMovieData({ ...movieData, screenshots: [...movieData.screenshots, ""] });
    setScreenshotPreviews([...screenshotPreviews, ""]);
  };

  // Remove screenshot field
  const removeScreenshot = (index: number) => {
    const newScreenshots = movieData.screenshots.filter((_, i) => i !== index);
    const newPreviews = screenshotPreviews.filter((_, i) => i !== index);
    setMovieData({ ...movieData, screenshots: newScreenshots });
    setScreenshotPreviews(newPreviews);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Append movie data to FormData
    formData.append("name", movieData.name);
    formData.append("slug", movieData.slug);
    formData.append("category", movieData.category);
    formData.append("rating", parseFloat(movieData.rating).toString());
    formData.append("duration", movieData.duration);
    formData.append("releaseDate", movieData.releaseDate);
    formData.append("language", movieData.language);
    formData.append("description", movieData.description);
    formData.append("trailer", movieData.trailer);
    formData.append("recommended", movieData.recommended);

    // Append image file
    if (imagePreview) {
      const imageFile = await fetch(imagePreview).then(r => r.blob());
      formData.append("image", imageFile, `${movieData.slug}.webp`);
    }

    // Append screenshots files
    for (let i = 0; i < screenshotPreviews.length; i++) {
      if (screenshotPreviews[i]) {
        const screenshotFile = await fetch(screenshotPreviews[i]).then(r => r.blob());
        formData.append("screenshots", screenshotFile, `${movieData.slug}_${i + 1}.webp`);
      }
    }

    try {
      const response = await fetch("/api/addmovie", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Movie added successfully!");
        // Reset form
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
        setImagePreview(null);
        setScreenshotPreviews([]);

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
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Add New Movie</h1>
        {message && (
          <div className={`mb-4 p-2 text-center text-white rounded-md ${message.includes("success") ? "bg-green-500" : "bg-red-500"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleInputChange}
            placeholder="Movie Name"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <input
            type="text"
            name="category"
            value={movieData.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
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
          <input
            type="text"
            name="duration"
            value={movieData.duration}
            onChange={handleInputChange}
            placeholder="Duration (e.g., 140 minutes)"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <input
            type="text"
            name="releaseDate"
            value={movieData.releaseDate}
            onChange={handleInputChange}
            placeholder="Release Date (e.g., May 25, 2024)"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <input
            type="text"
            name="language"
            value={movieData.language}
            onChange={handleInputChange}
            placeholder="Language"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <textarea
            name="description"
            value={movieData.description}
            onChange={handleInputChange}
            placeholder="Movie Description"
            required
            className="w-full md:col-span-3 p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300 h-28 resize-none"
          />
          <input
            type="text"
            name="trailer"
            value={movieData.trailer}
            onChange={handleInputChange}
            placeholder="YouTube Trailer Link"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300"
          />

          {/* Image upload */}
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            accept=".webp"
            required
            className="w-full p-2 border rounded-md text-black bg-gray-100 focus:outline-none "
          />
          {imagePreview && <img src={imagePreview} alt="Poster Preview" className="w-48 h-72 object-cover border rounded-md" />}

          {/* Screenshots */}
          {movieData.screenshots.map((screenshot, index) => (
            <div key={index} className="flex items-center space-x-2 md:col-span-1">
              <input
                type="file"
                name="screenshots"
                onChange={(e) => handleInputChange(e, index)}
                accept=".webp"
                required
                className="w-full p-2 border rounded-md text-black bg-gray-100 focus:outline-none"
              />
              {screenshotPreviews[index] && <img src={screenshotPreviews[index]} alt={`Screenshot ${index + 1}`} className="w-48 h-32 object-cover border rounded-md" />}
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
            className="w-full md:col-span-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
          >
            Add Screenshot
          </button>
          <input
            type="text"
            name="recommended"
            value={movieData.recommended}
            onChange={handleInputChange}
            placeholder="Recommended Movies (1,2,3,4)"
            required
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring focus:ring-indigo-300 md:col-span-3"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:col-span-3 bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-500 transition duration-300 ease-in-out"
          >
            Add Movie
          </button>
        </form>

      </div>
    </div>
  );
};

export default AddMovieForm;
