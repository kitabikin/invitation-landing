import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import '@fontsource/lora/400.css'
import '@fontsource/lora/700.css'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/config/theme'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.Layout || (page => page)

  return getLayout(
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
