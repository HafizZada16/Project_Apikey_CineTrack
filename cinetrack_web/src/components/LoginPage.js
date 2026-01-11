import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Notification from "./Notification"; // 1. Import

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 2. State Notifikasi
  const [notification, setNotification] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 3. Notifikasi Sukses
      setNotification({
        message: "Login Berhasil! Selamat datang... 👋",
        type: "success",
      });

      // 4. Jeda 1.5 detik sebelum masuk Home
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      // 5. Notifikasi Error
      setNotification({
        message: "Email atau Password salah!",
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      {/* 6. Komponen Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login <span className="text-orange-500">CineTrack</span>
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-orange-600 text-white py-3 rounded font-bold hover:bg-orange-700 transition"
          >
            Masuk
          </button>
        </form>
        <p className="text-slate-400 text-center mt-4 text-sm">
          Belum punya akun?{" "}
          <Link to="/register" className="text-orange-500 hover:underline">
            Daftar disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
