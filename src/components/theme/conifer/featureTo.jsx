import { Container, Box, Flex } from '@chakra-ui/react';

function FeatureTo({ ...props }) {
  return (
    <>
      <Container h={'full'} maxW={'md'} centerContent>
        <Flex
          position={'relative'}
          px={12}
          py={8}
          h={'full'}
          w={'full'}
          textAlign={'center'}
          alignItems={'center'}
          justifyContent={'center'}
          bgImage={'var(--conifer-bg-to)'}
          bgPosition={'center'}
          bgRepeat={'no-repeat'}
          bgSize={'contain'}
          flexDir={'column'}
        >
          asd das asd
        </Flex>
      </Container>
    </>
  );
}

export default FeatureTo;
