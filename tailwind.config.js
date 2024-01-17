const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('tailwind-scrollbar-hide'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#32b5ed',
          'primary-focus': '#32b5ed',
          'primary-content': '#d2f2fe',
        },
      },
    ],
  },
  theme: {
    fontFamily: {
      pretendard: ['Pretendard', ...fontFamily.sans],
    },
    colors: {
      ...colors,
      primary: 'var(--color-primary)',
    },
    backgroundColor: {
      ...colors,
      primary: 'var(--color-primary)',
    },
    textColor: {
      ...colors,
      primary: 'var(--color-primary)',
      danger: 'var(--color-danger)',
    },
    borderColor: {
      ...colors,
      primary: 'var(--color-primary)',
      danger: 'var(--color-danger)',
    },
    extend: {
      backgroundImage: {
        banner: "url('/point.png')",
      },
      backgroundSize: {
        '100%': '100%',
      },
    },
  },
};
