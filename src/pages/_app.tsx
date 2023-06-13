import type { AppProps } from 'next/app';
import Script from 'next/script';
import '@/styles/globals.css';

import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from '@/config/theme';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
          {!isProduction && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </SessionProvider>
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
