import Script from 'next/script';
import '@/styles/globals.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import '@fontsource/lora/400.css';
import '@fontsource/lora/700.css';

import { SWRConfig } from 'swr';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/config/theme';
import fetchJson from '@/libs/fetchJson';

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.Layout || ((page) => page);

  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </SWRConfig>
      {isProduction && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="worker"
        />
      )}
    </>
  );
}

export default MyApp;
