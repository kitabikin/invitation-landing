import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { assign } from 'lodash';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useQuery } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import { verify } from '@/libs/jwtSignVerify';
import { getTotalGuestbook, getTotalGreeting } from '@/libs/fetchQuery';
import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const Statistic = ({ title, total = 0 }) => {
  return (
    <Card variant={'outline'} bg={'white'} h={{ base: 'auto', md: 'full' }}>
      <CardBody>
        <Box>
          <Heading size="sm" mb={4}>
            {title}
          </Heading>
          <Text fontSize={{ base: '3xl', md: '5xl' }} fontWeight={'semibold'}>
            {total}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

const StatisticGuestbook = ({ session }) => {
  // Settings
  const router = useRouter();
  const { code_invitation } = router.query;

  // Get Greeting ==============================================================
  // Get Total Greeting
  const pWhereTG: any = [
    { is_active: true },
    { is_delete: false },
    { from: 'admin' },
    { 'invitation:code': code_invitation },
  ];
  const pWithTG: any = [{ invitation: true }];

  const paramsTG: any = {
    where: pWhereTG,
    with: pWithTG,
  };

  if (session?.user.role === 'event-client') {
    paramsTG.where.push({ 'invitation:id_user': session?.user.id_user });
  }

  const { isLoading: isLoadingTG, data: TG } = useQuery({
    queryKey: ['total-guestbook', code_invitation],
    queryFn: () =>
      getTotalGuestbook(session?.accessToken, { params: paramsTG }),
  });

  // Get Total Greeting Send
  const paramsTGSend: any = {
    where: [...pWhereTG, { is_send: true }],
    with: pWithTG,
  };

  const { isLoading: isLoadingTGSend, data: TGSend } = useQuery({
    queryKey: ['total-guestbook-send', code_invitation],
    queryFn: () =>
      getTotalGuestbook(session?.accessToken, { params: paramsTGSend }),
  });

  // Get Total Greeting Send Not
  const paramsTGSendNot: any = {
    where: [...pWhereTG, { is_send: false }],
    with: pWithTG,
  };

  const { isLoading: isLoadingTGSendNot, data: TGSendNot } = useQuery({
    queryKey: ['total-guestbook-send-not', code_invitation],
    queryFn: () =>
      getTotalGuestbook(session?.accessToken, { params: paramsTGSendNot }),
  });

  // Get Total Greeting VIP
  const paramsTGVip: any = {
    where: [...pWhereTG, { type: 'vip' }],
    with: pWithTG,
  };

  const { isLoading: isLoadingTGVip, data: TGVip } = useQuery({
    queryKey: ['total-guestbook-vip', code_invitation],
    queryFn: () =>
      getTotalGuestbook(session?.accessToken, { params: paramsTGVip }),
  });

  // Get Total Greeting Family
  const paramsTGFamily: any = {
    where: [...pWhereTG, { type: 'keluarga' }],
    with: pWithTG,
  };

  const { isLoading: isLoadingTGFamily, data: TGFamily } = useQuery({
    queryKey: ['total-guestbook-family', code_invitation],
    queryFn: () =>
      getTotalGuestbook(session?.accessToken, { params: paramsTGFamily }),
  });

  // Get Total Greeting Normal
  const paramsTGNormal: any = {
    where: [...pWhereTG, { type: 'biasa' }],
    with: pWithTG,
  };

  const { isLoading: isLoadingTGNormal, data: TGNormal } = useQuery({
    queryKey: ['total-guestbook-normal', code_invitation],
    queryFn: () =>
      getTotalGuestbook(session?.accessToken, { params: paramsTGNormal }),
  });

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(12, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={{ base: 12, md: 3 }}>
        {isLoadingTG ? (
          <SkeletonList />
        ) : (
          <Statistic title={'Buku Tamu'} total={TG.data} />
        )}
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 3 }}>
        {isLoadingTGVip ? (
          <SkeletonList />
        ) : (
          <Statistic title={'VIP'} total={TGVip.data} />
        )}
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 3 }}>
        {isLoadingTGFamily ? (
          <SkeletonList />
        ) : (
          <Statistic title={'Keluarga'} total={TGFamily.data} />
        )}
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 3 }}>
        {isLoadingTGNormal ? (
          <SkeletonList />
        ) : (
          <Statistic title={'Biasa'} total={TGNormal.data} />
        )}
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 9 }}>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            {isLoadingTGSend ? (
              <SkeletonList />
            ) : (
              <Statistic title={'Terkirim'} total={TGSend.data} />
            )}
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            {isLoadingTGSendNot ? (
              <SkeletonList />
            ) : (
              <Statistic title={'Belum Terkirim'} total={TGSendNot.data} />
            )}
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

