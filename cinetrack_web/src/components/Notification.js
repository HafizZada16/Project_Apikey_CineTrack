import React, { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
  // Timer otomatis close dalam 3 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Tentukan warna berdasarkan tipe (success = hijau, error = merah)
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed top-20 right-5 z-50 flex items-center shadow-lg rounded-lg px-4 py-3 text-white ${bgColor} transition-all transform duration-500 hover:scale-105`}
    >
      <span className="text-xl mr-2">{type === "error" ? "⚠️" : "✅"}</span>
      <div>
        <h4 className="font-bold text-sm">Notifikasi</h4>
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-white font-bold hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;
