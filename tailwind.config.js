/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        12: "12px",
      },
      colors: {
        primary_blue: "#4990e2",
        secondary_orange: "#f7a825",
        off_white: "#f6f7f9",
        dark_off_white: "#e3e4e5",
        dark_text: "#566",
        ligher_text: "#817e7e",
      },
      boxShadow: {
        "3xl": "0px 0px 5px 0px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
