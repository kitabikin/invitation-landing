import { Fragment, useEffect, useMemo, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import { useQuery } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import GuestbookSend from '@/components/specific/guestbook/guestbookSend';
import GuestbookMessage from '@/components/specific/guestbook/guestbookMessage';
import { User } from '@/pages/api/user';
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
  const [guest, setGuest] = useState('Tamu Undangan');
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    queryKey: ['guestbook', search, type, send],
    queryFn: () => getAllGuestbook(user, { params }),
  });

  const paramsInvitation = {
    where: [{ id_user: user.id_user }, { is_delete: false }],
    with: [{ invitation_guest_book_template: true }],
  };
  const { isLoading: isLoadingInvitation, data: invitation } = useQuery({
    queryKey: ['invitation', code_invitation],
    queryFn: () =>
      getInvitation(user, { id: code_invitation, params: paramsInvitation }),
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
                              <Heading as={'h5'} size="sm">
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
                    user={user}
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
                      user={user}
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
