import { Fragment } from 'react';
import NextImage from 'next/image';
import { isEmpty } from 'lodash';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import ContainerDefault from '@/layouts/container/containerDefault';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import HeaderPage from '@/components/global/header/headerPage';
import EventPreviewList from '@/components/specific/event/eventPreviewList';
import EventPreviewCustom from '@/components/specific/event/eventPreviewCustom';
import CallOut from '@/components/global/callOut';
import { getAllEvent } from '@/libs/fetchQuery';
import { MdEvent } from 'react-icons/md';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

const Event = () => {
  const params = {
    where: [{ is_active: true }],
    sort: 'name:asc',
  };
  const { isLoading, data: event } = useQuery({
    queryKey: ['event'],
    queryFn: () => getAllEvent({ params }),
  });

  return (
    <ContainerDefault title="Acara">
      <Container maxW="container.lg" mt={20}>
        <HeaderPage title={'Acara'} />

        {/* List */}
        {isLoading ? (
          <SimpleGrid columns={3} spacing={6}>
            {[0, 1, 3].map((_, index) => (
              <SkeletonList key={index} />
            ))}
          </SimpleGrid>
        ) : (
          <Fragment>
            {isEmpty(event.data) ? (
              <EmptyList label={'Acara'} icon={<MdEvent size={30} />} />
            ) : (
              <SimpleGrid columns={[2, null, 3]} spacing="24px" mb={6}>
                {event.data.map((item) => (
                  <EventPreviewList key={item.code} event={item} />
                ))}
              </SimpleGrid>
            )}
          </Fragment>
        )}

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
          />
        </Box>
      </Container>

      <CallOut />
    </ContainerDefault>
  );
};

export default Event;
