module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Comic: ["TsukuARdGothic-Regular"],
      Skia: ["Skia-Regular_Black"],
    },
    extend: {
      backgroundImage: {
        "header-bg": "url('./images/header-bg.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
