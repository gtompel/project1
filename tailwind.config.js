/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "cta-pattern": "url('/wing.png')",
        "footer-bg": "url('/footer-bg.png')",
      }
    },
  },
  plugins: [],
}

