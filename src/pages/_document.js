import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import theme from '@/config/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" href="/images/logo/logo36x36.png" />
          <link rel="preconnect" href="https://ik.imagekit.io" />
          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `
                partytown = {
                  lib: "/_next/static/~partytown/",
                  forward: ["gtag"],
                  resolveUrl: function (url, location, type) {
                    if (type === 'script') {
                      const proxyUrl = new URL('https://cdn.builder.codes/api/v1/js-proxy');
                      proxyUrl.searchParams.append('url', url.href);
                      proxyUrl.searchParams.append('apiKey', '${process.env.NEXT_PUBLIC_BUILDER_ID}');  
                      return proxyUrl;
                    }
                    return url;
                  }                
                };
              `,
            }}
          />
          <script
            type="text/partytown"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                window.gtag = function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { 
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
