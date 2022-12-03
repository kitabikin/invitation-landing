import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import SkeletonList from '@/components/global/skeletonList';
import { getGuestbook, updateGuestbook } from '@/libs/fetchQuery';
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Edit = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Settings
  const queryClient = useQueryClient();
  const router = useRouter();
  const { code_invitation, id_invitation_guest_book } = router.query;

  // Get Data
  const { isLoading, data: guestbook } = useQuery({
    queryKey: ['guestbook', id_invitation_guest_book],
    queryFn: () =>
      getGuestbook(session?.accessToken, { id: id_invitation_guest_book }),
  });

  const mutation = useMutation({
    mutationFn: (body: any) =>
      updateGuestbook(session?.accessToken, {
        id: id_invitation_guest_book,
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['guestbook']);
    },
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Harus diisi.'),
    address: Yup.string(),
    no_telp: Yup.string(),
    type: Yup.string().required('Harus diisi.'),
    session: Yup.number().required('Harus diisi.'),
  });

  async function onSubmit(fields) {
    mutation.mutate(fields);

    router.push(`/a/invitation/${code_invitation}/guestbook`);
  }

  return (
    <ContainerClient type={'invitation'} title={'Ubah Buku Tamu'}>
      <Box bg={'gray.50'} minH={'100vh'}>
        <Container maxW={'4xl'}>
          <Flex flexDir={'column'} gap={4} py={8}>
            <Heading as={'h3'} size={'lg'} mb={4}>
              Ubah Buku Tamu
            </Heading>

            {isLoading ? (
              <SkeletonList />
            ) : (
              <Card variant={'outline'} bg={'white'}>
                <CardBody>
                  <Formik
                    initialValues={{
                      name: guestbook.name,
                      address: guestbook.address,
                      no_telp: guestbook.no_telp,
                      type: guestbook.type,
                      session: guestbook.session,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {(props) => (
                      <Form>
                        <Box mb={4}>
                          <Field name="name">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                                isRequired
                              >
                                <FormLabel htmlFor="name" id="name">
                                  Nama
                                </FormLabel>
                                <Input
                                  {...field}
                                  id="name"
                                  placeholder="Nama"
                                  autoComplete="off"
                                  variant="filled"
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>

                        <Box mb={4}>
                          <Field name="address">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.address && form.touched.address
                                }
                              >
                                <FormLabel htmlFor="address" id="address">
                                  Alamat
                                </FormLabel>
                                <Textarea
                                  {...field}
                                  id="address"
                                  placeholder="Alamat"
                                  variant="filled"
                                />
                                <FormErrorMessage>
                                  {form.errors.address}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>

                        <Box mb={4}>
                          <Field name="no_telp">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.no_telp && form.touched.no_telp
                                }
                              >
                                <FormLabel htmlFor="no_telp" id="no_telp">
                                  No. Telepon
                                </FormLabel>
                                <Input
                                  {...field}
                                  id="no_telp"
                                  placeholder="No. Telepon"
                                  variant="filled"
                                />
                                <FormErrorMessage>
                                  {form.errors.no_telp}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>

                        <Box mb={4}>
                          <Field name="type">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.type && form.touched.type
                                }
                                isRequired
                              >
                                <FormLabel htmlFor="type" id="type">
                                  Jenis Tamu
                                </FormLabel>
                                <Select
                                  {...field}
                                  id="type"
                                  placeholder="Jenis Tamu"
                                  variant="filled"
                                >
                                  <option value="vip">VIP</option>
                                  <option value="keluarga">Keluarga</option>
                                  <option value="biasa">Biasa</option>
                                </Select>
                                <FormErrorMessage>
                                  {form.errors.type}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>

                        <Box mb={4}>
                          <Field name="session">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.session && form.touched.session
                                }
                                isRequired
                              >
                                <FormLabel htmlFor="session" id="session">
                                  Sesi
                                </FormLabel>
                                <NumberInput
                                  defaultValue={guestbook.session}
                                  min={1}
                                  max={5}
                                  variant="filled"
                                >
                                  <NumberInputField
                                    {...field}
                                    id="session"
                                    placeholder="Sesi"
                                  />
                                  <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                  </NumberInputStepper>
                                </NumberInput>
                                <FormErrorMessage>
                                  {form.errors.session}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>

                        <Box display={'grid'}>
                          <Button colorScheme={'pink'} type="submit">
                            Simpan
                          </Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
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

export default Edit;
