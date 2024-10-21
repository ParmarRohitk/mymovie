// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// Load the movie data from the JSON file
const movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./app/data/movies.json"), "utf8")
);

module.exports = {
  siteUrl: process.env.SITE_URL || "https://cinemaio.vercel.app/",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,

  // Add dynamic paths for movies, categories, and languages
  additionalPaths: async (config) => {
    const moviePaths = movies.map((movie) => ({
      loc: `/${movie.category}/${movie.slug}`, // Dynamic movie URL based on slug
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }));

    // Generate unique category paths (e.g., /movie-category)
    const categoryPaths = Array.from(
      new Set(movies.map((movie) => `/${movie.category}`))
    ).map((category) => ({
      loc: category.toLowerCase(), // Assuming category names are URL-friendly
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }));

    // Generate unique language paths (e.g., /in/movie-language)
    const languagePaths = Array.from(
      new Set(movies.map((movie) => `/in/${movie.language}`))
    ).map((language) => ({
      loc: language.toLowerCase(), // Assuming language names are URL-friendly
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }));

    // Combine all paths (moviePaths, categoryPaths, languagePaths)
    return [...moviePaths, ...categoryPaths, ...languagePaths];
  },
};
