import { extendTheme } from 'native-base';


export const THEME = extendTheme({
  colors: {
    gray: {
      900: '#222831',
      600: '#393E46',
      200: '#EEE'
    },
    yellow: {
      500: '#FFD369'
    }
  },
  fonts: {

  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    14: 56
  }
})