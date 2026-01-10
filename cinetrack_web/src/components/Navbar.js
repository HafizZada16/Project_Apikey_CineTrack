import React, { useState } from "react"; // Tambah useState
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  // State untuk menyimpan teks pencarian
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Berhasil Logout! Sampai jumpa 👋");
    navigate("/login");
  };

  // Fungsi saat tombol Enter ditekan
  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      // Pindah ke halaman SearchPage dengan membawa query
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center gap-4">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-orange-500 whitespace-nowrap"
        >
          CineTrack.
        </Link>

        {/* --- KOLOM SEARCH (BARU) --- */}
        <div className="flex-1 max-w-md hidden md:block">
          {" "}
          {/* Hidden di HP biar gak sempit */}
          <input
            type="text"
            placeholder="Cari film..."
            className="w-full bg-slate-800 text-white border border-slate-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch} // Deteksi tombol Enter
          />
        </div>

        {/* MENU */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-white hover:text-orange-500 text-sm hidden sm:block"
          >
            Home
          </Link>
          <Link
            to="/watchlist"
            className="text-slate-400 hover:text-orange-500 text-sm hidden sm:block"
          >
            Watchlist
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm bg-slate-700 text-white px-4 py-2 rounded-full hover:bg-red-600 transition border border-slate-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* SEARCH BAR KHUSUS HP (Muncul di bawah logo kalau layar kecil) */}
      <div className="mt-3 md:hidden">
        <input
          type="text"
          placeholder="Cari film..."
          className="w-full bg-slate-800 text-white border border-slate-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
    </nav>
  );
};

export default Navbar;
