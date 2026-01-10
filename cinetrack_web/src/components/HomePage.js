import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Hero from "./Hero";
import MovieCard from "./MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Ambil data dari Backend Anda (Port 3000)
    axios
      .get("http://localhost:3000/api/movies/popular")
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />
      <Hero movie={movies[0]} />

      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-orange-500 pl-3">
          Populer Saat Ini
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
