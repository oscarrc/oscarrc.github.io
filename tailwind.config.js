const widths = {
  'quarter': '25vw',
  'half': '50vw',
  'three-quarter': '75vw'
}

const heights = {
  'quarter': '25vh',
  'half': '50vh',
  'three-quarter': '75vh',
  'view': 'calc(100vh - 4rem)',
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s linear infinite',
      },
      keyframes: {
        blink: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      },
      minHeight: heights,
      minWidth: widths,
      maxHeight: heights,
      maxWidth: widths,
      width: widths,
      height: heights,
      gridTemplateColumns: {
        'qwerty': 'repeat(62, 0.5rem)',
        'qwerty-responsive': 'repeat(62, 1.25vw)'
      },
      gridTemplateRows: {
        'qwerty': 'repeat(5, 2rem)',
        'qwerty-responsive': 'repeat(5, 5vw)'
      }
    },
  },
  daisyui: {
    themes: [
      'cyberpunk', 
      {
        white: {
          ...require("daisyui/src/colors/themes")["[data-theme=lofi]"],
          primary: "rgb(162, 162, 162)",
          accent: "green"
        },
      },
      {
        black: {
          ...require("daisyui/src/colors/themes")["[data-theme=black]"],
          secondary: "white",
          accent: "green"
        },
      }
    ],
    darkTheme: 'black'
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ]
}