import { Fragment, useEffect, useMemo, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import qs from 'qs';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import { useQuery } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import { User } from '@/pages/api/user';
import {
  Badge,
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {
  MdSearch,
  MdPeople,
  MdSupervisedUserCircle,
  MdAccessTimeFilled,
} from 'react-icons/md';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

const getAllGuestbook = async (user: User | undefined, { params = {} }) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-guest-book?${merge}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

const Attendance = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Settings
  const router = useRouter();
  const { code_invitation } = router.query;

  // State
  const [search, setSearch] = useState('');
  const [confirmation, setConfirmation] = useState<any>(['yes', 'no']);

  // Get Guestbook
  const params = {
    where: [
      { is_delete: false },
      { confirmation },
      { 'invitation:code': code_invitation },
      { 'invitation:id_user': user.id_user },
    ],
    with: [{ invitation: true }, { parrent: true }],
    search,
  };
  const { isLoading, data: guestbook } = useQuery({
    queryKey: ['attendance'],
    queryFn: () => getAllGuestbook(user, { params }),
  });

  // Effect
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  // Action
  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  const debouncedChangeHandler = useMemo(() => debounce(handleSearch, 500), []);

  const handleConfirmation = ({ target }) => {
    if (target.value === 'all') {
      setConfirmation(['yes', 'no']);
    } else {
      setConfirmation(target.value);
    }
  };

  return (
    <ContainerClient type={'invitation'} title={'Konfirmasi Kehadiran'}>
      <Box bg={'gray.50'} minH={'100vh'}>
        <Container maxW={'8xl'}>
          <Flex flexDir={'column'} gap={4} py={8}>
            {/* Header */}
            <Heading as={'h3'} size={'lg'} mb={4}>
              Konfirmasi Kehadiran
            </Heading>

            {/* Filter */}
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
              <GridItem colSpan={{ base: 12, md: 9 }}>
                <InputGroup bg={'white'}>
                  <InputLeftElement
                    pointerEvents="none"
                    // eslint-disable-next-line react/no-children-prop
                    children={<MdSearch size={20} color={'gray'} />}
                  />
                  <Input
                    type="text"
                    placeholder="Search..."
                    onChange={debouncedChangeHandler}
                  />
                </InputGroup>
              </GridItem>
              <GridItem colSpan={{ base: 12, md: 3 }}>
                <Select bg={'white'} onChange={handleConfirmation}>
                  <option value="all">Semua</option>
                  <option value="yes">Hadir</option>
                  <option value="no">Tidak Hadir</option>
                </Select>
              </GridItem>
            </Grid>

            {/* List */}
            {isLoading ? (
              <SkeletonList />
            ) : (
              <Fragment>
                {_.isEmpty(guestbook) ? (
                  <EmptyList
                    label={'Konfirmasi Kehadiran'}
                    icon={<MdPeople size={30} />}
                  />
                ) : (
                  <Stack>
                    {guestbook.map((res, index) => (
                      <Card key={index} variant={'outline'} bg={'white'}>
                        <CardBody>
                          <Flex
                            flexDir={{ base: 'column', md: 'row' }}
                            alignItems={'flex-start'}
                            justifyContent={'space-between'}
                            gap={4}
                            mb={3}
                          >
                            <Heading
                              as={'h5'}
                              size="sm"
                              textTransform="uppercase"
                            >
                              {res.name}
                            </Heading>
                            {res.confirmation === 'yes' ? (
                              <Badge colorScheme="green">Hadir</Badge>
                            ) : (
                              <Badge colorScheme="red">Tidak Hadir</Badge>
                            )}
                          </Flex>

                          <Flex
                            flexDir={{ base: 'column', md: 'row' }}
                            gap={{ base: 2, md: 6 }}
                            mb={2}
                          >
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
                                <Text fontSize="sm" color={'gray.600'}>
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
                                <Text fontSize="sm" color={'gray.600'}>
                                  {res.total_reservation
                                    ? res.total_reservation
                                    : '-'}
                                </Text>
                              </Flex>
                            </Tooltip>
                          </Flex>

                          <Text fontSize="sm">{res.address}</Text>
                        </CardBody>
                      </Card>
                    ))}
                  </Stack>
                )}
              </Fragment>
            )}
          </Flex>
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
