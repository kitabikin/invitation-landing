import { Fragment, useEffect, useMemo, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { assign, isEmpty } from 'lodash';
import debounce from 'lodash/debounce';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import { getAllGuestbook } from '@/libs/fetchQuery';
import {
  Badge,
  Box,
  Button,
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

const Attendance = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Settings
  const queryClient = useQueryClient();
  const router = useRouter();
  const { code_invitation } = router.query;

  // State
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('modified_at:desc');
  const [search, setSearch] = useState('');
  const [confirmation, setConfirmation] = useState<any>(['yes', 'no']);

  // Get Guestbook
  const params = {
    where: [
      { is_delete: false },
      { confirmation },
      { 'invitation:code': code_invitation },
      { 'invitation:id_user': session?.user.id_user },
    ],
    with: [{ invitation: true }, { parrent: true }],
    search,
    sort,
    page,
  };
  const {
    isLoading,
    data: guestbook,
    isPreviousData,
  } = useQuery({
    queryKey: ['attendance', page, sort, search, confirmation],
    queryFn: () => getAllGuestbook(session?.accessToken, { params }),
    keepPreviousData: true,
    staleTime: 5000,
  });

  // Effect
  useEffect(() => {
    if (!isPreviousData && guestbook?.hasMore) {
      queryClient.prefetchQuery(
        ['attendance', page + 1, sort, search, confirmation],
        () => {
          assign(params, {
            page: page + 1,
          });
          return getAllGuestbook(session?.accessToken, { params });
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    guestbook,
    isPreviousData,
    sort,
    page,
    search,
    confirmation,
    queryClient,
  ]);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Action
  const handleSort = ({ target }) => {
    setPage(1);
    switch (target.value) {
      case 'modified_at':
        setSort('modified_at:desc');
        break;
      case 'name':
        setSort('name:asc');
        break;
      default:
        break;
    }
  };

  const handleSearch = ({ target }) => {
    setPage(1);
    setSearch(target.value);
  };

  const debouncedChangeHandler = useMemo(() => debounce(handleSearch, 500), []);

  const handleConfirmation = ({ target }) => {
    setPage(1);
    if (target.value === 'all') {
      setConfirmation(['yes', 'no']);
    } else {
      setConfirmation(target.value);
    }
  };

  return (
    <ContainerClient type={'invitation'} title={'Konfirmasi Kehadiran'}>
      <Box bg={'gray.50'} minH={'calc(100vh - 65px)'}>
        <Container maxW={'8xl'} pb={8}>
          <Flex flexDir={'column'} gap={4} py={8}>
            {/* Header */}
            <Heading as={'h3'} size={'lg'} mb={4}>
              Konfirmasi Kehadiran
            </Heading>

            {/* Filter */}
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
              <GridItem colSpan={{ base: 12, md: 8 }}>
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
              <GridItem colSpan={{ base: 12, md: 2 }}>
                <Select bg={'white'} onChange={handleConfirmation}>
                  <option value="all">Semua</option>
                  <option value="yes">Hadir</option>
                  <option value="no">Tidak Hadir</option>
                </Select>
              </GridItem>
              <GridItem colSpan={{ base: 12, md: 2 }}>
                <Select bg={'white'} onChange={handleSort}>
                  <option value="modified_at">Terbaru</option>
                  <option value="name">Abjad</option>
                </Select>
              </GridItem>
            </Grid>

            {/* List */}
            {isLoading ? (
              <SkeletonList />
            ) : (
              <Fragment>
                {isEmpty(guestbook.data) ? (
                  <EmptyList
                    label={'Konfirmasi Kehadiran'}
                    icon={<MdPeople size={30} />}
                  />
                ) : (
                  <>
                    <Stack>
                      {guestbook.data.map((res, index) => (
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
                    <Flex justifyContent={'space-between'}>
                      <Button
                        size={'sm'}
                        colorScheme={'pink'}
                        onClick={() => setPage((old) => Math.max(old - 1, 0))}
                        disabled={page === 1}
                      >
                        Sebelumnya
                      </Button>
                      <Button
                        size={'sm'}
                        colorScheme={'pink'}
                        onClick={() => {
                          setPage((old) =>
                            guestbook?.hasMore ? old + 1 : old,
                          );
                        }}
                        disabled={isPreviousData || !guestbook?.hasMore}
                      >
                        Selanjutnya
                      </Button>
                    </Flex>
                  </>
                )}
              </Fragment>
            )}
          </Flex>
        </Container>
      </Box>
    </ContainerClient>
  );
};

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (!session) {
    return {
      redirect: {
        destination: '/a/invitation',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Attendance;
