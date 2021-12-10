import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: 'Lora',
    body: 'Inter',
  },
}

const customTheme = {
  styles: {
    global: {
      '.swiper-greeting': {
        width: '100%',
      },
    },
  },
  ...config,
}

const theme = extendTheme(customTheme)

export default theme
