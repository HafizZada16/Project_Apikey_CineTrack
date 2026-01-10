const db = require("../config/database");

// 1. Tambah ke Favorit
const addToWatchlist = (req, res) => {
  // Tambahkan release_date dan vote_average di sini
  const { tmdb_id, title, poster_path, release_date, vote_average } = req.body;
  const user_id = req.user.id;

  const checkQuery =
    "SELECT * FROM watchlists WHERE user_id = ? AND tmdb_id = ?";
  db.query(checkQuery, [user_id, tmdb_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0)
      return res.status(409).json("Film sudah ada di watchlist!");

    // Update Query Insert
    const q =
      "INSERT INTO watchlists (`user_id`, `tmdb_id`, `title`, `poster_path`, `release_date`, `vote_average`) VALUES (?)";

    // Update Values
    const values = [
      user_id,
      tmdb_id,
      title,
      poster_path,
      release_date,
      vote_average,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Berhasil disimpan ke Watchlist!");
    });
  });
};

// 2. Lihat Daftar Favorit Saya
const getMyWatchlist = (req, res) => {
  const user_id = req.user.id;

  // Ambil semua film milik user ini
  const q = "SELECT * FROM watchlists WHERE user_id = ? ORDER BY added_at DESC";

  db.query(q, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// 3. Hapus dari Favorit
const removeFromWatchlist = (req, res) => {
  const user_id = req.user.id;
  const tmdb_id = req.params.tmdb_id; // Diambil dari URL

  const q = "DELETE FROM watchlists WHERE user_id = ? AND tmdb_id = ?";

  db.query(q, [user_id, tmdb_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Berhasil dihapus dari Watchlist.");
  });
};

module.exports = { addToWatchlist, getMyWatchlist, removeFromWatchlist };
