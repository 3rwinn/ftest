/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    // Path to the tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ctam-primary": "#011c37",
        ctamp: {
          50: "#f9fafc",
          100: "#dde5ed",
          200: "#d8e0e8",
          300: "#c5d1dc",
          400: "#aebecf",
          500: "#94a8bc",
          600: "#71889f",
          700: "#697f95",
          800: "#556b80",
        },
        "ctam-secondary": "#2bb779",
        ctams: {
          100: "#e5f0eb",
          200: "#2fca86",
          300: "#31d38b",
          400: "#b7d6c8",
          500: "#96c2ae",
          600: "#76a48f",
          700: "#168654",
          800: "#5b8673",
        },
        "mde-bg": "#F0F0F0",
        "mde-red": "#011C37",
        "mde-red-700": "#872717",
        "mde-red-300": "#C8402A",
        "mde-red-200": "#DB4930",
        "mde-gray": "#606060",
        "mde-yellow": "#F7CC13",
        "mde-orange": "#F97923",
        "mde-yellow-light": "#FACF13",
        "mde-green": "#21A556",
        "footer-login": "#8C2E20",
        "banner-login": "#A63320",
        // light mode
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
          
        },
        // dark mode
        // "dark-tremor": {
        //   brand: {
        //     faint: "#0B1229", // custom
        //     muted: "#172554", // blue-950
        //     subtle: "#1e40af", // blue-800
        //     DEFAULT: "#3b82f6", // blue-500
        //     emphasis: "#60a5fa", // blue-400
        //     inverted: "#030712", // gray-950
        //   },
        //   background: {
        //     muted: "#131A2B", // custom
        //     subtle: "#1f2937", // gray-800
        //     DEFAULT: "#111827", // gray-900
        //     emphasis: "#d1d5db", // gray-300
        //   },
        //   border: {
        //     DEFAULT: "#1f2937", // gray-800
        //   },
        //   ring: {
        //     DEFAULT: "#1f2937", // gray-800
        //   },
        //   content: {
        //     subtle: "#4b5563", // gray-600
        //     DEFAULT: "#6b7280", // gray-600
        //     emphasis: "#e5e7eb", // gray-200
        //     strong: "#f9fafb", // gray-50
        //     inverted: "#000000", // black
        //   },
        // },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sans: ["Poppins", "sans-serif"],
      },
      fontSize: {
        min: "0.7rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      borderRadius: {
        "tremor-default": "0.5rem",
      }
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
  ],
};
