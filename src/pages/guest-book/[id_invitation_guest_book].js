import Image from 'next/legacy/image';
import { Container, Box, Flex, Heading, Badge } from '@chakra-ui/react';
import qs from 'qs';

import ContainerBlank from '@/layouts/container/containerBlank';
import site from '@/config/site';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

function GuestBookDetail({ data }) {
  const seed = Math.floor(Math.random() * 100 + 1);

  return (
    <ContainerBlank title={`Buku Tamu`} description={site.description}>
      <Container maxW="container.sm" mt={4}>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6" textAlign={'center'}>
            <Flex justifyContent={'center'}>
              <Image
                width="150"
                height="150"
                alt="{data.name}"
                src={`https://api.dicebear.com/8.x/big-ears-neutral/svg?seed=${seed}`}
              />
            </Flex>

            <Heading as="h3" size="lg" mt={4}>
              {data.name}
            </Heading>

            <Box
              display="flex"
              alignItems="baseline"
              justifyContent={'center'}
              mt="3"
            >
              <Badge borderRadius="full" px="2" colorScheme="blue">
                {data.parent ? data.parent.type : data.type}
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                SESI {data.parent ? data.parent.session : data.session}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </ContainerBlank>
  );
}

export async function getServerSideProps({ params }) {
  const pParams = {
    with: [{ parrent: true }],
  };

  const merge = qs.stringify(pParams);
  const res = await fetch(
    `${coreUrl}/v1/invitation-guest-book/${params.id_invitation_guest_book}?${merge}`,
  );
  const data = await res.json();

  if (data.error === 1) {
    return {
      notFound: true,
    };
  }

  return { props: { data: data.data } };
}

export default GuestBookDetail;
