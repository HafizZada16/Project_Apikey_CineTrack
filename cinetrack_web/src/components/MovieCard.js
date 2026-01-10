import React from "react";
import { Link } from "react-router-dom"; // <--- Import Link
import { FaStar } from "react-icons/fa"; // Pastikan install react-icons

const MovieCard = ({ movie }) => {
  return (
    // Bungkus semuanya dengan Link ke /movie/{ID}
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/10 hover:-translate-y-2 transition duration-300 group cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
            NEW
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-primary transition">
            {movie.title}
          </h3>
          <div className="flex justify-between items-center text-slate-400 text-sm mt-auto">
            <span>{movie.release_date?.split("-")[0]}</span>
            <div className="flex items-center text-primary font-bold gap-1">
              <FaStar className="text-xs" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
