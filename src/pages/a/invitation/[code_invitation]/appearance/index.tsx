import { Fragment, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import EmptyList from '@/components/global/emptyList';
import PreviewDevice from '@/components/global/previewDevice';
import AppearanceForm from '@/components/specific/appearance/appearanceForm';
import { getAllAppearance, updateAppearanceFeature } from '@/libs/fetchQuery';
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Stack,
  Switch,
} from '@chakra-ui/react';
import { MdWeb } from 'react-icons/md';

const Appearance = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Settings
  const queryClient = useQueryClient();
  const router = useRouter();
  const { code_invitation } = router.query;

  // State
  const [random, setRandom] = useState(0);

  // Get Data
  const params = {
    code: code_invitation,
  };
  const { isLoading, data: appearance } = useQuery({
    queryKey: ['appearance'],
    queryFn: () => getAllAppearance(session?.accessToken, { params }),
  });

  const mutationFeature = useMutation({
    mutationFn: (body: any) =>
      updateAppearanceFeature(session?.accessToken, {
        id: body.id_invitation_feature,
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appearance'] });
      resetIframe();
    },
  });

  // Action
  const resetIframe = () => {
    setRandom(random + 1);
  };

  const changeFeatureActive = (fields) => {
    mutationFeature.mutate(fields);
  };

  return (
    <ContainerClient type={'invitation'} title={'Tampilan'}>
      <Box bg={'gray.50'} minH={'calc(100vh - 65px)'}>
        <Container maxW={'8xl'} pb={8}>
          <Flex>
            {/* Main */}
            <Flex flex={'1 0 0%'} flexDir={'column'} gap={4} py={8}>
              {/* Header */}
              <Heading as={'h3'} size={'lg'} mb={4}>
                Tampilan
              </Heading>

              {/* List */}
              {isLoading ? (
                <SkeletonList />
              ) : (
                <Fragment>
                  {isEmpty(appearance.data) ? (
                    <EmptyList label={'Tampilan'} icon={<MdWeb size={30} />} />
                  ) : (
                    <>
                      <Stack spacing="60px">
                        {appearance.data.map((res, index) => (
                          <Box key={index}>
                            <Flex
                              justifyContent={'space-between'}
                              alignItems={'center'}
                              mb={4}
                            >
                              <Heading as={'h4'} size={'md'}>
                                {res.label}
                              </Heading>

                              <Switch
                                colorScheme="pink"
                                defaultChecked={res.is_active}
                                onChange={(e) =>
                                  changeFeatureActive({
                                    id_invitation_feature:
                                      res.id_invitation_feature,
                                    is_active: e.target.checked,
                                  })
                                }
                              />
                            </Flex>
                            <Card variant={'outline'} bg={'white'}>
                              <CardBody>
                                {res.data.map((dat, index) => (
                                  <Box key={index} mb={4}>
                                    <AppearanceForm data={dat} />
                                  </Box>
                                ))}
                              </CardBody>
                            </Card>
                          </Box>
                        ))}
                      </Stack>
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
                <Box
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
                      key={random}
                      src={`/wedding/${code_invitation}?scroll=false`}
                    />
                  </PreviewDevice>
                </Box>
              </Box>
            </Box>
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

export default Appearance;
