import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 border-b border-slate-700 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          CineTrack.
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-orange-500">
            Home
          </Link>
          <Link
            to="/watchlist"
            className="text-slate-400 hover:text-orange-500"
          >
            Watchlist
          </Link>
        </div>
        <button className="text-sm bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
