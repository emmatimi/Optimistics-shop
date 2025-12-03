/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4a634e',
        'brand-secondary': '#f3eee8',
        'brand-accent': '#c7a78c',
        'brand-dark': '#303030',
        'brand-light': '#faf8f5',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}