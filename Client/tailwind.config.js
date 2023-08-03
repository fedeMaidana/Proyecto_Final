/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'principal-black': '#1f1f1f',
        'principal-white': '#ebebeb',
        'secondary-violet': '#52489c',
        'secondary-blue': '#2e4ac5'
      }
    },
  },
  plugins: [],
}

