import type { Config } from "tailwindcss";
const {fontFamily} = require("tailwindcss/defaultTheme")

const config: Config = {

  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#194D47",
        secondary: "#FDF7E7",
        tertiary: {
          dark: "#705A4A", // Marrón chocolate
          light: "#C3A877", // Beige arena
        },
      },
      fontFamily:{
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
      }
    },
  },
  plugins: [],
};
export default config;
