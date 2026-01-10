import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Tembak API Login Backend
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Simpan Tiket (Token) di LocalStorage Browser
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Berhasil! 🎉");
      navigate("/"); // Pindah ke halaman utama
    } catch (err) {
      setError("Email atau Password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login <span className="text-orange-500">CineTrack.</span>
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-slate-300 mb-1 block">Email</label>
            <input
              type="email"
              className="w-full bg-slate-700 text-white rounded p-3 outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-slate-300 mb-1 block">Password</label>
            <input
              type="password"
              className="w-full bg-slate-700 text-white rounded p-3 outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded transition">
            Masuk Sekarang
          </button>
        </form>

        <p className="text-slate-400 mt-6 text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-orange-500 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
