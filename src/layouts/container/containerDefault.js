import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { LogoJsonLd } from 'next-seo';
import { Box } from '@chakra-ui/react';
import FloatingWhatsApp from 'react-floating-whatsapp';

import site from '@/config/site';
import NavbarDefault from '@/layouts/navbar/navbarDefaultV2';
import FooterDefault from '@/layouts/footer/footerDefault';

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

function ContainerDefault({ children, isHome = false, title }) {
  const router = useRouter();
  const canonical = site.siteUrl;
  const noIndex = !isProduction;

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={isHome ? `%s` : `%s | ${site.title}`}
        description={site.description}
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
          description: site.description,
          site_name: site.title,
          images: [{ url: '/images/logo/logo80x80.png' }],
        }}
      />
      <LogoJsonLd
        logo={`${site.siteUrl}/images/logo/logo80x80.png`}
        url={site.siteUrl}
      />
      <NavbarDefault />
      <Box as={'main'}>{children}</Box>
      <FooterDefault />
      <FloatingWhatsApp
        phoneNumber={site.whatsappNumber}
        accountName={'Zayn'}
        avatar={'/images/illustration/avatar-whatsapp.png'}
        statusMessage={'Active'}
        chatMessage={'Halo 👋 \nAda yang bisa kita bantu?'}
        allowClickAway
        notification
        notificationDelay={60000}
        notificationSound
      />
    </>
  );
}

export default ContainerDefault;
