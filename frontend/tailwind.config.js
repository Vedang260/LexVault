/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Scans HTML and TypeScript files for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4E342E', // Dark Brown
        secondary: '#FFC107', // Amber
        accent: '#D32F2F', // Deep Red
        background: '#FAF8F6', // Warm Gray/Ivory
        surface: '#F5F5F5', // Surface Cards
        textPrimary: '#212121', // Almost Black
        textSecondary: '#5D4037', // Medium Brown
      },
    },
  },
  plugins: [],
};

