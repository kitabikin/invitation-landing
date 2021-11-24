import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: 'Lora',
    body: 'Inter',
  },
}

const theme = extendTheme({ config })

export default theme
