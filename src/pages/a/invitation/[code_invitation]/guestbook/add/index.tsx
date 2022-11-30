import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/libs/session';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import ContainerClient from '@/layouts/container/containerClient';
import { User } from '@/pages/api/user';
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
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Add = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Settings
  const queryClient = useQueryClient();
  const router = useRouter();
  const { code_invitation } = router.query;

  // Get Data
  const { isLoading, data: invitation } = useQuery({
    queryKey: ['invitation', code_invitation],
    queryFn: () => getInvitation(user, { id: code_invitation }),
  });

  const mutation = useMutation({
    mutationFn: (body: any) => createGuestbook(user, { body }),
    onSuccess: () => {
      queryClient.invalidateQueries(['guestbook']);
    },
  });

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
                              <NumberInput min={1} max={5}>
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

export default Add;
