import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });
      alert("Registrasi Berhasil! Silakan Login.");
      navigate("/login");
    } catch (err) {
      alert("Gagal daftar! Email mungkin sudah dipakai.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Daftar <span className="text-orange-500">Akun Baru</span>
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-slate-300 mb-1 block">Username</label>
            <input
              type="text"
              className="w-full bg-slate-700 text-white rounded p-3 outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Username kamu"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            Daftar Sekarang
          </button>
        </form>

        <p className="text-slate-400 mt-6 text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
