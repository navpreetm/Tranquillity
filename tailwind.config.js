/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "arial": ["Arial", "sans-serif"],
      },
      colors: {
        "app-purple": {
          100: "#E6E6FA",
          200: "#D3CAEB",
          300: "#C0ADDC",
          400: "#AD90CD",
          500: "#9973BE",
          600: "#723AA0",
          700: "#4B0082",
        },
        "app-light-purple": "#E6E6FA",
        "app-dark-purple": "#4B0082",
        "app-black": "#212427",
      },
    },
  },
  plugins: [],
};
