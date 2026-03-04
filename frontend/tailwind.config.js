export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: "#06B6D4",
        "primary-light": "#22D3EE",
        "primary-dark": "#0891B2",
        secondary: "#0C1116",
        accent: "#FB923C",
        "accent-light": "#FDBA74",
        "accent-dark": "#F97316",
        surface: "#151920",
        "surface-light": "#1E2530",
        dark: "#0F1419",
        darker: "#0C1116",
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
        },
        orange: {
          400: "#FDBA74",
          500: "#FB923C",
          600: "#F97316",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(6, 182, 212, 0.3)',
        'glow-orange': '0 0 40px rgba(251, 146, 60, 0.25)',
      },
    },
  },
  plugins: [],
};
