import { useState } from 'react';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Select,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { MdSupervisedUserCircle, MdAccessTimeFilled } from 'react-icons/md';
import ContainerClient from '@/layouts/container/containerClient';
import { User } from '@/pages/api/user';
import useGuestbook from '@/libs/useGuestbook';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

import { InferGetServerSidePropsType } from 'next';

const Attendance = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [confirmation, setConfirmation] = useState<any>(['yes', 'no']);

  const params = {
    where: [
      { 'invitation:id_user': user.id_user },
      { is_delete: false },
      { confirmation },
    ],
    with: [{ invitation: true }, { parrent: true }],
  };

  const { guestbook, isLoading } = useGuestbook(user, { params });

  const handleClick = (value) => {
    if (value === 'all') {
      setConfirmation(['yes', 'no']);
    } else {
      setConfirmation(value);
    }
  };

  return (
    <ContainerClient title="Kehadiran">
      <Box bg={'gray.50'} minH={'100vh'} py={8}>
        <Container maxW={'8xl'}>
          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            gap={4}
            mb={6}
          >
            <Heading as={'h4'} size={'md'}>
              Kehadiran
            </Heading>

            <Select
              size="sm"
              bg={'white'}
              w={{ base: '100%', md: '270px' }}
              onChange={(e) => handleClick(e.target.value)}
            >
              <option value="all">Semua</option>
              <option value="yes">Hadir</option>
              <option value="no">Tidak Hadir</option>
            </Select>
          </Flex>

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
              {guestbook.data.map((res, index) => (
                <Card key={index} variant={'outline'} bg={'white'}>
                  <CardBody>
                    <Box>
                      <Flex
                        flexDir={{ base: 'column', md: 'row' }}
                        alignItems={'flex-start'}
                        justifyContent={'space-between'}
                        gap={4}
                      >
                        <Heading size="xs" textTransform="uppercase">
                          {res.name}
                        </Heading>
                        {res.confirmation === 'yes' ? (
                          <Badge colorScheme="green">Hadir</Badge>
                        ) : (
                          <Badge colorScheme="red">Tidak Hadir</Badge>
                        )}
                      </Flex>
                      <Flex
                        alignItems={'flex-start'}
                        justifyContent={'space-between'}
                      >
                        <Box>
                          <Flex
                            flexDir={{ base: 'column', md: 'row' }}
                            gap={{ base: 2, md: 6 }}
                            mt={2}
                          >
                            <Tooltip
                              hasArrow
                              placement="top"
                              label="Jumlah Reservasi"
                              aria-label="Jumlah Reservasi"
                            >
                              <Flex
                                alignItems={'center'}
                                gap={2}
                                color={'blue.300'}
                              >
                                <MdSupervisedUserCircle size={20} />
                                <Text
                                  fontSize="sm"
                                  fontWeight={'semibold'}
                                  color={'gray.600'}
                                >
                                  {res.total_reservation
                                    ? res.total_reservation
                                    : '-'}
                                </Text>
                              </Flex>
                            </Tooltip>
                            <Tooltip
                              hasArrow
                              placement="top"
                              label="Tanggal Konfirmasi"
                              aria-label="Tanggal Konfirmasi"
                            >
                              <Flex
                                alignItems={'center'}
                                gap={2}
                                color={'red.300'}
                              >
                                <MdAccessTimeFilled size={20} />
                                <Text
                                  fontSize="sm"
                                  fontWeight={'semibold'}
                                  color={'gray.600'}
                                >
                                  {format(
                                    parseISO(res.modified_at),
                                    'd MMMM yyyy - HH:mm',
                                    {
                                      locale: id,
                                    },
                                  )}
                                </Text>
                              </Flex>
                            </Tooltip>
                          </Flex>
                          <Text mt="2" fontSize="sm">
                            {res.address}
                          </Text>
                        </Box>
                      </Flex>
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

export default Attendance;
