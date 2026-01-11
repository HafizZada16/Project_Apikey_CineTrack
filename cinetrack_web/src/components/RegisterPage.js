import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Notification from "./Notification"; // 1. Import Notification

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 2. State untuk Notifikasi
  const [notification, setNotification] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    // --- 1. VALIDASI INPUT (LOGIKA BARU) ---
    if (username.length < 3) {
      setNotification({
        message: "Username kependekan! Minimal 3 karakter ya.",
        type: "error",
      });
      return; // Stop, jangan lanjut ke axios
    }

    if (password.length < 6) {
      setNotification({
        message: "Password kurang aman! Minimal 6 karakter.",
        type: "error",
      });
      return; // Stop
    }
    // ---------------------------------------

    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });

      // 3. Ganti Alert dengan Notification Sukses
      setNotification({
        message: "Registrasi Berhasil! Mengalihkan ke Login...",
        type: "success",
      });

      // 4. Kasih jeda 1.5 detik biar notif muncul dulu, baru pindah
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      // 5. Ganti Alert dengan Notification Error
      setNotification({
        message: "Gagal Registrasi. Email mungkin sudah dipakai.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      {/* 6. Tampilkan Komponen Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Daftar <span className="text-orange-500">Akun</span>
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            Daftar Sekarang
          </button>
        </form>
        <p className="text-slate-400 text-center mt-4 text-sm">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
