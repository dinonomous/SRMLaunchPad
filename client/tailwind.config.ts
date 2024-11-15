import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Set Roboto as the default sans font
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(156deg, rgba(0,0,0,1) 11%, rgba(0,0,0,0.793) 33%, rgba(0,0,0,0.123) 49%)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        DarkPrimary: {
          DEFAULT: '#000000', // Black
          100: '#111111',     // Night
          200: '#232323',     // Eerie Black
          300: '#343434',     // Jet
        },
        DarkSecondary: {
          DEFAULT: '#464646', // Outer Space
          100: '#575757',     // Davy's Gray
          200: '#696969',     // Dim Gray
          300: '#7a7a7a',     // Gray
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
