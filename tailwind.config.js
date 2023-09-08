const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwind-scrollbar-hide"),
  ],
  // ref: https://daisyui.com/docs/config/
  daisyui: {
    darkTheme: "light",
  },
  theme: {
    colors: {
      ...colors,
      primary: "var(--color-primary)",
    },
    backgroundColor: {
      ...colors,
      primary: "var(--color-primary)",
    },
    textColor: {
      ...colors,
      primary: "var(--color-primary)",
      danger: "var(--color-danger)",
    },
    extend: {
      backgroundImage: {
        banner: "url('/point.png')",
      },
      backgroundSize: {
        "100%": "100%",
      },
    },
  },
};
