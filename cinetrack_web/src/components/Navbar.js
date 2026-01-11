import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  // AMBIL DATA USER
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user && user.role === "ADMIN";

  const [query, setQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Berhasil Logout! Sampai jumpa 👋");
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/search?q=${query}`);
    }
  };

  // Style untuk Menu Navigasi (Teks putih, border transparan, hover orange)
  const navLinkStyle =
    "text-white text-sm font-medium border border-transparent px-3 py-1 rounded hover:border-orange-500 transition-all";

  return (
    <nav className="bg-slate-900 border-b border-slate-700 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* --- 1. KIRI: LOGO --- */}
        <Link
          to="/"
          className="text-2xl font-bold text-orange-500 whitespace-nowrap z-10"
        >
          CineTrack.
        </Link>

        {/* --- 2. TENGAH: MENU NAVIGASI (Absolute Center) --- */}
        {/* Kita pakai absolute biar posisinya bener-bener di tengah layar */}
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <Link to="/" className={navLinkStyle}>
            Home
          </Link>

          <Link to="/watchlist" className={navLinkStyle}>
            Watchlist
          </Link>

          {isAdmin && (
            <Link to="/admin-dashboard" className={navLinkStyle}>
              Dashboard Admin
            </Link>
          )}
        </div>

        {/* --- 3. KANAN: SEARCH + AUTH --- */}
        <div className="flex items-center gap-4 z-10">
          {/* SEARCH BAR (Pindah ke sini) */}
          <div className="hidden md:block w-48 lg:w-64">
            <input
              type="text"
              placeholder="Cari film..."
              className="w-full bg-slate-800 text-white border border-slate-600 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-orange-500 transition"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* TOMBOL LOGIN / LOGOUT */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm bg-slate-700 text-white px-5 py-1.5 rounded-full hover:bg-red-600 transition border border-slate-600 font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-orange-600 text-white px-5 py-1.5 rounded-full hover:bg-orange-700 transition font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* SEARCH BAR (MOBILE ONLY) */}
      {/* Muncul di bawah navbar kalau layarnya kecil */}
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
