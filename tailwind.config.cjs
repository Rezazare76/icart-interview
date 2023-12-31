// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xs: "8px",
        sm: "14px",
        DEFAULT: "16px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
      },
      fontFamily: {
        sans: ["iranYekanRegular", "sans-serif"],
        light: "iranYekanLight",
        normal: "iranYekanRegular",
        medium: "iranYekanMedium",
        bold: "iranYekanBold",
        bolder: "iranYekanBlack",
      },
      fontSize: {
        "2xs": "10px",
        xs: "12px",
        sm: "14px",
        DEFAULT: "16px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
      },
      colors: {
        primary: {
          DEFAULT: "#01286D",
          100: "#CCDFFF",
          200: "#A5C6FF",
          300: "#508FFF",
          400: "#005CFF",
          500: "#004DD6",
          600: "#003799",
          700: "#01286D",
        },
        secondary: {
          DEFAULT: "#FFC01D",
          100: "#FFF9EA",
          200: "#FFF0C8",
          300: "#FFE5A2",
          400: "#FFDD85",
          500: "#FFD058",
          600: "#FFC83B",
          700: "#FFC01D",
        },
        tertiary: {
          DEFAULT: "#222222",
          100: "#FFFFFF",
          200: "#F8F9FA",
          300: "#CCCCCC",
          400: "#999999",
          500: "#666666",
          600: "#444444",
          700: "#222222",
        },
        danger: { DEFAULT: "#FF3838", 100: "#ecd8dd" },
        success: { DEFAULT: "#2ecc71", 100: "#cdf2dd" },
      },
      screens: {
        "2xs": "320px",
        xs: "480px",
        ml: "900px",
      },
    },
  },
  plugins: [],
};
