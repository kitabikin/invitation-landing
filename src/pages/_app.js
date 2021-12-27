import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import '@fontsource/lora/400.css'
import '@fontsource/lora/700.css'

import Script from 'next/script'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/config/theme'

const isProduction = process.env.ENVIRONMENT === 'production'
const gaID = process.env.NEXT_PUBLIC_GA_ID

function MyApp({ Component, pageProps }) {
  const getLayout = Component.Layout || (page => page)

  return (
    <>
      {isProduction && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gaID}');
            `}
          </Script>
        </>
      )}

      <ChakraProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </>
  )
}

export default MyApp
