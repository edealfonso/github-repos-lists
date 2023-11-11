import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: "#000",
      white: "#fff",
      error: "#FF5722",
      beige: "beige",
      gray: "rgb(68, 68, 68)",
    },
  },
  plugins: [],
};
export default config;
