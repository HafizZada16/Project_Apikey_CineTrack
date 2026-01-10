import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Tambah useNavigate

const Navbar = () => {
  const navigate = useNavigate();

  // 1. Cek apakah user punya tiket (token) di saku (localStorage)
  const isLoggedIn = localStorage.getItem("token");

  // 2. Fungsi Logout
  const handleLogout = () => {
    // Hapus tiket dan data user
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Berhasil Logout! Sampai jumpa 👋");
    navigate("/login"); // Kembalikan ke halaman login
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          CineTrack.
        </Link>

        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-orange-500 transition">
            Home
          </Link>
          <Link
            to="/watchlist"
            className="text-slate-400 hover:text-orange-500 transition"
          >
            Watchlist
          </Link>
        </div>

        {/* 3. Logika Tombol (Kondisional Rendering) */}
        {isLoggedIn ? (
          // JIKA SUDAH LOGIN: Tampilkan Tombol Logout (Merah/Gelap)
          <button
            onClick={handleLogout}
            className="text-sm bg-slate-700 text-white px-5 py-2 rounded-full hover:bg-red-600 transition border border-slate-600"
          >
            Logout
          </button>
        ) : (
          // JIKA BELUM LOGIN: Tampilkan Tombol Login (Orange)
          <Link
            to="/login"
            className="text-sm bg-orange-600 text-white px-5 py-2 rounded-full hover:bg-orange-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
