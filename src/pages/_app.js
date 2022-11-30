import Script from 'next/script';
import '@/styles/globals.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import '@fontsource/lora/400.css';
import '@fontsource/lora/700.css';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/config/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const getLayout = Component.Layout || ((page) => page);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
        {!isProduction && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
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
