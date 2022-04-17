import NextImage from 'next/image';
import { NextSeo } from 'next-seo';
import { Box, Container } from '@chakra-ui/react';

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

import site from '@/config/site';
import ContainerDefault from '@/layouts/container/containerDefault';
import HomeHero from '@/components/specific/home/homeHero';
import HomeFeature from '@/components/specific/home/homeFeature';
import HomeStatistic from '@/components/specific/home/homeStatistic';

function Home() {
  const canonical = site.siteUrl;
  const noIndex = !isProduction;

  return (
    <>
      <NextSeo
        title={site.titleHome}
        titleTemplate={`%s`}
        description={site.description}
        additionalMetaTags={[
          {
            property: 'keywords',
            content: site.keywords,
          },
        ]}
        canonical={canonical}
        noindex={noIndex}
      />
      <Container maxW="container.lg" mt={20}>
        <HomeHero />
      </Container>

      <Container maxW="container.lg" mt={16}>
        <HomeFeature />
      </Container>

      <Container maxW="container.lg" mt={24}>
        <Box
          position={'relative'}
          width={'full'}
          height={{ base: 180, md: 350, lg: 470 }}
        >
          <NextImage
            src="/images/illustration/launch.png"
            layout="fill"
            objectFit="cover"
            objectPosition={'center 35%'}
            priority={1}
            quality={100}
          />
        </Box>
      </Container>

      {/* <Box borderTop={1} borderStyle={'solid'} borderColor={'gray.200'}>
        <Container maxW="container.lg">
          <HomeStatistic />
        </Container>
      </Box> */}
    </>
  );
}

Home.Layout = function getLayout(page) {
  return <ContainerDefault>{page}</ContainerDefault>;
};

export default Home;
