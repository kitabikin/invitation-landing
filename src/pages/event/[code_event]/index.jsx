import NextImage from 'next/image';
import { NextSeo } from 'next-seo';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import qs from 'qs';

import site from '@/config/site';
import ContainerDefault from '@/layouts/container/containerDefault';
import HeaderPage from '@/components/global/header/headerPage';
import ThemePreviewList from '@/components/specific/theme/themePreviewList';
import ThemePreviewCommingSoon from '@/components/specific/theme/themePreviewCommingSoon';
import ThemePreviewCustom from '@/components/specific/theme/themePreviewCustom';
import CallOut from '@/components/global/callOut';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

function EventDetail({ event, theme }) {
  return (
    <ContainerDefault>
      <NextSeo
        title={`Acara ${event.data.name}`}
        titleTemplate={`%s | ${site.title}`}
        description={site.description}
      />
      <Container maxW="container.lg" mt={20}>
        <HeaderPage title={event.data.name} />

        <SimpleGrid columns={{ sm: 2, md: 3 }} spacing="24px" mb={6}>
          {theme.error !== 1 &&
            theme.data.map((item) => (
              <ThemePreviewList
                key={item.code}
                event={event.data}
                theme={item}
              />
            ))}
          <ThemePreviewCommingSoon />
        </SimpleGrid>

        <Box mb={24}>
          <ThemePreviewCustom />
        </Box>

        <Box
          position={'relative'}
          width={'full'}
          height={{ base: 160, md: 300, lg: 400 }}
        >
          <NextImage
            src="/images/illustration/theme.png"
            layout="fill"
            objectFit="cover"
            objectPosition={'center 28%'}
          />
        </Box>
      </Container>

      <CallOut />
    </ContainerDefault>
  );
}

export async function getServerSideProps({ params }) {
  const pParams = {
    where: [{ is_active: true }],
  };
  const merge = qs.stringify(pParams);
  const res = await fetch(`${coreUrl}/v1/event/${params.code_event}?${merge}`);
  const data = await res.json();

  // theme
  const pParamsTheme = {
    where: [
      { is_active: true },
      { 'theme_category:is_active': true },
      { 'event:code': data.data.code },
    ],
    with: [{ theme_category: true }, { event: true }],
  };
  const mergeTheme = qs.stringify(pParamsTheme);
  const resTheme = await fetch(`${coreUrl}/v1/theme?${mergeTheme}`);
  const dataTheme = await resTheme.json();

  if (data.error === 1) {
    return {
      notFound: true,
    };
  }

  return { props: { event: data, theme: dataTheme } };
}

export default EventDetail;
