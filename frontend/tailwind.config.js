/** @type {import('tailwindcss').Config} */
// Design system from the plan: coral / sunset orange / amber, deep plum text, warm cream background.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#FF7F50',
        sunset: '#FF5E3A',
        amber: { DEFAULT: '#FFB300', soft: '#FFE3A3' },
        plum: { DEFAULT: '#2E1A2F', light: '#5A3E5C' },
        cream: '#FFF8F0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(46, 26, 47, 0.25)',
      },
      backgroundImage: {
        sunset: 'linear-gradient(135deg, #FF5E3A, #FF7F50, #FFB300)',
      },
    },
  },
  plugins: [],
};
