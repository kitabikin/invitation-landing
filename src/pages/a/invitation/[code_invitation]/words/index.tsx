import { Fragment, useEffect, useMemo, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import { User } from '@/pages/api/user';
import useGreeting from '@/libs/useGreeting';
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
  Stack,
  Text,
} from '@chakra-ui/react';
import { MdSearch, MdMessage } from 'react-icons/md';

const Words = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Settings
  const router = useRouter();
  const { code_invitation } = router.query;

  // State
  const [search, setSearch] = useState('');

  // Get Greeting
  const params = {
    where: [
      { is_active: true },
      { is_delete: false },
      { 'invitation:code': code_invitation },
      { 'invitation:id_user': user.id_user },
    ],
    with: [{ invitation: true }],
    search,
    sort: 'created_at:desc',
  };
  const { greeting, isLoading } = useGreeting(user, { params });

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
    <ContainerClient type={'invitation'} title={'Ucapan & Doa'}>
      <Box bg={'gray.50'} minH={'100vh'}>
        <Container maxW={'8xl'}>
          <Flex flexDir={'column'} gap={4} py={8}>
            {/* Header */}
            <Heading as={'h3'} size={'lg'} mb={4}>
              Ucapan & Doa
            </Heading>

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
              <SkeletonList />
            ) : (
              <Fragment>
                {_.isEmpty(greeting.data) ? (
                  <EmptyList
                    label={'Ucapan & Doa'}
                    icon={<MdMessage size={30} />}
                  />
                ) : (
                  <Stack>
                    {greeting.data.map((res, index) => (
                      <Card key={index} variant={'outline'} bg={'white'}>
                        <CardBody>
                          <Heading
                            as={'h5'}
                            size="sm"
                            textTransform="uppercase"
                            mb={3}
                          >
                            {res.name}
                          </Heading>
                          <Text fontSize="sm" whiteSpace={'pre-wrap'}>
                            {res.greeting}
                          </Text>
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

export default Words;
