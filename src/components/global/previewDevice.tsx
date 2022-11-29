import { Box } from '@chakra-ui/react';

const PreviewDevice = ({ children }) => {
  return (
    <Box
      pos={'absolute'}
      display={'block'}
      w={'352px'}
      h={'724px'}
      padding={4}
      top={'50%'}
      left={'50%'}
      transformOrigin={'top left'}
      transform={{
        base: '',
        md: 'scale(0.5) translateY(-50%) translate(-50%)',
        lg: 'scale(0.7405) translateY(-50%) translate(-50%)',
      }}
      my={0}
      mx={'auto'}
      _after={{
        content: "''",
        pos: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: 'url(/images/preview-device.svg)',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box h={'full'}>{children}</Box>
    </Box>
  );
};

export default PreviewDevice;
