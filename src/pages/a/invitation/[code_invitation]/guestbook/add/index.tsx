import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import { verify } from '@/libs/jwtSignVerify';
import { getInvitation, createGuestbook } from '@/libs/fetchQuery';
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
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const Add = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Settings
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();
  const { code_invitation } = router.query;

  // Get Data
  const paramsInvitation: any = {
    where: [{ is_delete: false }],
    with: [{ invitation_guest_book_template: true }],
  };

  if (session?.user.role === 'event-client') {
    paramsInvitation.where.push({ id_user: session?.user.id_user });
  }

  const { isLoading, data: invitation } = useQuery({
    queryKey: ['invitation', code_invitation],
    queryFn: () =>
      getInvitation(session?.accessToken, {
        id: code_invitation,
        params: paramsInvitation,
      }),
  });

  const mutation = useMutation({
    mutationFn: (body: any) => createGuestbook(session?.accessToken, { body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestbook'] });
      queryClient.invalidateQueries({ queryKey: ['total-guestbook-send'] });
      queryClient.invalidateQueries({ queryKey: ['total-guestbook-send-not'] });
      queryClient.invalidateQueries({ queryKey: ['total-guestbook-vip'] });
      queryClient.invalidateQueries({ queryKey: ['total-guestbook-family'] });
      queryClient.invalidateQueries({ queryKey: ['total-guestbook-normal'] });
    },
  });

  if (mutation.isError) {
    toast({
      title: 'Terjadi kesalahan.',
      description: 'Silahkan coba kembali.',
      status: 'error',
      position: 'bottom-left',
      isClosable: true,
    });
  }

  const initialValues = {
    name: '',
    address: '',
    no_telp: '',
    type: '',
    session: 1,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Harus diisi.'),
    address: Yup.string(),
    no_telp: Yup.string(),
    type: Yup.string().required('Harus diisi.'),
    session: Yup.number().required('Harus diisi.'),
  });

  async function onSubmit(fields) {
    mutation.mutate({
      ...fields,
      id_invitation: invitation.id_invitation,
      from: 'admin',
      confirmation: 'notyet',
      total_reservation: null,
      is_active: true,
    });

    router.push(`/a/invitation/${code_invitation}/guestbook`);
  }

  return (
    <ContainerClient type={'invitation'} title={'Tambah Buku Tamu'}>
      <Box bg={'gray.50'} minH={'100vh'}>
        <Container maxW={'4xl'}>
          <Flex flexDir={'column'} gap={4} py={8}>
            <Heading as={'h3'} size={'lg'} mb={4}>
              Tambah Buku Tamu
            </Heading>

            <Card variant={'outline'} bg={'white'}>
              <CardBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(props) => (
                    <Form>
                      <Box mb={4}>
                        <Field name="name">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={form.errors.name && form.touched.name}
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
                              isInvalid={form.errors.type && form.touched.type}
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
                              <NumberInput min={1} max={5} variant="filled">
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
                        <Button
                          colorScheme={'pink'}
                          type="submit"
                          isLoading={mutation.isLoading ? true : false}
                          loadingText="Loading..."
                        >
                          Simpan
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
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

export default Add;
