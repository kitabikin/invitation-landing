import { useCallback } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Textarea,
} from '@chakra-ui/react';

const FormSwitch = ({ data }) => {
  const changeActive = (fields) => {
    console.log(fields);
  };

  return (
    <Switch
      colorScheme="pink"
      defaultChecked={data.is_active}
      onChange={(e) =>
        changeActive({
          id_theme_feature_column: data.id_theme_feature_column,
          id_invitation_feature_data: data.id_invitation_feature_data,
          is_active: e.target.checked,
        })
      }
    />
  );
};

const FormText = ({ data }) => {
  const changeData = (fields) => {
    console.log(fields);
  };

  return (
    <FormControl>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <FormLabel>{data.label}</FormLabel>

        <FormSwitch data={data} />
      </Flex>
      <Input
        type="text"
        variant="filled"
        placeholder={data.label}
        defaultValue={data.value}
        onBlur={(e) =>
          changeData({
            id_theme_feature_column: data.id_theme_feature_column,
            id_invitation_feature_data: data.id_invitation_feature_data,
            value: e.target.value,
          })
        }
      />
    </FormControl>
  );
};

const FormTextarea = ({ data }) => {
  const changeData = (fields) => {
    console.log(fields);
  };

  return (
    <FormControl>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <FormLabel>{data.label}</FormLabel>

        <FormSwitch data={data} />
      </Flex>
      <Textarea
        variant="filled"
        placeholder={data.label}
        defaultValue={data.value}
        onBlur={(e) =>
          changeData({
            id_theme_feature_column: data.id_theme_feature_column,
            id_invitation_feature_data: data.id_invitation_feature_data,
            value: e.target.value,
          })
        }
      />
    </FormControl>
  );
};

const FormNormal = ({ data }) => {
  const { configuration } = data;

  const renderContent = useCallback(() => {
    switch (configuration.type) {
      case 'text':
        return <FormText data={data} />;
      case 'textarea':
        return <FormTextarea data={data} />;
      case 'file':
        return <Box>File!</Box>;
      default:
        return null;
    }
  }, [configuration]);

  return renderContent();
};

const AppearanceForm = ({ data }) => {
  const { configuration } = data;

  const renderContent = useCallback(() => {
    switch (configuration.form) {
      case 'normal':
        return <FormNormal data={data} />;
      case 'dynamic':
        return <Box>Dynamic!</Box>;
      default:
        return null;
    }
  }, [configuration]);

  return renderContent();
};

export default AppearanceForm;
