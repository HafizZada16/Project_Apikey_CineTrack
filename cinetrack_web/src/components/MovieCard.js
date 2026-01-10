import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 transition cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-3">
        <h5 className="text-white font-bold truncate">{movie.title}</h5>
        <div className="flex justify-between text-slate-400 text-sm mt-2">
          <span>{movie.release_date?.split("-")[0]}</span>
          <span className="text-orange-400">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
