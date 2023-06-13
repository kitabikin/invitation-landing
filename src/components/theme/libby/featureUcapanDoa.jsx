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
import ButtonSolid from '@/components/theme/libby/buttonSolid';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { reduceFeature } from '@/libs/utils';

const MySwal = withReactContent(Swal);

function FeatureUcapanDoa({ ...props }) {
  const [data, setData] = useState(props.data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  // Get Data ==================================================================
  // Ucapan Doa
  const codeUcapanDoa = `${props.options.code}-ucapanDoa`;
  const ucapanDoa = reduceFeature(props.feature[codeUcapanDoa].column);
  const { [`${codeUcapanDoa}-title`]: ucapanDoaTitle } = ucapanDoa;

  // Form ======================================================================
  const initialValues = {
    name: '',
    greeting: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Harus diisi.'),
    greeting: Yup.string().required('Harus diisi.'),
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
      confirmButtonColor: 'var(--libby-color-primary)',
    });
  }

  return (
    <>
      <Container h="full" maxW="5xl" centerContent px="4">
        <Box position="relative" h="full" w="full">
          {/* Ucapan Doa Title */}
          {ucapanDoaTitle && ucapanDoaTitle.is_active && (
            <Text
              fontFamily="var(--libby-font-title)"
              fontSize="3xl"
              textAlign="center"
            >
              {ucapanDoaTitle.value}
            </Text>
          )}

          <Box mt="6" textAlign="center">
            <ButtonSolid onClick={onOpen} role={'button'}>
              Berikan Ucapan & Doa
            </ButtonSolid>

            <Modal
              initialFocusRef={initialRef}
              onClose={onClose}
              isOpen={isOpen}
              size={'xl'}
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Berikan Ucapan & Doa</ModalHeader>
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
                                <FormLabel htmlFor="name">Nama</FormLabel>
                                <Input
                                  ref={initialRef}
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
                          <Field name="greeting">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.greeting && form.touched.greeting
                                }
                                isRequired
                              >
                                <FormLabel htmlFor="greeting">
                                  Ucapan & Doa
                                </FormLabel>
                                <Textarea
                                  {...field}
                                  id="greeting"
                                  placeholder="Ucapan & Doa"
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
                          color={'var(--libby-color-body)'}
                          border={'2px'}
                          borderColor={'var(--libby-color-primary)'}
                          px={8}
                          _hover={{
                            bg: 'var(--libby-color-primary)',
                            color: 'white',
                          }}
                          onClick={onClose}
                        >
                          Batal
                        </Button>
                        <ButtonSolid
                          isLoading={props.isSubmitting}
                          type="submit"
                          role="button"
                        >
                          Simpan
                        </ButtonSolid>
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
