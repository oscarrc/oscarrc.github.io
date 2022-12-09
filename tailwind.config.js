const widths = {
  'quarter': '25vw',
  'half': '50vw',
  'three-quarter': '75vw'
}

const heights = {
  'quarter': '25vh',
  'half': '50vh',
  'three-quarter': '75vh',
  'screen': '100vh',
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
        glitch: 'glitch 2s infinite linear alternate-reverse'
      },
      keyframes: {
        blink: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        glitch: {
          "0%" : { clip: "rect(44px, 9999px, 44px, 0)" },
          "5%" : { clip: "rect(44px, 9999px, 93px, 0)" },
          "10%" : { clip: "rect(60px, 9999px, 29px, 0)" },
          "15%" : { clip: "rect(53px, 9999px, 89px, 0)" },
          "20%" : { clip: "rect(77px, 9999px, 36px, 0)" },
          "25%" : { clip: "rect(7px, 9999px, 63px, 0)" },
          "30%" : { clip: "rect(45px, 9999px, 79px, 0)" },
          "35%" : { clip: "rect(99px, 9999px, 69px, 0)" },
          "40%" : { clip: "rect(13px, 9999px, 81px, 0)" },
          "45%" : { clip: "rect(54px, 9999px, 62px, 0)" },
          "50%" : { clip: "rect(14px, 9999px, 11px, 0)" },
          "55%" : { clip: "rect(65px, 9999px, 95px, 0)" },
          "60%" : { clip: "rect(13px, 9999px, 11px, 0)" },
          "65%" : { clip: "rect(43px, 9999px, 49px, 0)" },
          "70%" : { clip: "rect(47px, 9999px, 60px, 0)" },
          "75%" : { clip: "rect(53px, 9999px, 54px, 0)" },
          "80%" : { clip: "rect(22px, 9999px, 62px, 0)" },
          "85%" : { clip: "rect(59px, 9999px, 23px, 0)" },
          "90%" : { clip: "rect(4px, 9999px, 55px, 0)" },
          "95%" : { clip: "rect(47px, 9999px, 20px, 0)" },
          "100%" : { clip: "rect(13px, 9999px, 7px, 0)" }
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
      'synthwave',
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
    require('@tailwindcss/line-clamp'),
    require("daisyui")
  ]
}