const express = require("express");
const {
  getPopularMovies,
  searchMovies,
  getMovieDetail,
} = require("../controllers/movieController");

const router = express.Router();

// Daftar URL:
router.get("/popular", getPopularMovies); // GET /api/movies/popular
router.get("/search", searchMovies); // GET /api/movies/search?q=judul
router.get("/:id", getMovieDetail); // GET /api/movies/123 (Detail & Trailer)

module.exports = router;
