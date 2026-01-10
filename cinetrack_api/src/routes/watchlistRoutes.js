const express = require("express");
const {
  addToWatchlist,
  getMyWatchlist,
  removeFromWatchlist,
} = require("../controllers/watchlistController");
const verifyToken = require("../middleware/authMiddleware"); // Panggil Satpam

const router = express.Router();

// Semua route di bawah ini diproteksi oleh verifyToken
router.post("/", verifyToken, addToWatchlist); // Simpan film
router.get("/", verifyToken, getMyWatchlist); // Lihat list
router.delete("/:tmdb_id", verifyToken, removeFromWatchlist); // Hapus film

module.exports = router;
