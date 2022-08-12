/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-sidebar": "#1F2029",
        "black-bg-chat": "#17181F",
        "black-bubble-chat": "#1F2029",
        "black-border": "#292A33",
        "cream-bubble-chat": "#FDF5D3",
      },
      fontFamily: {
        quicksand: "'Quicksand', sans-serif",
      },
    },
  },
  plugins: [],
};
