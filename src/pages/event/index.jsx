import NextImage from 'next/image';
import { NextSeo } from 'next-seo';
import { Box, Container, Img, SimpleGrid } from '@chakra-ui/react';
import qs from 'qs';

import site from '@/config/site';
import ContainerDefault from '@/layouts/container/containerDefault';
import HeaderPage from '@/components/global/header/headerPage';
import EventPreviewList from '@/components/specific/event/eventPreviewList';
import EventPreviewCustom from '@/components/specific/event/eventPreviewCustom';
import CallOut from '@/components/global/callOut';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

function Event({ event }) {
  return (
    <>
      <NextSeo
        title="Acara"
        titleTemplate={`%s | ${site.title}`}
        description={site.description}
      />
      <Container maxW="container.lg" mt={20}>
        <HeaderPage title={'Acara'} />

        <SimpleGrid columns={[2, null, 3]} spacing="24px" mb={6}>
          {event.data.map((item) => (
            <EventPreviewList key={item.code} event={item} />
          ))}
        </SimpleGrid>

        <Box mb={24}>
          <EventPreviewCustom />
        </Box>

        <Box
          position={'relative'}
          width={'full'}
          height={{ base: 160, md: 300, lg: 400 }}
        >
          <NextImage
            src="/images/illustration/event.png"
            layout="fill"
            objectFit="cover"
            objectPosition={'center 30%'}
            priority={1}
            quality={100}
          />
        </Box>
      </Container>

      <CallOut />
    </>
  );
}

export async function getServerSideProps() {
  const pParams = {
    where: [{ is_active: true }],
    sort: 'name:asc',
  };
  const merge = qs.stringify(pParams);
  const res = await fetch(`${coreUrl}/v1/event?${merge}`);
  const data = await res.json();

  if (data.error === 1) {
    return {
      notFound: true,
    };
  }

  return { props: { event: data } };
}

Event.Layout = function getLayout(page) {
  return <ContainerDefault>{page}</ContainerDefault>;
};

export default Event;
