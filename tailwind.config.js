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