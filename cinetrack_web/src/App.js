import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MovieDetailPage from "./components/MovieDetailPage";
import WatchlistPage from "./components/WatchlistPage";
import SearchPage from "./components/SearchPage";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
