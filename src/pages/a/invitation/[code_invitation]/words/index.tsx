import { Fragment, useEffect, useMemo, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { assign, isEmpty } from 'lodash';
import debounce from 'lodash/debounce';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import { getAllGreeting } from '@/libs/fetchQuery';
import {
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
} from '@chakra-ui/react';
import { MdSearch, MdMessage } from 'react-icons/md';

const Words = ({
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

  // Get Greeting
  const params: any = {
    where: [
      { is_active: true },
      { is_delete: false },
      { 'invitation:code': code_invitation },
    ],
    with: [{ invitation: true }],
    search,
    sort,
    page,
  };

  if (session?.user.role === 'event-client') {
    params.where.push({ 'invitation:id_user': session?.user.id_user });
  }

  const {
    isLoading,
    data: greeting,
    isPreviousData,
  } = useQuery({
    queryKey: ['greeting', code_invitation, page, sort, search],
    queryFn: () => getAllGreeting(session?.accessToken, { params }),
    keepPreviousData: true,
    staleTime: 5000,
  });

  // Effect
  useEffect(() => {
    if (!isPreviousData && greeting?.hasMore) {
      queryClient.prefetchQuery(
        ['greeting', code_invitation, page + 1, sort, search],
        () => {
          assign(params, {
            page: page + 1,
          });
          return getAllGreeting(session?.accessToken, { params });
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [greeting, isPreviousData, sort, page, search, queryClient]);

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

  return (
    <ContainerClient type={'invitation'} title={'Ucapan & Doa'}>
      <Box bg={'gray.50'} minH={'calc(100vh - 65px)'}>
        <Container maxW={'8xl'} pb={8}>
          <Flex flexDir={'column'} gap={4} py={8}>
            {/* Header */}
            <Heading as={'h3'} size={'lg'} mb={4}>
              Ucapan & Doa
            </Heading>

            {/* Filter */}
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
              <GridItem colSpan={{ base: 12, md: 10 }}>
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
                {isEmpty(greeting.data) ? (
                  <EmptyList
                    label={'Ucapan & Doa'}
                    icon={<MdMessage size={30} />}
                  />
                ) : (
                  <>
                    <Stack>
                      {greeting.data.map((res, index) => (
                        <Card key={index} variant={'outline'} bg={'white'}>
                          <CardBody>
                            <Heading as={'h5'} size="sm" mb={3}>
                              {res.name}
                            </Heading>
                            <Text fontSize="sm" whiteSpace={'pre-wrap'}>
                              {res.greeting}
                            </Text>
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
                          setPage((old) => (greeting?.hasMore ? old + 1 : old));
                        }}
                        disabled={isPreviousData || !greeting?.hasMore}
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
        destination: '/login',
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

export default Words;
