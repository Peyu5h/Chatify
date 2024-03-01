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
      colors: {
        dark_bg_1: "#0D1117", // Darker Background
        dark_bg_2: "#1B1F24", // Background
        dark_bg_3: "#141A1F", // Slightly Darker Background
        dark_bg_4: "#1F2A36", // Darker Shade
        dark_border_1: "#262E39", // Darker Border
        dark_border_2: "#334154", // Darker Border
        dark_hover_1: "#3E4C5F", // Darker Hover
        dark_svg_1: "#B8C2D1", // SVG icons
        dark_svg_2: "#A1AFBF", // SVG icons
        blue_1: "#3498DB", // Primary Color (Blue)
        blue_2: "#2980B9", // Darker Shade
        dark_text_1: "#ECF0F3", // Lighter Text
        dark_text_2: "#A1AFBF", // Darker Text
        dark_text_3: "#A1AFBF", // Darker Text
        dark_text_4: "#D7DBDE", // Lighter Text
        dark_text_5: "#B4C1CC", // Lighter Text
        dark_scrollbar: "#344051", // Scrollbar color
        blue_3: "#0088CC", // Accent Blue
        blue_4: "#006699", // Accent Blue
        blue_5: "#004C66", // Accent Blue
        warning: "#F59E0B", // Warning Color
        success: "#47B859", // Success Color
        error: "#FF4C4C", // Error Color
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
