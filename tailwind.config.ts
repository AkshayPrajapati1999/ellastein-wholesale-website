import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const appHeadingsPlugin = plugin(function ({ addBase }) {
  addBase({
    ".app-heading-xl": {
      color: "#000",
      fontSize: "2.25rem", // 2.25rem = 36px
      fontWeight: 400,
      lineHeight: "2.5rem", // 2.5rem = 40px
    },
    ".app-heading-lg": {
      color: "#3F5060", // grey/darker
      fontSize: "1.875rem", // 1.875rem = 30px
      fontWeight: 400,
      lineHeight: "2.25rem", // 2.25rem = 36px
    },
    ".app-heading-md": {
      color: "#3F5060", // grey/darker
      fontSize: "1.5rem", // 1.5rem
      fontWeight: 400,
      lineHeight: "2rem", // 2rem = 30px
    },
    ".app-heading-sm": {
      color: "#3F5060", // grey/darker
      fontSize: "1.25rem", // 1.25rem = 20px
      fontWeight: 400,
      lineHeight: "1.75rem", // 1.75rem = 28px
    },
    ".app-heading-xs": {
      color: "#3F5060", // grey/darker
      fontSize: "1.125rem", // 1.125rem = 18px
      fontWeight: 400,
      lineHeight: "1.75rem", // 1.75rem = 28px
    },
  });
});
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          darker: "#000000",
          dark: "#333333",
          DEFAULT: "#000000",
          light: "#666666",
          lighter: "#999999",
        },
        gray: {
          darkest: "#333333",
          darker: "#555555",
          dark: "#777777",
          DEFAULT: "#cccccc",
          light: "#dddddd",
          lighter: "#eeeeee",
          lightest: "#f5f5f5",
        },
        white: {
          dark: "#d9d9d9",
          DEFAULT: "#ffffff",
          light: "#f2f2f2",
          lightest: "#f9f9f9",
        },
        red: {
          darkest: "#990000",
          darker: "#cc0000",
          DEFAULT: "#ff4b4b",
          light: "#ff9999",
          lightest: "#ffdcdc",
          tint: "#ffebe8",
        },
        blue: {
          darker: "#0254A5",
          dark: "#0D66BF",
          DEFAULT: "#0F75DB",
          light: "#63A5E8",
          lightest: "#C3DDF6",
          tint: "#E7F1FB",
          customShade: "#193254",
        },
        font: {
          lighter: "#657285",
          secondary: "#6d5145",
        },
        shade: {
          0: "#f5f7fa",
          1: "#ecf2fa",
          2: "#d6dfec",
          3: "#b8c4d4",
          4: "aliceblue",
        },
      },
      container: {
        padding: "1rem",
        screens: { lg: "1024px" },
      },
      border: "#d6dfec",
      boxShadow: {
        "custom-shadow":
          "0px 14px 36px rgba(199, 205, 215, 0.5), 0px 8px 14px rgba(182, 191, 203, 0.29), 0px 4px 6px rgba(199, 201, 204, 0.15)",
        "custom-light-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      },
      fontFamily: {
        primary: '"IBM Plex Sans", sans-serif',
        secondary: "serif",
      },
      extend: {
        colors: {
          white: "white",
          black: "black",
          transparent: "transparent",
          current: "currentColor",
        },
        height: {
          "icon-xs": "1.875rem",
          "icon-sm": "2.125rem",
          "icon-md": "2.375rem",
          "icon-lg": "2.625rem",
        },
        width: {
          "icon-xs": "1.875rem",
          "icon-sm": "2.125rem",
          "icon-md": "2.375rem",
          "icon-lg": "2.625rem",
        },
        letterSpacing: {
          tight: "-1px",
        },
      },
    },
  },
  plugins: [appHeadingsPlugin],
};
export default config;
