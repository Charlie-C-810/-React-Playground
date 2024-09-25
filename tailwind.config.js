/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        textErrorColor: "#f56c6c",
        textWarnColor: "#e6a23c",
        btnTextErrorColor: "#fef0f0",
        btnTextWarnColor: "#fdf6ec",
      },
      backgroundColor: {
        bgErrorColor: "#fef0f0",
        bgWarnColor: "#fdf6ec",
        btnBgErrorColor: "#f56c6c",
        btnBgWarnColor: "#e6a23c",
        darkBgColor: "#1a1a1a",
      },
      borderColor: {
        borderErrorColor: "#f56c6c",
        borderWarnColor: "#e6a23c",
      }
    },
  },
  plugins: [],
  darkMode: "class"
};
