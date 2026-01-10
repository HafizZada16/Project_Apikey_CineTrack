import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // Kalau gak login, biarin kosong

      try {
        const response = await axios.get(
          "http://localhost:3000/api/watchlist",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWatchlist(response.data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };
    fetchWatchlist();
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-orange-500 pl-4">
          Watchlist Saya
        </h2>

        {watchlist.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-slate-400 text-xl mb-4">
              Belum ada film yang disimpan.
            </p>
            <Link to="/" className="text-orange-500 hover:underline">
              Cari film dulu yuk!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