const StatisticAttendance = ({ session }) => {
  // Settings
  const router = useRouter();
  const { code_invitation } = router.query;

  // Get Attendance ==============================================================
  // Get Total Attendance
  const pWhereTA: any = [
    { is_active: true },
    { is_delete: false },
    { 'invitation:code': code_invitation },
  ];
  const pWithTA: any = [{ invitation: true }];

  const paramsTA: any = {
    where: [...pWhereTA, { confirmation: ['yes', 'no'] }],
    with: pWithTA,
  };

  if (session?.user.role === 'event-client') {
    paramsTA.where.push({ 'invitation:id_user': session?.user.id_user });
  }

  const { isLoading: isLoadingTA, data: TA } = useQuery({
    queryKey: ['total-attendance', code_invitation],
    queryFn: () =>
      getTotalGuestbook(session?.accessToken, { params: paramsTA }),
  });

  // Get Total Greeting Present
  const paramsTAPresent: any = {
    where: [...pWhereTA, { confirmation: 'yes' }],
    with: pWithTA,
  };

  const { isLoading: isLoadingTAPresent, data: TAPresent } = useQuery({
    queryKey: ['total-attendance-present', code_invitation],
    queryFn: () =>
      getTotalGuestbook(session?.accessToken, { params: paramsTAPresent }),
  });

  // Get Total Greeting Present Not
  const paramsTAPresentNot: any = {
    where: [...pWhereTA, { confirmation: 'no' }],
    with: pWithTA,
  };

  const { isLoading: isLoadingTAPresentNot, data: TAPresentNot } = useQuery({
    queryKey: ['total-attendance-present-not', code_invitation],
    queryFn: () =>
      getTotalGuestbook(session?.accessToken, { params: paramsTAPresentNot }),
  });

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(12, 1fr)"
      gap={4}
    >
      <GridItem colSpan={{ base: 12, md: 4 }}>
        {isLoadingTA ? (
          <SkeletonList />
        ) : (
          <Statistic title={'Konfirmasi Kehadiran'} total={TA.data} />
        )}
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 4 }}>
        {isLoadingTAPresent ? (
          <SkeletonList />
        ) : (
          <Statistic title={'Hadir'} total={TAPresent.data} />
        )}
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 4 }}>
        {isLoadingTAPresentNot ? (
          <SkeletonList />
        ) : (
          <Statistic title={'Tidak Hadir'} total={TAPresentNot.data} />
        )}
      </GridItem>
    </Grid>
  );
};

const StatisticWords = ({ session }) => {
  // Settings
  const router = useRouter();
  const { code_invitation } = router.query;

  // Get Attendance ==============================================================
  // Get Total Attendance
  const pWhereTW: any = [
    { is_active: true },
    { is_delete: false },
    { 'invitation:code': code_invitation },
  ];
  const pWithTW: any = [{ invitation: true }];

  const paramsTW: any = {
    where: pWhereTW,
    with: pWithTW,
  };

  if (session?.user.role === 'event-client') {
    paramsTW.where.push({ 'invitation:id_user': session?.user.id_user });
  }

  const { isLoading: isLoadingTW, data: TW } = useQuery({
    queryKey: ['total-greeting', code_invitation],
    queryFn: () => getTotalGreeting(session?.accessToken, { params: paramsTW }),
  });

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(12, 1fr)"
      gap={4}
    >
      <GridItem colSpan={{ base: 12, md: 12 }}>
        {isLoadingTW ? (
          <SkeletonList />
        ) : (
          <Statistic title={'Ucapan & Doa'} total={TW.data} />
        )}
      </GridItem>
    </Grid>
  );
};

const Analytics = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ContainerClient type={'invitation'} title={'Analitik'}>
      <Box bg={'gray.50'} minH={'100vh'}>
        <Container maxW={'8xl'}>
          <Flex flexDir={'column'} gap={4} py={8}>
            <Heading as={'h3'} size={'lg'} mb={4}>
              Analitik
            </Heading>

            <Flex flexDir={'column'} gap={8}>
              <StatisticGuestbook session={session} />

              <hr />

              <StatisticAttendance session={session} />

              <hr />

              <StatisticWords session={session} />
            </Flex>
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
