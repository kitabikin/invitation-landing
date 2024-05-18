import NextLink from 'next/link';
import NextImage from 'next/legacy/image';
import { Box, Card, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import SkeletonList from '@/components/global/skeletonList';
import { getAllInvitationPublic } from '@/libs/fetchQuery';

function HomeHappy() {
  const params = {
    where: [{ 'event:code': 'wedding' }],
    with: [{ event: true }],
    sort: 'invitation_at:desc',
    limit: 3,
  };
  const { isLoading, data: invitation } = useQuery({
    queryKey: ['invitationPublic'],
    queryFn: () => getAllInvitationPublic({ params }),
  });

  return (
    <Box>
      {isLoading ? (
        <SimpleGrid columns={[1, null, 3]} spacing="24px" mt={4}>
          {[0, 1, 3].map((_, index) => (
            <SkeletonList key={index} />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={[1, null, 3]} spacing="24px" mt={4}>
          {invitation.map((item) => (
            <NextLink key={item.code} href={`/wedding/${item.code}`}>
              <Card pos={'relative'} _hover={{ transform: 'scale(1.05)' }}>
                <Box h={200} w={'full'} pos={'relative'}>
                  <NextImage
                    src={`${JSON.parse(item.metadata).images}`}
                    layout="fill"
                    loading="eager"
                    objectFit="cover"
                    alt={`Pernikahan ${item.name}`}
                    style={{ borderRadius: 8 }}
                  />
                </Box>
              </Card>
            </NextLink>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default HomeHappy;
