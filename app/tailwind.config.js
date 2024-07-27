const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/Components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Fonts are being loaded on `src/pages/_document.tsx`, so if you want to
      // change the font, you need to change the url there and name here.
      fontFamily: {
        sans: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-roboto-mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        'telegram-white': 'var(--telegram-bg-color)',
        'telegram-black': 'var(--telegram-text-color)',
        'telegram-hint': 'var(--telegram-hint-color)',
        'telegram-link': 'var(--telegram-link-color)',
        'telegram-primary': 'var(--telegram-button-color)',
        'telegram-primary-text': 'var(--telegram-button-text-color)',
        'telegram-secondary-white': 'var(--telegram-secondary-bg-color)',
        'background': "#f4f4f4",
        'slateblue': "#6543bc",
        "purple-light": "#6543BC",
        'white': "#fff",
        'whitesmoke': "#f5f5f5",
        "dark-text": "#6b6b6b",
        'black': "#000",
        "light-red": "#DF4545",
        "logimix-green": "#2F8398"
      },
      fontFamily: {
        inter: "Inter",
      },
      fontSize: {
        base: "1rem",
        xs: "0.75rem",
        sm: "0.88rem",
        lg: "1.13rem",
        inherit: "inherit",
      },
      borderRadius: {
        "31xl": "50px",
      },
      corePlugins: {
        preflight: false,
      },
    },
  },
  plugins: [],
};
