import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Notification from "./Notification";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total_users: 0, total_watchlists: 0 });
  const [users, setUsers] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Ambil Token
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Cek apakah Admin? Kalau bukan, tendang ke Home
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user || user.role !== "ADMIN") {
      alert("Akses Ditolak! Anda bukan Admin."); // Atau pakai notif
      navigate("/");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Panggil 3 API sekaligus biar cepet (Promise.all)
      const [statsRes, usersRes, topMoviesRes] = await Promise.all([
        axios.get("http://localhost:3000/api/admin/stats", config),
        axios.get("http://localhost:3000/api/admin/users", config),
        axios.get("http://localhost:3000/api/admin/top-movies", config),
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data);
      setTopMovies(topMoviesRes.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setNotification({
        message: "Gagal mengambil data dashboard.",
        type: "error",
      });
      setLoading(false);
    }
  };

  // Fungsi Hapus User (Ban)
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotification({ message: "User berhasil dihapus!", type: "success" });
      fetchData(); // Refresh data setelah hapus
    } catch (error) {
      setNotification({ message: "Gagal menghapus user.", type: "error" });
    }
  };

  if (loading)
    return (
      <div className="text-white text-center mt-20">
        Loading Dashboard... 🚀
      </div>
    );

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 border-l-4 border-orange-500 pl-4">
          Dashboard <span className="text-orange-500">Admin</span>
        </h1>

        {/* --- BAGIAN 1: KARTU STATISTIK --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Card Total User */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 flex items-center justify-between">
            <div>
              <h3 className="text-slate-400 text-sm font-medium uppercase">
                Total Pengguna
              </h3>
              <p className="text-4xl font-bold text-white mt-2">
                {stats.total_users}
              </p>
            </div>
            <div className="text-5xl">👥</div>
          </div>

          {/* Card Total Watchlist */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 flex items-center justify-between">
            <div>
              <h3 className="text-slate-400 text-sm font-medium uppercase">
                Total Film Disimpan
              </h3>
              <p className="text-4xl font-bold text-orange-500 mt-2">
                {stats.total_watchlists}
              </p>
            </div>
            <div className="text-5xl">🎬</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- BAGIAN 2: TABEL USER MANAGEMENT (KIRI - LEBIH LEBAR) --- */}
          <div className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              📋 Daftar Pengguna
              <span className="text-xs bg-slate-600 px-2 py-1 rounded-full text-white">
                {users.length}
              </span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-600 text-sm">
                    <th className="p-3">Username</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Join Date</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-700 hover:bg-slate-700/50 transition"
                    >
                      <td className="p-3 font-medium">{user.username}</td>
                      <td className="p-3 text-slate-300">{user.email}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            user.role === "ADMIN"
                              ? "bg-orange-600 text-white"
                              : "bg-slate-600 text-slate-200"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400">
                        {new Date(user.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="p-3 text-center">
                        {user.role !== "ADMIN" && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-bold transition"
                          >
                            Ban / Hapus
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- BAGIAN 3: TOP 5 MOVIES (KANAN) --- */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              🏆 Top 5 Favorit
            </h2>
            <div className="flex flex-col gap-4">
              {topMovies.length > 0 ? (
                topMovies.map((movie, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b border-slate-700 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-2xl font-bold text-orange-500 w-6 text-center">
                      #{index + 1}
                    </span>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded shadow"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm truncate">
                        {movie.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Disimpan {movie.save_count} kali
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm">
                  Belum ada data watchlist.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
