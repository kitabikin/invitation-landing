import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import { signIn, getCsrfToken } from 'next-auth/react';

import ContainerBlank from '@/layouts/container/containerBlank';
import {
  Container,
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import site from '@/config/site';

function Login({ csrfToken }) {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Harus diisi.'),
    password: Yup.string().required('Harus diisi.'),
  });

  async function onSubmit(fields, { setSubmitting }) {
    const res = await signIn('credentials', {
      redirect: false,
      username: fields.username,
      password: fields.password,
      application: 'invitation',
      callbackUrl: `${window.location.origin}/a/invitation`,
    });

    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      setErrorMsg(null);
    }

    if (res.url) router.push(res.url);

    setSubmitting(false);
  }

  return (
    <ContainerBlank
      title={`Masuk | ${site.title}`}
      description={'Deskripsi Masuk'}
    >
      <Box bg={'white'} w={'full'} h={'100vh'}>
        <Container
          maxW={'md'}
          h={'full'}
          display={'flex'}
          justifyContent={'center'}
          flexDir={'column'}
        >
          <Box mb={4}>
            <NextLink href="/">
              <Image
                src={'/images/logo/logo36x36.png'}
                width={32}
                height={32}
                alt={'Kitabikin Undangan'}
              />
            </NextLink>
          </Box>

          <Box mb={8}>
            <Heading as={'h2'} size={'xl'} mb={2}>
              Masuk
            </Heading>
            <Text fontSize="sm" color={'gray.600'}>
              Masukkan username dan password Anda untuk melanjutkan.
            </Text>
          </Box>

          {errorMsg && (
            <Alert status="error" mb={8}>
              <AlertIcon />
              {errorMsg}
            </Alert>
          )}

          <Box mb={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />

                  <Box mb={4}>
                    <Field name="username">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.username && form.touched.username
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="username" id="username">
                            Username
                          </FormLabel>
                          <Input
                            {...field}
                            id="username"
                            placeholder="Username"
                            autoComplete="off"
                          />
                          <FormErrorMessage>
                            {form.errors.username}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Box mb={4}>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="password" id="password">
                            Password
                          </FormLabel>
                          <InputGroup size="md">
                            <Input
                              {...field}
                              pr="4.5rem"
                              type={show ? 'text' : 'password'}
                              placeholder="Password"
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => setShow(!show)}
                              >
                                {show ? 'Hide' : 'Show'}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Box display={'grid'}>
                    <Button
                      colorScheme={'pink'}
                      type="submit"
                      isLoading={isSubmitting ? true : false}
                      loadingText="Loading..."
                    >
                      Masuk
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Box>
    </ContainerBlank>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
