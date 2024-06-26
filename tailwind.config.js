/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "418px",
      xss: "496px",
      sm: "576px",
      md: "768px",
      lg: "984px",
      lgg: "1093px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: {
        ChatPattern:
          "url('https://res.cloudinary.com/dkysrpdi6/image/upload/v1710185469/peakpx_2_o8o40w.jpg')",

        chetPattern:
          "url('https://res.cloudinary.com/dkysrpdi6/image/upload/v1710221899/bg-chat_rtxydo.png')",
      },

      colors: {
        dark_bg_1: "#0D1117",
        dark_bg_2: "#1B1F24",
        dark_bg_3: "#141A1F",
        dark_bg_4: "#1F2A36",
        dark_border_1: "#262E39",
        dark_border_2: "#334154",
        dark_hover_1: "#3E4C5F",
        dark_svg_1: "#B8C2D1",
        dark_svg_2: "#A1AFBF",
        blue_1: "#3498DB",
        blue_2: "#2980B9",
        dark_text_1: "#ECF0F3",
        dark_text_2: "#A1AFBF",
        dark_text_3: "#A1AFBF",
        dark_text_4: "#D7DBDE",

        dark_scrollbar: "#344051",
        blue_3: "#0088CC",
        blue_4: "#006699",
        blue_5: "#004C66",
        warning: "#F59E0B",
        success: "#47B859",
        error: "#FF4C4C",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
