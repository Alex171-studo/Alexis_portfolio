/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          base: '#00ff88',
          dark: '#00cc6a',
          light: '#66ffb8'
        },
        secondary: {
          base: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8'
        },
        neutral: {
          black: '#0a0a0a',
          dark: '#1a1a1a',
          gray: '#404040',
          light: '#d4d4d4',
          white: '#fafafa'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
