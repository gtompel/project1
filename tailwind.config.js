/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "cta-pattern": "url('/assets/images/quote-bg-v3.jpg')",
        "footer-bg": "url('/assets/images/footer-bg-v3.jpg')",
      },
    },
  },
  plugins: [],
};