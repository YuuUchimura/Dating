module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Impact", "Yu Gothic"],
      Comic: ["TsukuARdGothic-Regular"],
    },
    extend: {
      // backgroundImage: (theme) => ({
      //   "header_bg": "url('/images/header_bg.jpg')",
      // }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
