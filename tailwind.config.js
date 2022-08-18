module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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
      minHeight: {
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
        'view': 'calc(100vh - 4rem)',
      }
    },
  },
  daisyui: {
    themes: ['cyberpunk', 'black'],
    darkTheme: 'black'
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ]
}