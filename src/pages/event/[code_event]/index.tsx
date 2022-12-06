import { Fragment } from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import { isEmpty } from 'lodash';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import qs from 'qs';
import { useQuery } from '@tanstack/react-query';

import ContainerDefault from '@/layouts/container/containerDefault';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import HeaderPage from '@/components/global/header/headerPage';
import ThemePreviewList from '@/components/specific/theme/themePreviewList';
import ThemePreviewCommingSoon from '@/components/specific/theme/themePreviewCommingSoon';
import ThemePreviewCustom from '@/components/specific/theme/themePreviewCustom';
import CallOut from '@/components/global/callOut';
import { getAllTheme } from '@/libs/fetchQuery';
import { MdWeb } from 'react-icons/md';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

const EventDetail = ({ event }) => {
  // Settings
  const description = `Pengguna dapat memilih undangan sesuai dengan tema, warna, dan preferensi pribadi. Menyediakan fitur custom design yang memungkinkan pengguna untuk menyesuaikan desain undangan sesuai dengan kebutuhan.`;
  const router = useRouter();
  const { code_event } = router.query;

  const params = {
    where: [
      { is_active: true },
      { 'theme_category:is_active': true },
      { 'event:code': code_event },
    ],
    with: [{ theme_category: true }, { event: true }],
  };
  const { isLoading, data: theme } = useQuery({
    queryKey: ['theme', code_event],
    queryFn: () => getAllTheme({ params: params }),
  });

  return (
    <ContainerDefault title={`Acara ${event.name}`} description={description}>
      <Container maxW="container.lg" mt={20}>
        <HeaderPage title={event.name} />

        {/* List */}
        {isLoading ? (
          <SimpleGrid columns={3} spacing={6}>
            {[0, 1, 3].map((_, index) => (
              <SkeletonList key={index} />
            ))}
          </SimpleGrid>
        ) : (
          <Fragment>
            {isEmpty(theme.data) ? (
              <EmptyList
                label={`Acara ${event.name}`}
                icon={<MdWeb size={30} />}
              />
            ) : (
              <SimpleGrid columns={{ sm: 2, md: 3 }} spacing="24px" mb={6}>
                {theme.data.map((item) => (
                  <ThemePreviewList
                    key={item.code}
                    event={event}
                    theme={item}
                  />
                ))}
                <ThemePreviewCommingSoon />
              </SimpleGrid>
            )}
          </Fragment>
        )}

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
};

export async function getServerSideProps({ params }) {
  const pParams = {
    where: [{ is_active: true }],
  };
  const merge = qs.stringify(pParams);
  const res = await fetch(`${coreUrl}/v1/event/${params.code_event}?${merge}`);
  const data = await res.json();

  if (data.error === 1) {
    return {
      notFound: true,
    };
  }

  return { props: { event: data.data } };
}

export default EventDetail;
