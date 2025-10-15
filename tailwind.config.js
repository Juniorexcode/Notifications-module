/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003366",
        "background-light": "#F8F9FA",
        "background-dark": "#121212",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E1E1E",
        "text-light": "#212529",
        "text-dark": "#E0E0E0",
        "accent-green": "#28a745",
        aduanasBlue: '#003366',
        aduanasLightBlue: '#004080',
        aduanasGray: '#E0E0E0',
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        caviar: ['CaviarDreams', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  
  plugins: [],
}

