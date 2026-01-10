import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  // Gunakan movie.tmdb_id jika movie.id kosong (karena database watchlist nyimpannya tmdb_id)
  const movieId = movie.id || movie.tmdb_id;

  return (
    <Link to={`/movie/${movieId}`}>
      <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/10 hover:-translate-y-2 transition duration-300 group cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-primary transition">
            {movie.title}
          </h3>
          <div className="flex justify-between items-center text-slate-400 text-sm mt-auto">
            {/* Pakai tanda tanya (?) biar gak error kalau datanya null */}
            <span>{movie.release_date?.split("-")[0] || "Unknown"}</span>

            <div className="flex items-center text-primary font-bold gap-1">
              <FaStar className="text-xs" />
              {/* Cek apakah vote_average ada. Kalau tidak ada, sembunyikan atau tulis N/A */}
              <span>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
