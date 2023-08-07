/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}", "./components/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        spin: "spin 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
