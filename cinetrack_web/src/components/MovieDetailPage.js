import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Untuk ambil ID dari URL
import axios from "axios";
import Navbar from "./Navbar";

const MovieDetailPage = () => {
  const { id } = useParams(); // Ambil ID film (misal: 12345)
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil detail film dari backend kita sendiri
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

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;
  if (!movie)
    return (
      <div className="text-white text-center mt-20">Film tidak ditemukan.</div>
    );

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />

      {/* HEADER: GAMBAR BACKDROP BESAR */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
      </div>

      {/* KONTEN DETAIL */}
      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* POSTER (Kiri) */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-auto h-auto rounded-lg shadow-2xl border-4 border-slate-800 mx-auto md:mx-0"
          />

          {/* INFO TEKS (Kanan) */}
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

            <h3 className="text-xl font-bold text-orange-500 mb-2">Sinopsis</h3>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {movie.overview || "Tidak ada sinopsis dalam Bahasa Indonesia."}
            </p>

            {/* TRAILER YOUTUBE (Jika Ada) */}
            {movie.trailer_embed && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Trailer Resmi
                </h3>
                <div className="aspect-w-16 aspect-h-9 max-w-3xl">
                  <iframe
                    src={movie.trailer_embed}
                    title="YouTube video player"
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
