import _ from 'lodash';
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
  Grid,
  GridItem,
  Select,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  calc,
} from '@chakra-ui/react';
import { MdMenuBook } from 'react-icons/md';
import ContainerClient from '@/layouts/container/containerClient';
import PreviewDevice from '@/components/global/previewDevice';
import { User } from '@/pages/api/user';
import useGuestbook from '@/libs/useGuestbook';

import { InferGetServerSidePropsType } from 'next';

const Guestbook = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const params = {
    where: [
      { 'invitation:id_user': user.id_user },
      { is_delete: false },
      { from: 'admin' },
    ],
    with: [{ invitation: true }, { parrent: true }],
  };

  const { guestbook, isLoading } = useGuestbook(user, { params });

  const template = `Bismillahirrahmanirrahim, 
Turut mengundang teman-teman, sahabat, dan keluarga untuk hadir dalam acara pernikahan Kami:
  `;

  return (
    <ContainerClient title="Buku Tamu">
      <Box bg={'gray.50'} minH={'100vh'}>
        <Container maxW={'8xl'}>
          <Flex>
            <Box flex={'1 0 0%'} py={8}>
              <Flex
                flexDir={{ base: 'column', md: 'row' }}
                alignItems={'flex-start'}
                justifyContent={'space-between'}
                gap={4}
                mb={6}
              >
                <Heading as={'h4'} size={'md'}>
                  Buku Tamu
                </Heading>
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
                  {_.isEmpty(guestbook.data) && (
                    <Card variant={'outline'} bg={'white'} mb={4}>
                      <CardBody>
                        <Flex
                          flexDir={'column'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          textAlign={'center'}
                          gap={2}
                        >
                          <MdMenuBook size={30} />
                          <Heading size="xs">
                            Maaf, Anda belum memiliki data yang dapat diakses.
                          </Heading>
                        </Flex>
                      </CardBody>
                    </Card>
                  )}

                  {!_.isEmpty(guestbook.data) &&
                    guestbook.data.map((res, index) => (
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
                            </Flex>
                          </Box>
                        </CardBody>
                      </Card>
                    ))}
                </Stack>
              )}
            </Box>

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
                <Flex
                  alignItems={'center'}
                  justifyContent={'center'}
                  h={'full'}
                >
                  <Box
                    pos={'relative'}
                    w={352}
                    borderRadius={'xl'}
                    bg={'green.200'}
                    _after={{
                      content: "''",
                      position: 'absolute',
                      width: 0,
                      height: 0,
                      top: '30px',
                      right: 'auto',
                      bottom: 'auto',
                      left: '-20px',
                      border: '12px solid',
                      borderTopColor: 'green.200',
                      borderRightColor: 'green.200',
                      borderBottomColor: 'transparent',
                      borderLeftColor: 'transparent',
                    }}
                  >
                    <Box p={4} whiteSpace={'pre-wrap'} fontSize={'sm'}>
                      {template}
                    </Box>
                  </Box>
                </Flex>
                {/* <Box
                  pos={'absolute'}
                  top={'50%'}
                  left={'50%'}
                  transform={'translateY(-50%) translate(-50%)'}
                >
                  <PreviewDevice>
                    <Box
                      as={'iframe'}
                      h={'full'}
                      w={'full'}
                      src="/event/wedding/hazel?scroll=false"
                    />
                  </PreviewDevice>
                </Box> */}
              </Box>
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
