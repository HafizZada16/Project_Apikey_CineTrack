const express = require("express");
const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getTopMovies,
} = require("../controllers/adminController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Middleware Check: Apakah dia ADMIN?
// (Kita perlu modifikasi authMiddleware dikit atau cek manual di sini)
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    return res.status(403).json("Akses Ditolak! Khusus Admin.");
  }
};

// Rute Admin (Harus Login & Harus Admin)
router.get("/stats", verifyToken, verifyAdmin, getDashboardStats);
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);
router.get("/top-movies", verifyToken, verifyAdmin, getTopMovies);

module.exports = router;
