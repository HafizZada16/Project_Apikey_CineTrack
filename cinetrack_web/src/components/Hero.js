import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ movie }) => {
  if (!movie) return null;
  return (
    <div
      className="relative h-[500px] flex items-end bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
      <div className="container mx-auto p-6 relative z-10 text-white">
        <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
        <p className="max-w-xl text-slate-300 line-clamp-3">{movie.overview}</p>
        <Link
          to={`/movie/${movie.id}`}
          className="bg-primary hover:bg-primaryHover text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-orange-500/30 transition transform hover:-translate-y-1 inline-flex items-center gap-2"
        >
          Tonton Trailer
        </Link>
      </div>
    </div>
  );
};

export default Hero;
