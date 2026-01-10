import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Hook untuk baca URL query
import axios from "axios";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Ambil kata kunci "q" dari URL
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        // Tembak endpoint search di backend kita
        const response = await axios.get(
          `http://localhost:3000/api/movies/search?q=${query}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearch();
    }
  }, [query]); // Jalankan ulang setiap kata kunci "query" berubah

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8">
          Hasil Pencarian: <span className="text-orange-500">"{query}"</span>
        </h2>

        {loading ? (
          <div className="text-center mt-20">Mencari film... 🔍</div>
        ) : movies.length === 0 ? (
          <div className="text-center mt-20 text-slate-400">
            Yah, filmnya gak ketemu. Coba kata kunci lain ya! 😅
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
