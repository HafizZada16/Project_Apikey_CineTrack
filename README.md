RegisterPage
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bcb0c347-fe15-4214-b403-fa82d640ec7d" />

LoginPage
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a83c16e2-a40d-459a-a2b6-e8b8971d065b" />

HomePage (Login sebagai Admin)
<img width="1920" height="3066" alt="image" src="https://github.com/user-attachments/assets/42d28341-fb33-44ab-b12e-53adcaf8867e" />

HomePage (Login sebagai User)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/74e196b1-4a3c-4e98-a66c-c7225d0dc310" />

DetailMoviePage
<img width="1920" height="2423" alt="image" src="https://github.com/user-attachments/assets/02ae9601-a153-4573-962a-587191c77561" />

WatchlistPage
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3647c094-b792-4ba7-9420-c46eeb8ca78e" />

Dashboard Admin
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4ed70299-407c-439f-91b2-5133c5e31053" />

# 🎬 CineTrack - Movie Discovery & Watchlist App

**CineTrack** adalah aplikasi web fullstack untuk mencari informasi film, melihat detail (trailer, cast), dan menyimpan film favorit ke dalam Watchlist pribadi. Aplikasi ini menggunakan data *real-time* dari TMDB API.

---

## 🚀 Fitur Utama

### 🌟 User (Pengguna Umum)
* **Homepage Dinamis:** Hero section dengan *auto-slider* dan daftar film populer.
* **Pencarian Film:** Cari film berdasarkan judul.
* **Detail Film Lengkap:** Sinopsis, Rating, Durasi, Genre, **Trailer Video**, **Daftar Pemeran (Cast)**, dan **Rekomendasi Film Serupa**.
* **Autentikasi:** Register & Login (aman menggunakan JWT).
* **Watchlist Personal:** Simpan film favorit (Add) dan hapus (Remove) dari daftar tontonan.

### 🛡️ Admin
* **Dashboard Admin:** Halaman khusus untuk manajemen konten atau pengguna (jika akses admin diberikan).

---

## 🛠️ Teknologi yang Digunakan

**Frontend:**
* React.js (v18)
* Tailwind CSS (Styling & Responsive Design)
* Axios (API Request)
* React Router DOM (Navigasi)
* React Icons

**Backend:**
* Node.js & Express.js
* MySQL (Database)
* Sequelize (ORM)
* JWT (JSON Web Token untuk Autentikasi)
* Bcrypt (Enkripsi Password)

**API Eksternal:**
* The Movie Database (TMDB) API

---

## 📂 Struktur Project

```bash
root/
├── cinetrack_api/     # Backend (Server & Database Logic)
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── app.js
│   └── .env           # (Perlu dibuat manual)
│
└── cinetrack_web/     # Frontend (React UI)
    ├── src/
    │   ├── components/
    │   └── App.js
    └── tailwind.config.js
