/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit-10rem': 'repeat(auto-fit, minmax(10rem, 1fr))',
      },
    },
  },
  plugins: [],
};
