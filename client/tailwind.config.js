module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html", "./src/components/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(-120%)",
            transform: "translateX(-120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};