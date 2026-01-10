const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

// 1. Ambil Film Populer
const getPopularMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "id-ID", // Supaya sinopsis bahasa Indonesia
        page: 1,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Cari Film berdasarkan Judul
const searchMovies = async (req, res) => {
  const query = req.query.q; // Contoh: ?q=avatar

  if (!query) {
    return res.status(400).json({ message: "Kata kunci pencarian harus ada!" });
  }

  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: "id-ID",
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Ambil Detail Film (Termasuk Trailer)
const getMovieDetail = async (req, res) => {
  const { id } = req.params; // Ambil ID dari URL

  try {
    // Kita request 2 hal sekaligus: Detail Film & Video Trailer
    const [movieRes, videoRes] = await Promise.all([
      axios.get(`${BASE_URL}/movie/${id}`, {
        params: { api_key: API_KEY, language: "id-ID" },
      }),
      axios.get(`${BASE_URL}/movie/${id}/videos`, {
        params: { api_key: API_KEY },
      }),
    ]);

    const movie = movieRes.data;
    const videos = videoRes.data.results;

    // Cari video yang tipe-nya "Trailer" dan site-nya "YouTube"
    const trailer = videos.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer"
    );

    // Gabungkan data
    const result = {
      ...movie,
      trailer_url: trailer
        ? `https://www.youtube.com/watch?v=${trailer.key}`
        : null,
      trailer_embed: trailer
        ? `https://www.youtube.com/embed/${trailer.key}`
        : null,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPopularMovies, searchMovies, getMovieDetail };
