import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification"; // 1. Import

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user && user.role === "ADMIN";

  const [query, setQuery] = useState("");

  // 2. State Notifikasi
  const [notification, setNotification] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 3. Notifikasi Logout
    setNotification({
      message: "Berhasil Logout! Sampai jumpa 👋",
      type: "success",
    });

    // 4. Jeda sebelum lempar ke halaman login
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/search?q=${query}`);
    }
  };

  const navLinkStyle =
    "text-white text-sm font-medium border border-transparent px-3 py-1 rounded hover:border-orange-500 transition-all";

  return (
    <nav className="bg-slate-900 border-b border-slate-700 p-4 sticky top-0 z-50">
      {/* 5. Pasang Komponen Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="container mx-auto flex justify-between items-center relative">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-orange-500 whitespace-nowrap z-10"
        >
          CineTrack.
        </Link>

        {/* MENU TENGAH */}
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

        {/* KANAN: SEARCH + AUTH */}
        <div className="flex items-center gap-4 z-10">
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

      {/* MOBILE SEARCH */}
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
