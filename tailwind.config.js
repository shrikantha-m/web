/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cropOrange: {
          50: '#fff8f1',
          100: '#ffedd8',
          200: '#ffd9b0',
          300: '#ffbf7f',
          400: '#ff974d',
          500: '#ff7415', // Main orange color from logo
          600: '#f15a00',
          700: '#c74500',
          800: '#9f3700',
          900: '#823100',
        },
        cropGreen: {
          50: '#edfcf3',
          100: '#d4f7e0',
          200: '#aaedcb',
          300: '#77e0ad',
          400: '#4cce8e',
          500: '#00a550', // Main green color from logo
          600: '#009748',
          700: '#00773c',
          800: '#005f32',
          900: '#004e2c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'glass': '8px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 7s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'kenburns': 'kenburns 20s ease-in-out infinite',
        'shine': 'shine 1.5s forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

