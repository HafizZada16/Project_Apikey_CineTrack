const db = require("../config/database");

// A. DASHBOARD STATS (Total User & Total Watchlist)
const getDashboardStats = (req, res) => {
  const qUser = "SELECT COUNT(*) as total_users FROM users WHERE role = 'USER'";
  const qWatchlist = "SELECT COUNT(*) as total_watchlists FROM watchlists";

  // Query Parallel biar cepet
  db.query(qUser, (err, dataUser) => {
    if (err) return res.status(500).json(err);

    db.query(qWatchlist, (err, dataWatchlist) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({
        total_users: dataUser[0].total_users,
        total_watchlists: dataWatchlist[0].total_watchlists,
      });
    });
  });
};

// B. GET ALL USERS (Buat Tabel Manajemen)
const getAllUsers = (req, res) => {
  // Ambil semua data kecuali password
  const q =
    "SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// C. DELETE USER (Fitur Ban)
const deleteUser = (req, res) => {
  const userId = req.params.id;
  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("User berhasil dihapus!");
  });
};

// D. MOST FAVORITE MOVIES (Analitik Keren)
// Mencari film yang paling sering masuk watchlist
const getTopMovies = (req, res) => {
  const q = `
    SELECT 
      tmdb_id, 
      title, 
      poster_path, 
      COUNT(tmdb_id) as save_count 
    FROM watchlists 
    GROUP BY tmdb_id, title, poster_path 
    ORDER BY save_count DESC 
    LIMIT 5
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

module.exports = { getDashboardStats, getAllUsers, deleteUser, getTopMovies };
