import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { assign } from 'lodash';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import site from '@/config/site';
import { isValidHttpUrl } from '@/libs/utils';
import {
  updateAppearanceFeature,
  updateAppearanceFeatureData,
} from '@/libs/fetchQuery';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { MdAdd, MdDelete } from 'react-icons/md';

const ikUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const ikPub = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const ikEnd = `${site.siteUrl}/api/auth/imagekit`;

const FormSwitch = ({ label, value, onChangeData }) => {
  return (
    <Switch
      colorScheme="pink"
      defaultChecked={value}
      onChange={(e) =>
        onChangeData({
          is_active: e.target.checked,
        })
      }
    />
  );
};

const FormText = ({ label, value, onChangeData }) => {
  return (
    <Input
      type="text"
      variant="filled"
      placeholder={label}
      defaultValue={value}
      onBlur={(e) =>
        onChangeData({
          value: e.target.value,
        })
      }
    />
  );
};

const FormTextarea = ({ label, value, onChangeData }) => {
  return (
    <Textarea
      variant="filled"
      placeholder={label}
      defaultValue={value}
      onBlur={(e) =>
        onChangeData({
          value: e.target.value,
        })
      }
    />
  );
};

const FormNumber = ({ label, value, onChangeData }) => {
  return (
    <Input
      type="number"
      variant="filled"
      placeholder={label}
      defaultValue={value}
      onBlur={(e) =>
        onChangeData({
          value: e.target.value,
        })
      }
    />
  );
};

const FormDate = ({ label, value, onChangeData }) => {
  return (
    <Input
      type="date"
      variant="filled"
      placeholder={label}
      defaultValue={value}
      onBlur={(e) =>
        onChangeData({
          value: e.target.value,
        })
      }
    />
  );
};

const FormTime = ({ label, value, onChangeData }) => {
  return (
    <Input
      type="time"
      variant="filled"
      placeholder={label}
      defaultValue={value}
      onBlur={(e) =>
        onChangeData({
          value: e.target.value,
        })
      }
    />
  );
};

const FormURL = ({ label, value, onChangeData }) => {
  return (
    <Input
      type="url"
      variant="filled"
      placeholder={label}
      defaultValue={value}
      onBlur={(e) =>
        onChangeData({
          value: e.target.value,
        })
      }
    />
  );
};

const FormColor = ({ label, value, onChangeData }) => {
  return (
    <Input
      type="color"
      variant="filled"
      placeholder={label}
      defaultValue={value}
      onBlur={(e) =>
        onChangeData({
          value: e.target.value,
        })
      }
    />
  );
};

