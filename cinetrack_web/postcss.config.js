/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Tambahkan warna custom kita disini (opsional)
      colors: {
        dark: "#0f172a",
        card: "#1e293b",
        primary: "#f97316",
        primaryHover: "#ea580c",
      },
    },
  },
  plugins: [],
};
