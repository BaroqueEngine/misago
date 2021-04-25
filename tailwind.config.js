module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    extend: {
      colors: {
        "main-green": "#7eb5cc",
        "main-border": "#233238",
        "bg-color": "#1a1a1a",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        index: [
          "游明朝",
          "YuMincho",
          "ヒラギノ明朝 ProN W3",
          "Hiragino Mincho ProN",
          "HG明朝E",
          "ＭＳ Ｐ明朝",
          "ＭＳ 明朝",
          "serif",
        ],
      },
    },
  },
};
