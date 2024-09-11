import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "jeko-regular": ["Jeko Regular"],
        "jeko-bold": ["Jeko Bold"],
      },
      backgroundColor: {
        orange: "#F4BF4F",
        gray: "#303030",
      },
      textColor: {
        orange: "#F4BF4F",
        neutral: "#CBCBCB",
      },
      borderColor: {
        orange: "#F4BF4F",
        neutral: "#CBCBCB",
      },
    },
  },
  plugins: [],
};
export default config;
