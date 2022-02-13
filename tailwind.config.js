module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Comic: ["TsukuARdGothic-Regular"],
      Skia: [
        "Hiragino Kaku Gothic ProN",
        "TsukuARdGothic - Regular",
        "ＭＳ ゴシック",
      ],
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
