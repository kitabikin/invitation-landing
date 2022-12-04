import NextImage from 'next/image';
import { NextSeo } from 'next-seo';
import { Box, Container } from '@chakra-ui/react';

import site from '@/config/site';
import ContainerDefault from '@/layouts/container/containerDefault';
import HomeHeroV2 from '@/components/specific/home/homeHeroV2';
import HomeFeature from '@/components/specific/home/homeFeature';
import HomeStatistic from '@/components/specific/home/homeStatistic';

function Home() {
  return (
    <ContainerDefault title={site.titleHome}>
      <NextSeo titleTemplate={`%s`} />
      <Container maxW="container.lg" mt={20}>
        <HomeHeroV2 />
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
          />
        </Box>
      </Container>

      {/* <Box borderTop={1} borderStyle={'solid'} borderColor={'gray.200'}>
        <Container maxW="container.lg">
          <HomeStatistic />
        </Container>
      </Box> */}
    </ContainerDefault>
  );
}

export default Home;
