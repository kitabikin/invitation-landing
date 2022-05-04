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
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MySwal = withReactContent(Swal);

function FeatureUcapanDoa({ ...props }) {
  const [data, setData] = useState(props.data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`;
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {},
  );
  const {
    [`${codeGeneral}-colorPrimary`]: generalColorPrimary,
    [`${codeGeneral}-colorSecondary`]: generalColorSecondary,
  } = general;

  // Ucapan Doa
  const codeUcapanDoa = `${props.options.code}-ucapanDoa`;
  const ucapanDoa = props.feature[codeUcapanDoa].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {},
  );
  const {
    [`${codeUcapanDoa}-title`]: ucapanDoaTitle,
    [`${codeUcapanDoa}-instagram`]: ucapanDoaInstagram,
  } = ucapanDoa;

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
      confirmButtonColor: generalColorPrimary.value,
    });
  }

  return (
    <>
      <Container h="full" maxW="5xl" centerContent pb="28" px="4">
        <Box position="relative" h="full" w="full">
          {/* Ucapan Doa Title */}
          {ucapanDoaTitle && ucapanDoaTitle.is_active && (
            <Text
              fontFamily="nashvilleHeading"
              fontSize="3xl"
              textAlign="center"
            >
              {ucapanDoaTitle.value}
            </Text>
          )}

          <Box mt="6" textAlign="center">
            <Button
              bg={generalColorPrimary.value}
              color="white"
              size="sm"
              borderRadius="20px"
              _hover={{ bg: generalColorSecondary.value }}
              onClick={onOpen}
              fontWeight="normal"
              px="6"
            >
              Berikan Ucapan & Doa
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
                          mr="3"
                          bg="white"
                          size="sm"
                          color="black"
                          border="2px"
                          borderColor={generalColorPrimary.value}
                          borderRadius="20px"
                          _hover={{ bg: generalColorPrimary.value }}
                          fontWeight="normal"
                          px="6"
                          onClick={onClose}
                        >
                          Batal
                        </Button>
                        <Button
                          bg={generalColorPrimary.value}
                          color="white"
                          size="sm"
                          borderRadius="20px"
                          _hover={{ bg: generalColorSecondary.value }}
                          fontWeight="normal"
                          px="6"
                          isLoading={props.isSubmitting}
                          type="submit"
                        >
                          Simpan
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              </ModalContent>
            </Modal>
          </Box>

          <Box mt="12" height={'500'} overflowY={'scroll'} p={4}>
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

          {/* <Box
            mt="12"
            sx={{ '--swiper-theme-color': generalColorPrimary.value }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              autoHeight={true}
              navigation
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="swiper-greeting"
            >
              {data.map((item, i) => (
                <SwiperSlide key={i}>
                  <Box
                    h="full"
                    d="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pb={'50px'}
                    px={'75px'}
                  >
                    <Text fontSize={'xl'} fontWeight={'bold'} mb={4}>
                      {item.name}
                    </Text>
                    <Text whiteSpace={'pre-wrap'}>{item.greeting}</Text>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box> */}
        </Box>
      </Container>
    </>
  );
}

export default FeatureUcapanDoa;
