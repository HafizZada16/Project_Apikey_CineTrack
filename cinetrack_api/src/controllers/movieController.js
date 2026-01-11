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
        language: "id-ID",
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
  const query = req.query.q;

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

// 3. Ambil Detail Film (Lengkap dengan Trailer, Cast, & Rekomendasi)
const getMovieDetail = async (req, res) => {
  const { id } = req.params;

  try {
    // Kita request 4 hal sekaligus menggunakan Promise.all
    const [movieRes, videoRes, creditsRes, recommendationsRes] =
      await Promise.all([
        // 1. Detail Film Utama
        axios.get(`${BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY, language: "id-ID" },
        }),
        // 2. Video Trailer
        axios.get(`${BASE_URL}/movie/${id}/videos`, {
          params: { api_key: API_KEY },
        }),
        // 3. Credits (Pemeran/Cast) -- BARU
        axios.get(`${BASE_URL}/movie/${id}/credits`, {
          params: { api_key: API_KEY },
        }),
        // 4. Rekomendasi Film -- BARU
        axios.get(`${BASE_URL}/movie/${id}/recommendations`, {
          params: { api_key: API_KEY, language: "id-ID" },
        }),
      ]);

    const movie = movieRes.data;
    const videos = videoRes.data.results;
    const credits = creditsRes.data; // Isinya ada .cast
    const recommendations = recommendationsRes.data; // Isinya ada .results

    // Cari video trailer
    const trailer = videos.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer"
    );

    // Masukkan URL trailer ke objek movie
    movie.trailer_embed = trailer
      ? `https://www.youtube.com/embed/${trailer.key}`
      : null;

    // Gabungkan semua data ke dalam satu objek result
    const result = {
      ...movie,
      credits: credits, // Masukkan data pemeran ke sini
      recommendations: recommendations, // Masukkan data rekomendasi ke sini
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
