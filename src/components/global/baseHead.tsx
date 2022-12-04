import { useRouter } from 'next/router';
import { NextSeo, LogoJsonLd } from 'next-seo';
import site from '@/config/site';

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

const BaseHead = ({ title, description }) => {
  const router = useRouter();
  const canonical = site.siteUrl;
  const noIndex = !isProduction;

  const isHome = router.asPath === '/';

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={isHome ? `%s` : `%s | ${site.title}`}
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
          {
            rel: 'preconnect',
            href: `https://ik.imagekit.io`,
          },
          {
            rel: 'preconnect',
            href: `https://res.cloudinary.com`,
          },
          {
            rel: 'preconnect',
            href: `https://avatars.dicebear.com`,
          },
          {
            rel: 'preconnect',
            href: `https://placehold.co`,
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
      <LogoJsonLd
        logo={`${site.siteUrl}/images/logo/logo80x80.png`}
        url={site.siteUrl}
      />
    </>
  );
};

export default BaseHead;
