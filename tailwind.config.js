/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canyon: "#0a0a0a",
        ink: "#141414",
        fuse: "#e6e6e6",
        tone: "#9da7b5",
        accent: "#30e0d0",
        accentDark: "#27b1a3"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(2, 2, 2, 0.5)"
      }
    }
  },
  plugins: []
};
