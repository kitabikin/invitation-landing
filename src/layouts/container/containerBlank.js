import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Box } from '@chakra-ui/react';
import site from '@/config/site';

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

function ContainerBlank({ children, title, description }) {
  const router = useRouter();
  const canonical = site.siteUrl;
  const noIndex = !isProduction;

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${site.title}`}
        description={description}
        additionalMetaTags={[
          {
            property: 'keywords',
            content: site.keywords,
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/images/logo/logo36x36.png',
          },
          {
            rel: 'preconnect',
            href: site.siteUrl,
          },
        ]}
        canonical={canonical + router.asPath}
        noindex={noIndex}
        openGraph={{
          url: canonical + router.asPath,
          title: title,
          description: description,
          site_name: site.title,
          images: [{ url: '/images/logo/logo80x80.png' }],
        }}
      />
      <Box as={'main'} overflowX="hidden">
        {children}
      </Box>
    </>
  );
}

export default ContainerBlank;
