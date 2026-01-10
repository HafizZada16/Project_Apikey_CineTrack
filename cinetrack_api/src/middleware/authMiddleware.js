const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  // Ambil token dari Header (Authorization: Bearer <token>)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json("Akses Ditolak! Anda belum login.");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token tidak valid!");

    // Simpan data user ke dalam request agar bisa dipakai di Controller
    req.user = user;
    next(); // Lanjut ke fungsi berikutnya
  });
};

module.exports = verifyToken;
