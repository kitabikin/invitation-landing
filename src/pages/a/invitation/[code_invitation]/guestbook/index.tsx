import { Fragment, useEffect, useMemo, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { assign, isEmpty } from 'lodash';
import debounce from 'lodash/debounce';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useQuery } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import Pagination from '@/components/global/pagination';
import GuestbookSend from '@/components/specific/guestbook/guestbookSend';
import GuestbookMessage from '@/components/specific/guestbook/guestbookMessage';
import { verify } from '@/libs/jwtSignVerify';
import { getAllGuestbook, getInvitation } from '@/libs/fetchQuery';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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
  useDisclosure,
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

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const Guestbook = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Settings
  const router = useRouter();
  const { code_invitation } = router.query;

  const perPageItems = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
  ];

  // State
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('modified_at:desc');
  const [search, setSearch] = useState('');
  const [type, setType] = useState<any>(['vip', 'keluarga', 'biasa']);
  const [send, setSend] = useState<any>([true, false]);
  const [guest, setGuest] = useState('Tamu Undangan');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get Guestbook
  const params: any = {
    where: [
      { is_delete: false },
      { from: 'admin' },
      { type },
      { is_send: send },
      { 'invitation:code': code_invitation },
    ],
    with: [{ invitation: true }, { parrent: true }],
    search,
    sort,
    limit: perPage,
    start: perPage * page - perPage,
  };

  if (session?.user.role === 'event-client') {
    params.where.push({ 'invitation:id_user': session?.user.id_user });
  }

  const {
    isLoading,
    data: guestbook,
    isPreviousData,
  } = useQuery({
    queryKey: [
      'guestbook',
      code_invitation,
      perPage,
      page,
      sort,
      search,
      type,
      send,
    ],
    queryFn: () => getAllGuestbook(session?.accessToken, { params }),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const paramsInvitation: any = {
    where: [{ is_delete: false }],
    with: [{ invitation_guest_book_template: true }],
  };

  if (session?.user.role === 'event-client') {
    paramsInvitation.where.push({ id_user: session?.user.id_user });
  }

  const { isLoading: isLoadingInvitation, data: invitation } = useQuery({
    queryKey: ['invitation', code_invitation],
    queryFn: () =>
      getInvitation(session?.accessToken, {
        id: code_invitation,
        params: paramsInvitation,
      }),
  });

  // Effect
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

  const handleType = ({ target }) => {
    setPage(1);
    if (target.value === 'all') {
      setType(['vip', 'keluarga', 'biasa']);
    } else {
      setType(target.value);
    }
  };

  const handleSend = ({ target }) => {
    setPage(1);
    if (target.value === 'all') {
      setSend([true, false]);
    } else {
      setSend(target.value);
    }
  };

  return (
    <ContainerClient type={'invitation'} title={'Buku Tamu'}>
      <Box bg={'gray.50'} minH={'calc(100vh - 65px)'}>
        <Container maxW={'8xl'} pb={8}>
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
                <GridItem colSpan={{ base: 12, md: 2 }}>
                  <Select bg={'white'} onChange={handleType}>
                    <option value="all">Semua</option>
                    <option value="vip">VIP</option>
                    <option value="keluarga">Keluarga</option>
                    <option value="biasa">Biasa</option>
                  </Select>
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 2 }}>
                  <Select bg={'white'} onChange={handleSend}>
                    <option value="all">Semua</option>
                    <option value="true">Terkirim</option>
                    <option value="false">Belum Terkirim</option>
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
                                <Heading as={'h5'} size="sm">
                                  {res.name}
                                </Heading>

                                {res.is_send ? (
                                  <Badge colorScheme="green">Terkirim</Badge>
                                ) : (
                                  <Badge colorScheme="red">
                                    Belum Terkirim
                                  </Badge>
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
                                {res.address ? res.address : '-'}
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
                                    display={{ base: 'none', md: 'block' }}
                                    size={'xs'}
                                    variant="outline"
                                    colorScheme="teal"
                                    rightIcon={<MdArrowForward />}
                                    onClick={() => {
                                      setGuest(res.name);
                                    }}
                                  >
                                    Lihat Pesan
                                  </Button>

                                  <Button
                                    display={{ base: 'block', md: 'none' }}
                                    size={'xs'}
                                    variant="outline"
                                    colorScheme="teal"
                                    rightIcon={<MdArrowForward />}
                                    onClick={() => {
                                      setGuest(res.name);
                                      onOpen();
                                    }}
                                  >
                                    Lihat Pesan
                                  </Button>
                                </HStack>

                                <HStack spacing="16px">
                                  <GuestbookSend
                                    id={res.id_invitation_guest_book}
                                    isSend={res.is_send}
                                  />
                                </HStack>
                              </Flex>
                            </CardBody>
                          </Card>
                        ))}
                      </Stack>
                      <Pagination
                        perPageItems={perPageItems}
                        pagination={guestbook.pagination}
                        perPage={perPage}
                        page={page}
                        onPerPage={(e) => setPerPage(Number(e))}
                        onPage={(e) => setPage(Number(e))}
                      />
                    </>
                  )}
                </Fragment>
              )}
            </Flex>

            {/* Sidebar */}
            <Box
              display={{ base: 'none', md: 'block' }}
              w={{ base: 0, md: '300px', lg: '435px', xl: '570px' }}
            >
              <Box
                position={'fixed'}
                display={'inline-block'}
                w={'inherit'}
                maxW={'inherit'}
                h={'calc(100vh - 65px)'}
              >
                {isLoadingInvitation ? (
                  <Box>Loading...</Box>
                ) : (
                  <GuestbookMessage
                    id={invitation.template.id_invitation_guest_book_template}
                    guest={guest}
                  />
                )}
              </Box>
            </Box>

            {/* Drawer */}
            <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Pesan</DrawerHeader>

                <DrawerBody py={6}>
                  {isLoadingInvitation ? (
                    <Box>Loading...</Box>
                  ) : (
                    <GuestbookMessage
                      id={invitation.template.id_invitation_guest_book_template}
                      guest={guest}
                    />
                  )}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
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

export default Guestbook;
