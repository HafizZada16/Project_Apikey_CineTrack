import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { FaPlus, FaCheck } from "react-icons/fa"; // Import Icon

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false); // Status tombol

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/movies/${id}`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal ambil detail:", error);
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // --- FUNGSI TAMBAH KE WATCHLIST ---
  const saveToWatchlist = async () => {
    const token = localStorage.getItem("token"); // Ambil tiket dari Login

    if (!token) {
      alert("Eits, Login dulu dong bos! 😅");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/watchlist",
        {
          tmdb_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Lampirkan Token
        }
      );
      setIsSaved(true);
      alert("Berhasil masuk Watchlist! ✅");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Film ini sudah ada di Watchlist kamu! 😎");
      } else {
        alert("Gagal menyimpan. Coba lagi.");
      }
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
            </div>

            {/* --- TOMBOL ADD TO WATCHLIST --- */}
            <button
              onClick={saveToWatchlist}
              className={`mb-6 px-6 py-2 rounded-full font-bold flex items-center gap-2 transition ${
                isSaved
                  ? "bg-green-600 text-white cursor-default"
                  : "bg-slate-700 hover:bg-slate-600 text-white border border-slate-500"
              }`}
            >
              {isSaved ? (
                <>
                  <FaCheck /> Tersimpan
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
