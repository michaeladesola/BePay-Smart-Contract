/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:"#f5f8ff",100:"#e8efff",200:"#cfe0ff",300:"#a9c4ff",400:"#79a0ff",
          500:"#4b7dff",600:"#2f61e6",700:"#244bb4",800:"#1e3c8f",900:"#1a346f",
        },
      },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.06)" },
    },
  },
  plugins: [],
};
