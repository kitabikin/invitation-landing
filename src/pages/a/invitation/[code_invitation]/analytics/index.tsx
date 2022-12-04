import { InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ContainerClient from '@/layouts/container/containerClient';
import { verify } from '@/libs/jwtSignVerify';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const Analytics = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ContainerClient type={'invitation'} title={'Analitik'}>
      <Box bg={'gray.50'} minH={'100vh'}>
        <Container maxW={'8xl'}>
          <Flex flexDir={'column'} gap={4} py={8}>
            <Heading as={'h3'} size={'lg'}>
              Analitik
            </Heading>
          </Flex>
        </Container>
      </Box>
    </ContainerClient>
  );
};

export async function getServerSideProps(context) {
  try {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions,
    );

    if (!session) {
      throw new Error('No Session');
    }

    await verify(session.accessToken, JWT_SECRET_KEY);

    return {
      props: {
        session,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default Analytics;
