import { Fragment, useEffect, useMemo, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import qs from 'qs';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import { useQuery } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import GuestbookSend from '@/components/specific/guestbook/guestbookSend';
import { User } from '@/pages/api/user';
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
  HStack,
  Link,
  Select,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {
  MdAdd,
  MdSearch,
  MdPeople,
  MdPerson,
  MdAccessTimeFilled,
  MdLocalPhone,
  MdModeEdit,
  MdArrowForward,
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

const Guestbook = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Settings
  const router = useRouter();
  const { code_invitation } = router.query;

  // State
  const [search, setSearch] = useState('');
  const [type, setType] = useState<any>(['vip', 'keluarga', 'biasa']);
  const [send, setSend] = useState<any>([true, false]);

  // Get Guestbook
  const params = {
    where: [
      { is_delete: false },
      { from: 'admin' },
      { type },
      { is_send: send },
      { 'invitation:code': code_invitation },
      { 'invitation:id_user': user.id_user },
    ],
    with: [{ invitation: true }, { parrent: true }],
    search,
  };
  const { isLoading, data: guestbook } = useQuery({
    queryKey: ['guestbook'],
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

  const handleType = ({ target }) => {
    if (target.value === 'all') {
      setType(['vip', 'keluarga', 'biasa']);
    } else {
      setType(target.value);
    }
  };

  const handleSend = ({ target }) => {
    if (target.value === 'all') {
      setSend([true, false]);
    } else {
      setSend(target.value);
    }
  };

  return (
    <ContainerClient type={'invitation'} title={'Buku Tamu'}>
      <Box bg={'gray.50'} minH={'100vh'}>
        <Container maxW={'8xl'}>
          <Flex>
            {/* Main */}
            <Flex flex={'1 0 0%'} flexDir={'column'} gap={4} py={8}>
              {/* Header */}
              <Flex justifyContent={'space-between'} mb={4}>
                <Heading as={'h3'} size={'lg'}>
                  Buku Tamu
                </Heading>
                <NextLink
                  href={`/a/invitation/${code_invitation}/guestbook/add`}
                  passHref
                >
                  <Link
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    <Button
                      size={'sm'}
                      colorScheme={'pink'}
                      leftIcon={<MdAdd size={20} />}
                    >
                      Tambah
                    </Button>
                  </Link>
                </NextLink>
              </Flex>

              {/* Filter */}
              <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                <GridItem colSpan={{ base: 12, md: 6 }}>
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
                  <Select bg={'white'} onChange={handleType}>
                    <option value="all">Semua</option>
                    <option value="vip">VIP</option>
                    <option value="keluarga">Keluarga</option>
                    <option value="biasa">Biasa</option>
                  </Select>
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 3 }}>
                  <Select bg={'white'} onChange={handleSend}>
                    <option value="all">Semua</option>
                    <option value="true">Terkirim</option>
                    <option value="false">Belum Terkirim</option>
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

                              {res.is_send ? (
                                <Badge colorScheme="green">Terkirim</Badge>
                              ) : (
                                <Badge colorScheme="red">Belum Terkirim</Badge>
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
                                label="Jenis Tamu"
                                aria-label="Jenis Tamu"
                              >
                                <Flex
                                  alignItems={'center'}
                                  gap={2}
                                  color={'teal.300'}
                                >
                                  <MdPerson size={20} />
                                  <Text fontSize="sm" color={'gray.600'}>
                                    {(() => {
                                      switch (res.type) {
                                        case 'vip':
                                          return 'VIP';
                                        case 'keluarga':
                                          return 'Keluarga';
                                        case 'biasa':
                                          return 'Biasa';
                                        default:
                                          return null;
                                      }
                                    })()}
                                  </Text>
                                </Flex>
                              </Tooltip>

                              <Tooltip
                                hasArrow
                                placement="top"
                                label="Sesi"
                                aria-label="Sesi"
                              >
                                <Flex
                                  alignItems={'center'}
                                  gap={2}
                                  color={'red.300'}
                                >
                                  <MdAccessTimeFilled size={20} />
                                  <Text fontSize="sm" color={'gray.600'}>
                                    Sesi {res.session ? res.session : '-'}
                                  </Text>
                                </Flex>
                              </Tooltip>

                              <Tooltip
                                hasArrow
                                placement="top"
                                label="No. Telepon"
                                aria-label="No. Telepon"
                              >
                                <Flex
                                  alignItems={'center'}
                                  gap={2}
                                  color={'blue.300'}
                                >
                                  <MdLocalPhone size={20} />
                                  <Text fontSize="sm" color={'gray.600'}>
                                    {res.no_telp ? res.no_telp : '-'}
                                  </Text>
                                </Flex>
                              </Tooltip>
                            </Flex>

                            <Text fontSize="sm" mb={4}>
                              {res.address}
                            </Text>

                            <Flex
                              flexDir={{ base: 'column', md: 'row' }}
                              justifyContent={'space-between'}
                              gap={{ base: 2, md: 6 }}
                            >
                              <HStack spacing="16px">
                                <NextLink
                                  href={`/a/invitation/${code_invitation}/guestbook/edit/${res.id_invitation_guest_book}`}
                                  passHref
                                >
                                  <Link
                                    _hover={{
                                      textDecoration: 'none',
                                    }}
                                  >
                                    <Button
                                      size={'xs'}
                                      variant="solid"
                                      colorScheme="pink"
                                      leftIcon={<MdModeEdit />}
                                    >
                                      Ubah
                                    </Button>
                                  </Link>
                                </NextLink>
                                <Button
                                  size={'xs'}
                                  variant="outline"
                                  colorScheme="teal"
                                  rightIcon={<MdArrowForward />}
                                >
                                  Lihat Pesan
                                </Button>
                              </HStack>

                              <HStack spacing="16px">
                                <GuestbookSend
                                  user={user}
                                  id={res.id_invitation_guest_book}
                                  isSend={res.is_send}
                                />
                              </HStack>
                            </Flex>
                          </CardBody>
                        </Card>
                      ))}
                    </Stack>
                  )}
                </Fragment>
              )}
            </Flex>

            {/* Sidebar */}
            <Box
              display={{ base: 'none', md: 'block' }}
              w={{ base: 0, md: '300px', lg: '435px', xl: '570px' }}
            >
              Kanan
            </Box>
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

export default Guestbook;
