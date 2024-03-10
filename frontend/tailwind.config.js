const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-slow-reverse': 'spin 60s linear infinite reverse',
      },
      backgroundImage: {
        'about-light': "url('/images/about-light.png')",
        'about-dark': "url('/images/about-dark.png')",
        'double-pour': "url('/images/double-pour.png')",
        footer: "url('/images/footer.png')",
      },
    },
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      adieu: ['var(--font-adieu)'],
      goodSans: ['var(--font-goodSans)'],
      times: ['Times New Roman'],
    },
    colors: {
      'ice-cream-parlour': '#f7d2ae',
      black: '#000',
      white: '#fff',
      stout: '#0f0a09',
      charon: '#a0a49c',
      legendary: '#c4b9af',
      red: '#FF0000',
      beige: '#f7d2ae',
      'ocean-drive': '#afbdc4',
      'whales-mouth': '#c7d1d6',
      offbeat: '#d6cec7',
      'hailstorm-grey': '#bdbfba',
      allspice: '#f8ceaa',
      'black-sheep': '#0e0e0e',
      'chromaphobic-black': '#292929',
    },
  },
  plugins: [],
};
