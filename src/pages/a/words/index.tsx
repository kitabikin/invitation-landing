import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import ContainerClient from '@/layouts/container/containerClient';
import { User } from '@/pages/api/user';
import useGreeting from '@/libs/useGreeting';

import { InferGetServerSidePropsType } from 'next';

const Words = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const params = {
    where: [
      { is_active: true },
      { is_delete: false },
      { 'invitation:id_user': user.id_user },
    ],
    with: [{ invitation: true }],
    sort: 'created_at:desc',
  };
  const { greeting, isLoading } = useGreeting(user, { params });

  return (
    <ContainerClient title="Ucapan & Doa">
      <Box bg={'gray.50'} minH={'100vh'} py={8}>
        <Container maxW={'8xl'}>
          <Box mb={8}>
            <Heading as={'h4'} size={'md'}>
              Ucapan & Doa
            </Heading>
          </Box>

          {isLoading && (
            <Card variant={'outline'} bg={'white'} mb={4}>
              <CardBody>
                <Stack>
                  <Skeleton height="20px" w={'20%'} />
                  <Skeleton height="20px" w={'75%'} />
                  <Skeleton height="20px" w={'50%'} />
                </Stack>
              </CardBody>
            </Card>
          )}

          {!isLoading && (
            <Stack>
              {greeting.data.map((res, index) => (
                <Card key={index} variant={'outline'} bg={'white'}>
                  <CardBody>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        {res.name}
                      </Heading>
                      <Text pt="2" fontSize="sm" whiteSpace={'pre-wrap'}>
                        {res.greeting}
                      </Text>
                    </Box>
                  </CardBody>
                </Card>
              ))}
            </Stack>
          )}
        </Container>
      </Box>
    </ContainerClient>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: {
          isLoggedIn: false,
          id_user: null,
          username: null,
          profile: null,
          token: null,
        } as User,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
sessionOptions);

export default Words;
