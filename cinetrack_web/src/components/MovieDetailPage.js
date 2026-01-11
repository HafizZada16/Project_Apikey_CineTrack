import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Tambah Link buat klik rekomendasi
import axios from "axios";
import Navbar from "./Navbar";
import { FaPlus, FaTrash } from "react-icons/fa";
import Notification from "./Notification";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Reset state saat ID berubah (penting buat fitur rekomendasi)
    setMovie(null);
    setLoading(true);
    setIsSaved(false);

    const fetchData = async () => {
      try {
        // 1. Ambil Detail Film (Sekarang sudah ada Credits & Rekomendasi)
        const movieRes = await axios.get(
          `http://localhost:3000/api/movies/${id}`
        );
        setMovie(movieRes.data);

        // 2. Cek Watchlist
        const token = localStorage.getItem("token");
        if (token) {
          const watchlistRes = await axios.get(
            "http://localhost:3000/api/watchlist",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const found = watchlistRes.data.some(
            (item) => String(item.tmdb_id) === String(id)
          );
          if (found) setIsSaved(true);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Scroll ke atas setiap ganti film
    window.scrollTo(0, 0);
  }, [id]);

  const handleWatchlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setNotification({ message: "Login dulu dong bos! 😅", type: "error" });
      return;
    }

    try {
      if (isSaved) {
        await axios.delete(`http://localhost:3000/api/watchlist/${movie.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsSaved(false);
        setNotification({
          message: "Dihapus dari Watchlist 🗑️",
          type: "success",
        });
      } else {
        await axios.post(
          "http://localhost:3000/api/watchlist",
          {
            tmdb_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSaved(true);
        setNotification({
          message: "Berhasil masuk Watchlist! ✅",
          type: "success",
        });
      }
    } catch (error) {
      setNotification({ message: "Gagal memproses request.", type: "error" });
    }
  };

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;
  if (!movie)
    return (
      <div className="text-white text-center mt-20">Film tidak ditemukan.</div>
    );

  return (
    <div className="bg-slate-900 min-h-screen text-white relative pb-20">
      <Navbar />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* HEADER / BACKDROP */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 -mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* POSTER UTAMA */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 rounded-lg shadow-2xl border-4 border-slate-800 hidden md:block"
          />

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {movie.title}
            </h1>

            {/* Tagline (Opsional) */}
            {movie.tagline && (
              <p className="text-slate-400 italic mb-4">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-6">
              <span>{movie.release_date?.split("-")[0]}</span>
              <span className="flex items-center gap-1 text-orange-500 font-bold">
                ★ {movie.vote_average?.toFixed(1)}
              </span>
              <span className="bg-slate-700 px-2 py-1 rounded">
                {movie.runtime} menit
              </span>
              <div className="flex gap-2">
                {movie.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="bg-orange-600/20 text-orange-500 px-2 py-1 rounded text-xs border border-orange-600/50"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleWatchlist}
              className={`mb-8 px-6 py-2 rounded-full font-bold flex items-center gap-2 transition shadow-lg ${
                isSaved
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-orange-600 hover:bg-orange-700 text-white"
              }`}
            >
              {isSaved ? (
                <>
                  <FaTrash /> Remove Watchlist
                </>
              ) : (
                <>
                  <FaPlus /> Add to Watchlist
                </>
              )}
            </button>

            <h3 className="text-xl font-bold text-white mb-2">Sinopsis</h3>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-3xl">
              {movie.overview || "Tidak ada sinopsis."}
            </p>

            {/* --- FITUR BARU 1: PEMERAN (CAST) --- */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-orange-500 pl-3">
                Pemeran Utama
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {movie.credits?.cast?.slice(0, 8).map((actor) => (
                  <div
                    key={actor.id}
                    className="flex-shrink-0 w-24 text-center"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : "https://via.placeholder.com/200x300?text=No+Img"
                      }
                      alt={actor.name}
                      className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-slate-700 shadow-lg"
                    />
                    <p className="text-xs font-bold text-white truncate">
                      {actor.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* TRAILER */}
            {movie.trailer_embed && (
              <div className="mb-10">
                <h3 className="text-xl font-bold text-white mb-4">Trailer</h3>
                <div className="aspect-w-16 aspect-h-9 max-w-3xl rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    src={movie.trailer_embed}
                    title="Trailer"
                    className="w-full h-[400px]"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* --- FITUR BARU 2: REKOMENDASI FILM --- */}
            {movie.recommendations?.results?.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-800">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Mungkin Kamu Suka
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movie.recommendations.results.slice(0, 5).map((rec) => (
                    <Link
                      to={`/movie/${rec.id}`}
                      key={rec.id}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-lg mb-2">
                        <img
                          src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                          alt={rec.title}
                          className="w-full h-auto transform group-hover:scale-110 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition" />
                      </div>
                      <h4 className="font-bold text-sm text-white truncate group-hover:text-orange-500 transition">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {rec.release_date?.split("-")[0]}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
