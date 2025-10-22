/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xl: { max: "1280px" },
      lg: { max: "1020px" },
      md: { max: "760px" },
      sm: { max: "500px" },
    },

    extend: {
      colors: {
        "border-color": "#adadad",
        "sidebar-color": "#F9FAFC",
        "sidebar-btn-color": "#EEF2FE",
        "body-color": "#F7F8FA",
        "bg-categoryModalColor": "#F6F9FA",
        "btn-color": "#0D5950",
      },

      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(120px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        fadeInUpSmoll: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        fadeScale: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },

      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        fadeInUpSmoll: "fadeInUpSmoll 0.4s ease-out forwards",
        fadeInDown: "fadeInDown 0.8s ease-out forwards",
        fadeScale: "fadeScale 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
