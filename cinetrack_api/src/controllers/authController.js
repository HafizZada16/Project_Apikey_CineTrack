const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
require("dotenv").config();

// --- 1. LOGIKA REGISTER ---
const register = (req, res) => {
  const { username, email, password } = req.body;

  // --- VALIDASI BACKEND (Security Layer) ---
  if (!username || username.length < 3) {
    return res.status(400).json("Username minimal 3 karakter!");
  }
  if (!password || password.length < 6) {
    return res.status(400).json("Password minimal 6 karakter!");
  }
  // ----------------------------------------

  // Cek dulu apakah email sudah ada?
  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(409).json("Email sudah terdaftar!");

    // Jika aman, acak password (Hashing)
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Masukkan ke Database (Default Role: USER)
    const insertQuery =
      "INSERT INTO users (`username`, `email`, `password`, `role`) VALUES (?)";
    const values = [username, email, hashedPassword, "USER"];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User berhasil didaftarkan!");
    });
  });
};

// --- 2. LOGIKA LOGIN ---
const login = (req, res) => {
  const { email, password } = req.body;

  // Cek apakah email ada di database?
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User tidak ditemukan!");

    // Cek Password (Bandingkan password input vs password acak di DB)
    const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);

    if (!isPasswordCorrect)
      return res.status(400).json("Email atau Password salah!");

    // Jika benar, buatkan TOKEN (Tiket)
    // Di dalam tiket kita simpan ID dan ROLE user
    const token = jwt.sign(
      { id: data[0].id, role: data[0].role },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h", // Token kadaluwarsa dalam 12 jam
      }
    );
    // Kirim token ke user, tapi jangan kirim passwordnya
    const { password: userPass, ...otherInfo } = data[0];

    res.status(200).json({
      message: "Login Berhasil",
      token: token,
      user: otherInfo,
    });
  });
};

module.exports = { register, login };
