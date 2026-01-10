const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/database"); // Import koneksi DB

const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Test Route (Cek apakah server jalan)
app.get("/", (req, res) => {
  res.send("Server CineTrack Backend Berjalan! 🚀");
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
