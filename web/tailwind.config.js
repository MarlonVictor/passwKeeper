/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    spacing: {
			0: "0",
			1: "1px",
			2: "0.125rem",
			4: "0.25rem",
			6: " 0.38rem",
			8: "0.5rem",
			10: ".625rem",
			12: "0.75rem",
			14: "0.875rem",
			16: "1rem",
			20: "1.25rem",
			24: "1.5rem",
			28: "1.75rem",
			32: "2rem",
			34: "2.75rem",
			40: "2.5rem",
			42: "2.63rem",
			48: "3rem",
			56: "3.5rem",
			64: "4rem",
			72: "4.5rem",
			80: "5rem",
			96: "6rem",
			120: "7.5rem",
			160: "10rem",
		},
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      
      'white': "#FFF",
      'black':'#000',

      'neutral-dark': '#222831',
      'neutral': '#393E46',
      'neutral-light': '#EEE',
      'primary': '#FFD369',
    },
    borderWidth: {
			DEFAULT: '1px',
			'0':'0',
			'1':'1px',
			'2':'2px',
			'3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
		},
    screens: {
			'min2xl': { 'min': '1441px' },
			// => @media (max-width: 1535px) { ... }

			'2xl': { 'max': '1441px' },
			// => @media (max-width: 1535px) { ... }

			'xl': { 'max': '1367px' },
			// => @media (max-width: 1279px) { ... }

			'lg': { 'max': '1281px' },
			// => @media (max-width: 1023px) { ... }

			'md2': { 'max': '1180px' },
			// => @media (max-width: 767px) { ... }

			'md': { 'max': '867px' },
			// => @media (max-width: 867px) { ... }

			'sm': { 'max': '639px' },
			// => @media (max-width: 639px) { ... }
		},
    extend: {
      fontFamily: {
        sans: 'DM Sans, sans-serif',
      }
    },
  },
  plugins: [],
}
