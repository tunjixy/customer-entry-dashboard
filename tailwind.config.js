/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      Outfit: ['Outfit', ' sans-serif'],
    },
    extend: {
      boxShadow: {
        btn: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
        custom: '0 4px 13px rgb(0 0 0 / 5%)',
      },
      colors: {
        primary: {
          light: '#83fb22',
          DEFAULT: '#387803',
          dark: '#132b01',
        },
        'dark-text': '#222222',
        'light-text': '#666666',
        grey: '#E7E7E7',
        background: '#f4f7fa',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
