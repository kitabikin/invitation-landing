import { useRouter } from 'next/router';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { Box } from '@chakra-ui/react';

import site from '@/config/site';
import NavbarDefault from '@/layouts/navbar/navbarDefaultV2';
import FooterDefault from '@/layouts/footer/footerDefault';
import BaseHead from '@/components/global/baseHead';
import FloatingWhatsapp from '@/components/global/floatingWhatsapp';

function ContainerBlog({ children, title, description = null, image, date }) {
  const router = useRouter();

  return (
    <>
      <BaseHead
        title={title}
        description={description ? description : site.description}
      />
      <NextSeo
        openGraph={{
          type: 'article',
          article: {
            publishedTime: date,
            modifiedTime: date,
          },
          images: [{ url: image }],
        }}
      />
      <ArticleJsonLd
        url={site.siteUrl + router.asPath}
        title={title}
        images={[image]}
        datePublished={date}
        dateModified={date}
        authorName={site.author}
        publisherName={site.author}
        publisherLogo={'/images/logo/logo80x80.png'}
        description={description}
      />
      <NavbarDefault />
      <Box as={'main'}>{children}</Box>
      <FooterDefault />
      <FloatingWhatsapp />
    </>
  );
}

export default ContainerBlog;
