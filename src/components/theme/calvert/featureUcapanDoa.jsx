import React, { useState } from 'react';
import _ from 'lodash';
import {
  Container,
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function FeatureUcapanDoa({ ...props }) {
  const [data, setData] = useState(props.data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  // Form ======================================================================
  const initialValues = {
    name: '',
    greeting: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Must be filled.'),
    greeting: Yup.string().required('Must be filled.'),
  });

  async function onSubmit(fields) {
    const input = fields;

    let id;
    let url;
    if (props.options.from === 'theme') {
      id = 'id_theme';
      url = 'theme-greeting';
    } else {
      id = 'id_invitation';
      url = 'invitation-greeting';
    }

    _.assign(input, { [id]: props.options.id });

    const res = await fetch(`/api/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const resData = await res.json();

    if (resData.error === 1) {
      setData([input, ...data]);
    } else {
      setData([resData.data, ...data]);
    }

    onClose();

    MySwal.fire({
      icon: 'success',
      text: 'Ucapan & Doa terkirim.',
      confirmButtonColor: 'var(--housewarming-party-color-primary)',
    });
  }

  return (
    <>
      <Container h="full" maxW="5xl" centerContent px="4">
        <Box position="relative" h="full" w="full">
          {/* Ucapan Doa Title */}
          <Text fontFamily="Kaushan Script" fontSize="3xl" textAlign="center">
            Greetings
          </Text>

          <Box mt="6" textAlign="center">
            <Button
              bg={'var(--housewarming-party-color-primary)'}
              color="white"
              size="md"
              borderRadius="20px"
              _hover={{ bg: 'blue.600' }}
              fontWeight="normal"
              px="6"
              onClick={onOpen}
              role={'button'}
            >
              Give Words
            </Button>

            <Modal
              initialFocusRef={initialRef}
              onClose={onClose}
              isOpen={isOpen}
              size={'xl'}
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Give Words</ModalHeader>
                <ModalCloseButton />
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(props) => (
                    <Form>
                      <ModalBody>
                        <Box mb={4}>
                          <Field name="name">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                                isRequired
                              >
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input
                                  ref={initialRef}
                                  {...field}
                                  id="name"
                                  placeholder="Name"
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
                          <Field name="greeting">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.greeting && form.touched.greeting
                                }
                                isRequired
                              >
                                <FormLabel htmlFor="greeting">Words</FormLabel>
                                <Textarea
                                  {...field}
                                  id="greeting"
                                  placeholder="Words"
                                  rows={10}
                                />
                                <FormErrorMessage>
                                  {form.errors.greeting}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          mr={3}
                          bg={'white'}
                          color={'var(--housewarming-party-color-body)'}
                          border={'2px'}
                          borderColor={
                            'var(--housewarming-party-color-primary)'
                          }
                          borderRadius={'20px'}
                          px={8}
                          _hover={{
                            bg: 'var(--housewarming-party-color-primary)',
                            color: 'white',
                          }}
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          bg={'var(--housewarming-party-color-primary)'}
                          color="white"
                          size="md"
                          borderRadius="20px"
                          _hover={{ bg: 'blue.600' }}
                          fontWeight="normal"
                          px="6"
                          isLoading={props.isSubmitting}
                          type="submit"
                          role="button"
                        >
                          Save
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              </ModalContent>
            </Modal>
          </Box>

          {data.length > 0 ? (
            <Box
              mt="12"
              mb={{ base: 0, md: 12 }}
              height={'500'}
              overflowY={'scroll'}
              p={4}
            >
              {data.map((item, i) => (
                <Box
                  key={i}
                  mb={4}
                  bgColor={'white'}
                  border={'1px'}
                  borderColor={'gray.100'}
                  borderRadius={'lg'}
                  py={4}
                  px={6}
                  boxShadow={'lg'}
                >
                  <Text fontSize={'lg'} fontWeight={'bold'} mb={2}>
                    {item.name}
                  </Text>
                  <Text whiteSpace={'pre-wrap'}>{item.greeting}</Text>
                </Box>
              ))}
            </Box>
          ) : (
            <Box mt="12" />
          )}
        </Box>
      </Container>
    </>
  );
}

export default FeatureUcapanDoa;