const FormSelect = ({ label, value, options, onChangeData }) => {
  return (
    <Select
      variant="filled"
      placeholder={label}
      defaultValue={value}
      onChange={(e) =>
        onChangeData({
          value: e.target.value,
        })
      }
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

const FormFile = ({ label, value, onChangeData }) => {
  const router = useRouter();
  const { code_invitation } = router.query;

  const inputRefTest = useRef(null);

  const onError = (err) => {
    console.log('Error', err);
  };

  const onSuccess = (res) => {
    onChangeData({
      value: res.url,
    });
  };

  return (
    <Flex gap={4} minW={'300px'}>
      <Flex
        border={1}
        borderStyle={'solid'}
        borderColor={'gray.300'}
        borderRadius={'md'}
        overflow="hidden"
        w={'100px'}
        h={'100px'}
        minW={'100px'}
        minH={'100px'}
      >
        {isValidHttpUrl(value) && (
          <Image
            src={value || 'https://placehold.co/100x100?text=Image'}
            alt={label}
            width={100}
            height={100}
            objectFit={'cover'}
          />
        )}
      </Flex>
      <Box>
        <IKContext
          urlEndpoint={ikUrl}
          publicKey={ikPub}
          authenticationEndpoint={ikEnd}
        >
          <IKUpload
            folder={`/invitation/wedding/${code_invitation}`}
            validateFile={(file) => file.size < 2000000}
            inputRef={inputRefTest}
            style={{ display: 'none' }}
            onError={onError}
            onSuccess={onSuccess}
          />

          {inputRefTest && (
            <Button
              size={'sm'}
              colorScheme={'pink'}
              onClick={() => inputRefTest.current.click()}
            >
              Upload
            </Button>
          )}

          <Text fontSize={'sm'} color={'gray.500'} mt={2}>
            Ukuran maksimal 2 MB. <br />
            File yang didukung adalah .jpg, .jpeg, .png
          </Text>
        </IKContext>
      </Box>
    </Flex>
  );
};

const FormNormalTemplate = ({ children, data, onChangeData }) => {
  return (
    <FormControl>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <FormLabel>{data.label}</FormLabel>

        <FormSwitch
          label={data.label}
          value={data.is_active}
          onChangeData={onChangeData}
        />
      </Flex>
      {children}
    </FormControl>
  );
};

const FormNormal = ({ data, saveData }) => {
  const { configuration } = data;

  const changeData = (fields) => {
    if (data.value === fields.value) {
      return;
    }

    const body = {
      id_theme_feature_column: data.id_theme_feature_column,
      id_invitation_feature_data: data.id_invitation_feature_data,
      ...fields,
    };

    saveData(body);
  };

  return (
    <FormNormalTemplate data={data} onChangeData={changeData}>
      {(() => {
        switch (configuration.type) {
          case 'text':
            return (
              <FormText
                label={data.label}
                value={data.value}
                onChangeData={changeData}
              />
            );
          case 'textarea':
            return (
              <FormTextarea
                label={data.label}
                value={data.value}
                onChangeData={changeData}
              />
            );
          case 'number':
            return (
              <FormNumber
                label={data.label}
                value={data.value}
                onChangeData={changeData}
              />
            );
          case 'date':
            return (
              <FormDate
                label={data.label}
                value={data.value}
                onChangeData={changeData}
              />
            );
          case 'time':
            return (
              <FormTime
                label={data.label}
                value={data.value}
                onChangeData={changeData}
              />
            );
          case 'url':
            return (
              <FormURL
                label={data.label}
                value={data.value}
                onChangeData={changeData}
              />
            );
          case 'color':
            return (
              <FormColor
                label={data.label}
                value={data.value}
                onChangeData={changeData}
              />
            );
          case 'select':
            return (
              <FormSelect
                label={data.label}
                value={data.value}
                options={data.configuration.options}
                onChangeData={changeData}
              />
            );
          case 'file':
            return (
              <FormFile
                label={data.label}
                value={data.value}
                onChangeData={changeData}
              />
            );
          default:
            return null;
        }
      })()}
    </FormNormalTemplate>
  );
};

const FormDynamic = ({ data, value, saveData }) => {
  const { configuration } = data;
  const [inputFields, setInputFields] = useState([]);

  useEffect(() => {
    setInputFields(value);
  }, [value]);

  const addFields = () => {
    const newfield = {};
    configuration.field.forEach((field) => {
      if (field.code === 'photo') {
        newfield[field.code] = 'https://placehold.co/100x100?text=Image';
      } else {
        newfield[field.code] = '';
      }
    });
    const dyn = [...inputFields, ...[newfield]];

    setInputFields(dyn);
    changeData(dyn);
  };

  const removeFields = (index) => {
    let dyn = [...inputFields];
    dyn.splice(index, 1);

    setInputFields(dyn);
    changeData(dyn);
  };

  const changeFields = (index, name, fields) => {
    let dyn = [...inputFields];
    dyn[index][name] = fields.value;

    setInputFields(dyn);
    changeData(dyn);
  };

  const changeData = (dynamic, type = 'value') => {
    const input = {
      id_theme_feature_column: data.id_theme_feature_column,
      id_invitation_feature_data: data.id_invitation_feature_data,
    };

    if (type === 'value') {
      assign(input, { value: JSON.stringify(dynamic) });
    } else {
      assign(input, dynamic);
    }

    // Save
    saveData(input);
  };

  return (
    <>
      <FormControl>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <FormLabel>{data.label}</FormLabel>

          <FormSwitch
            label={data.label}
            value={data.is_active}
            onChangeData={(e) => changeData(e, 'isActive')}
          />
        </Flex>
        {inputFields.map((input, i) => (
          <Flex
            key={i}
            justifyContent={'space-between'}
            justifyItems={'stretch'}
            mb={4}
            gap={4}
          >
            {configuration.field.map((field, j) => {
              return !field.is_admin ? (
                <Fragment key={j}>
                  {(() => {
                    switch (field.type) {
                      case 'text':
                        return (
                          <FormText
                            label={field.label}
                            value={input[field.code]}
                            onChangeData={(e) => changeFields(i, field.code, e)}
                          />
                        );
                      case 'file':
                        return (
                          <FormFile
                            label={field.label}
                            value={input[field.code]}
                            onChangeData={(e) => changeFields(i, field.code, e)}
                          />
                        );
                      default:
                        return null;
                    }
                  })()}
                </Fragment>
              ) : null;
            })}
            <IconButton
              colorScheme="red"
              aria-label="Remove"
              icon={<MdDelete />}
              onClick={() => removeFields(i)}
              visibility={i !== 0 ? 'visible' : 'hidden'}
            />
          </Flex>
        ))}
      </FormControl>
      <Button
        size={'sm'}
        colorScheme={'pink'}
        leftIcon={<MdAdd />}
        onClick={addFields}
      >
        Tambah
      </Button>
    </>
  );
};

const AppearanceForm = ({ data, onResetIframe }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutationFeature = useMutation({
    mutationFn: (body: any) =>
      updateAppearanceFeature(session?.accessToken, {
        id: body.id_invitation_feature,
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appearance'] });
      onResetIframe();
    },
  });

  const mutationFeatureData = useMutation({
    mutationFn: (body: any) =>
      updateAppearanceFeatureData(session?.accessToken, {
        id: body.id_invitation_feature_data,
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appearance'] });
      onResetIframe();
    },
  });

  if (mutationFeature.isError || mutationFeatureData.isError) {
    toast({
      title: 'Terjadi kesalahan.',
      description: 'Silahkan coba kembali.',
      status: 'error',
      position: 'bottom-left',
      isClosable: true,
    });
  }

  const changeFeature = (fields) => {
    mutationFeature.mutate(fields);
  };

  const changeFeatureData = (fields) => {
    mutationFeatureData.mutate(fields);
  };

  return (
    <Stack spacing="60px">
      {data.map((res, index) => (
        <Box key={index}>
          <Flex justifyContent={'space-between'} alignItems={'center'} mb={4}>
            <Heading as={'h4'} size={'md'}>
              {res.label}
            </Heading>

            <Switch
              colorScheme="pink"
              defaultChecked={res.is_active}
              onChange={(e) =>
                changeFeature({
                  id_invitation_feature: res.id_invitation_feature,
                  is_active: e.target.checked,
                })
              }
            />
          </Flex>
          <Card variant={'outline'} bg={'white'}>
            <CardBody>
              {res.data.map((dat, index) => (
                <Box key={index} mb={6}>
                  {(() => {
                    switch (dat.configuration.form) {
                      case 'normal':
                        return (
                          <FormNormal data={dat} saveData={changeFeatureData} />
                        );
                      case 'dynamic':
                        return (
                          <FormDynamic
                            data={dat}
                            value={JSON.parse(dat.value)}
                            saveData={changeFeatureData}
                          />
                        );
                      default:
                        return null;
                    }
                  })()}
                </Box>
              ))}
            </CardBody>
          </Card>
        </Box>
      ))}
    </Stack>
  );
};

export default AppearanceForm;
