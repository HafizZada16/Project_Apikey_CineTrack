import React from "react";

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
        <button className="mt-4 bg-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-orange-700">
          Tonton Trailer
        </button>
      </div>
    </div>
  );
};

export default Hero;
