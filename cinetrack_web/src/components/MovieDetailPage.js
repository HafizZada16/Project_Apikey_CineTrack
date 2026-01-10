import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { FaPlus, FaTrash } from "react-icons/fa"; // Ganti FaCheck jadi FaTrash

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false); // Status apakah sudah di watchlist?

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil Detail Film
        const movieRes = await axios.get(
          `http://localhost:3000/api/movies/${id}`
        );
        setMovie(movieRes.data);

        // 2. Cek Status Watchlist (Hanya jika user sudah login)
        const token = localStorage.getItem("token");
        if (token) {
          const watchlistRes = await axios.get(
            "http://localhost:3000/api/watchlist",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Cari apakah ID film ini ada di dalam daftar watchlist user
          // Gunakan '==' biar aman (jika satu string satu number)
          const found = watchlistRes.data.find((item) => item.tmdb_id == id);
          if (found) {
            setIsSaved(true);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // --- FUNGSI TOGGLE (TAMBAH / HAPUS) ---
  const handleWatchlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login dulu dong bos! 😅");
      return;
    }

    try {
      if (isSaved) {
        // A. JIKA SUDAH ADA -> HAPUS (REMOVE)
        await axios.delete(`http://localhost:3000/api/watchlist/${movie.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsSaved(false); // Ubah status jadi belum disimpan
        alert("Berhasil dihapus dari Watchlist 🗑️");
      } else {
        // B. JIKA BELUM ADA -> TAMBAH (ADD)
        await axios.post(
          "http://localhost:3000/api/watchlist",
          {
            tmdb_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsSaved(true); // Ubah status jadi tersimpan
        alert("Berhasil masuk Watchlist! ✅");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal mengubah status watchlist.");
    }
  };

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;
  if (!movie)
    return (
      <div className="text-white text-center mt-20">Film tidak ditemukan.</div>
    );

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />

      {/* BACKDROP */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* POSTER */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-auto h-auto rounded-lg shadow-2xl border-4 border-slate-800 mx-auto md:mx-0"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-300 mb-6">
              <span>{movie.release_date?.split("-")[0]}</span>
              <span className="flex items-center gap-1 text-orange-500 font-bold">
                ★ {movie.vote_average?.toFixed(1)}
              </span>
              <span className="bg-orange-600 px-2 py-1 rounded text-white text-xs">
                {movie.genres?.map((g) => g.name).join(", ")}
              </span>
            </div>

            {/* --- TOMBOL DINAMIS (ADD / REMOVE) --- */}
            <button
              onClick={handleWatchlist}
              className={`mb-6 px-6 py-2 rounded-full font-bold flex items-center gap-2 transition shadow-lg ${
                isSaved
                  ? "bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-500 ring-offset-2 ring-offset-slate-900" // Style Tombol Hapus
                  : "bg-orange-600 hover:bg-orange-700 text-white" // Style Tombol Tambah
              }`}
            >
              {isSaved ? (
                <>
                  <FaTrash /> Remove from Watchlist
                </>
              ) : (
                <>
                  <FaPlus /> Add to Watchlist
                </>
              )}
            </button>

            <h3 className="text-xl font-bold text-orange-500 mb-2">Sinopsis</h3>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {movie.overview || "Tidak ada sinopsis."}
            </p>

            {/* TRAILER */}
            {movie.trailer_embed && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Trailer Resmi
                </h3>
                <div className="aspect-w-16 aspect-h-9 max-w-3xl">
                  <iframe
                    src={movie.trailer_embed}
                    title="Trailer"
                    className="w-full h-[400px] rounded-lg shadow-lg"
                    allowFullScreen
                  ></iframe>
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
