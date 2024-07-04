/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "cta-pattern": "url('/src/assets/images/quote-bg-v3.png')",
        "footer-bg": "url('/src/assets/images/footer-bg-v3.jpg')",
      },
    },
  },
  plugins: [],
};