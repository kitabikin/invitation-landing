import { Fragment, useEffect, useMemo, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import { useQuery } from '@tanstack/react-query';

import site from '@/config/site';
import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import { User } from '@/pages/api/user';
import { getAllInvitation } from '@/libs/fetchQuery';
import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { MdEmail, MdSearch, MdEvent, MdWeb } from 'react-icons/md';

const Invitation = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Settings
  const siteUrl = site.siteUrl.replace(/^https?:\/\//, '');

  // State
  const [search, setSearch] = useState('');

  // Get Invitation
  const params = {
    where: [{ id_user: user.id_user }, { is_delete: false }],
    with: [
      { event: true },
      { theme: true },
      { invitation_guest_book_template: true },
    ],
    search,
  };
  const { isLoading, data: invitation } = useQuery({
    queryKey: ['invitation', search],
    queryFn: () => getAllInvitation(user, { params }),
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

  return (
    <ContainerClient title={'Undangan'}>
      <Box bg={'gray.50'} minH={'100vh'}>
        <Container maxW={'8xl'}>
          <Flex flexDir={'column'} gap={4} py={8}>
            {/* Filter */}
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

            {/* List */}
            {isLoading ? (
              <SimpleGrid columns={3} spacing={4}>
                {[0, 1, 3].map((_, index) => (
                  <SkeletonList key={index} />
                ))}
              </SimpleGrid>
            ) : (
              <Fragment>
                {_.isEmpty(invitation) ? (
                  <EmptyList label={'Undangan'} icon={<MdEmail size={30} />} />
                ) : (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {invitation.map((res, index) => (
                      <NextLink
                        key={index}
                        href={`/a/invitation/${res.code}/analytics`}
                        passHref
                      >
                        <Card
                          as={Link}
                          variant={'outline'}
                          bg={'white'}
                          _hover={{
                            textDecoration: 'none',
                            borderColor: 'pink.300',
                          }}
                        >
                          <CardBody p={6}>
                            <Heading
                              as={'h5'}
                              size="sm"
                              textTransform="uppercase"
                              mb={1}
                            >
                              {res.name}
                            </Heading>

                            <Text fontSize={'sm'}>
                              {`${siteUrl}/${res.event.code}/${res.code}`}
                            </Text>

                            <Flex
                              flexDir={{ base: 'column', md: 'row' }}
                              gap={{ base: 2, md: 6 }}
                              mt={4}
                            >
                              <Tooltip
                                hasArrow
                                placement="top"
                                label="Acara"
                                aria-label="Acara"
                              >
                                <Flex
                                  alignItems={'center'}
                                  gap={2}
                                  color={'blue.300'}
                                >
                                  <MdEvent size={20} />
                                  <Text fontSize="sm" color={'gray.600'}>
                                    {res.event.name}
                                  </Text>
                                </Flex>
                              </Tooltip>
                              <Tooltip
                                hasArrow
                                placement="top"
                                label="Tema"
                                aria-label="Tema"
                              >
                                <Flex
                                  alignItems={'center'}
                                  gap={2}
                                  color={'pink.300'}
                                >
                                  <MdWeb size={20} />
                                  <Text fontSize="sm" color={'gray.600'}>
                                    {res.theme.name}
                                  </Text>
                                </Flex>
                              </Tooltip>
                            </Flex>
                          </CardBody>
                        </Card>
                      </NextLink>
                    ))}
                  </SimpleGrid>
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

export default Invitation;
