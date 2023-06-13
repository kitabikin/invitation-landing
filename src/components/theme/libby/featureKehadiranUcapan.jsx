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
  SimpleGrid,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
} from '@chakra-ui/react';
import ButtonSolid from '@/components/theme/libby/buttonSolid';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { reduceFeature } from '@/libs/utils';

const MySwal = withReactContent(Swal);

function FeatureKehadiranUcapan({ ...props }) {
  const [qrCode, setQrCode] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get Data ==================================================================
  // Kehadiran Ucapan
  const codeKehadiranUcapan = `${props.options.code}-kehadiranUcapan`;
  const kehadiranUcapan = reduceFeature(
    props.feature[codeKehadiranUcapan].column,
  );
  const { [`${codeKehadiranUcapan}-title`]: kehadiranUcapanTitle } =
    kehadiranUcapan;

  // Form ======================================================================
  const guest = props.options.guest;

  const initialValues = {
    name: guest || '',
    address: '',
    confirmation: '',
    total_reservation: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Harus diisi.'),
    address: Yup.string().required('Harus diisi.'),
    confirmation: Yup.string().required('Harus diisi.'),
    total_reservation: Yup.number().required('Harus diisi.'),
  });

  async function onSubmit(fields) {
    const input = fields;

    let id;
    let url;
    if (props.options.from === 'theme') {
      id = 'id_theme';
      url = 'theme-guest-book';
    } else {
      id = 'id_invitation';
      url = 'invitation-guest-book';
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
      MySwal.fire({
        icon: 'error',
        text: 'Terjadi kesalahan.',
        confirmButtonColor: 'var(--libby-color-primary)',
      });
    } else {
      if (resData.data.confirmation === 'no') {
        MySwal.fire({
          icon: 'success',
          text: 'Terimakasih atas konfirmasinya.',
          confirmButtonColor: 'var(--libby-color-primary)',
        });
      } else {
        setQrCode(resData.data.qr_code);
        onOpen();
      }
    }
  }

  return (
    <>
      <Container h="full" maxW="2xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {kehadiranUcapanTitle && kehadiranUcapanTitle.is_active && (
            <Text fontFamily="var(--libby-font-title)" fontSize="3xl">
              {kehadiranUcapanTitle.value}
            </Text>
          )}

          <Box mt="6">
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
                          isReadOnly={guest === 'Tamu Undangan' ? false : true}
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
                          isRequired
                        >
                          <FormLabel htmlFor="address" id="address">
                            Alamat
                          </FormLabel>
                          <Textarea
                            {...field}
                            id="address"
                            placeholder="Alamat"
                            rows={2}
                          />
                          <FormErrorMessage>
                            {form.errors.address}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <SimpleGrid
                    columns={{ base: '1', md: '2' }}
                    spacing={4}
                    mb={5}
                  >
                    <Box>
                      <Field name="confirmation">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.confirmation &&
                              form.touched.confirmation
                            }
                            isRequired
                          >
                            <FormLabel htmlFor="confirmation" id="confirmation">
                              Konfirmasi Kehadiran
                            </FormLabel>
                            <Select
                              {...field}
                              id="confirmation"
                              placeholder="Konfirmasi Kehadiran"
                            >
                              <option value="yes">Hadir</option>
                              <option value="no">Tidak Hadir</option>
                            </Select>
                            <FormErrorMessage>
                              {form.errors.confirmation}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="total_reservation">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.total_reservation &&
                              form.touched.total_reservation
                            }
                            isRequired
                          >
                            <FormLabel
                              htmlFor="total_reservation"
                              id="total_reservation"
                            >
                              Jumlah Reservasi
                            </FormLabel>
                            <NumberInput max={100} min={0}>
                              <NumberInputField
                                {...field}
                                id="total_reservation"
                                placeholder="Jumlah Reservasi"
                              />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <FormErrorMessage>
                              {form.errors.total_reservation}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </SimpleGrid>

                  <ButtonSolid
                    w="full"
                    isLoading={props.isSubmitting}
                    type="submit"
                    role={'button'}
                  >
                    Kirim
                  </ButtonSolid>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>

      <Modal onClose={onClose} isOpen={isOpen} size={'xl'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konfirmasi Kehadiran</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box d={'flex'} justifyContent={'center'}>
              <Image
                src={qrCode}
                fallbackSrc="https://via.placeholder.com/250"
                alt="QR Code"
              />
            </Box>
            <Text textAlign={'center'}>
              Simpan QR Code untuk masuk ke tempat acara.
            </Text>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FeatureKehadiranUcapan;
