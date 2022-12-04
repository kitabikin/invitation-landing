import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import theme from '@/config/theme';

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://ik.imagekit.io" />
          <link rel="preconnect" href="https://res.cloudinary.com" />
          <link rel="preconnect" href="https://avatars.dicebear.com" />
          <link rel="preconnect" href="https://placehold.co" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          />

          {isProduction && (
            <>
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
            </>
          )}
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
