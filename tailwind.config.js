const colors = require("./src/tailwind/colors");
const screens = require("./src/tailwind/screens").screensPX;

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        default: "0 0 7px 0 rgba(206, 206, 206, 0.5)",
      },
    },
    fontFamily: {
      sukhumvit: ["sukhumvit"],
      default: ["sukhumvit"],
    },
    screens,
    colors: {
      ...colors,
      current: colors.blue["900"],
      primary: colors.blue["900"],
      secondary: colors.amber["500"],

      //? Gradients
      "primary-gradient-light": colors.blue["100"],
      "primary-gradient-dark": colors.blue["700"],
      "secondary-gradient-light": colors.amber["300"],
      "secondary-gradient-dark": colors.amber["900"],

      //? alternative names
      "green-light": colors.green["200"],
      success: colors.green["600"],
      danger: colors.red["700"],
      cancel: colors.red["700"],
      info: colors.amber["500"],
      "sky-main": colors.sky["700"],
      "aqua-main": colors.aqua["700"],
      "yellow-main": colors.yellow["400"],

      //? Specific colors
      form: colors.blue["300"],
      text: colors.gray["1000"],
      title: colors.gray["1100"],
      disabled: colors.gray["300"],
      border: colors.gray["400"],
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      default: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
      navbar: "0 0 10px 10px",
    },
  },
  plugins: [],
};
export default config;
