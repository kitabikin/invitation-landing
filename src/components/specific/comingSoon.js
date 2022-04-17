import Image from 'next/image';
import { Flex, Box } from '@chakra-ui/react';

function ComingSoon() {
  return (
    <>
      <Flex
        h="95vh"
        minH="full"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        px={4}
      >
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Image
              src="/images/logo/logo180x36.png"
              alt="Logo"
              width="130"
              height="26"
            />
          </Flex>
          <Box as={'span'} ms="2" fontSize={'35px'} letterSpacing={'-3px'}>
            undangan
          </Box>
        </Flex>

        <Box
          fontWeight="bold"
          fontSize={{ base: '5xl', md: '7xl' }}
          textAlign="center"
          mt="4"
        >
          <Box lineHeight="1.25">C O M I N G</Box>
          <Box lineHeight="1.25">S O O N</Box>
        </Box>

        <Box fontWeight="500" textAlign="center" mt="7">
          Kitabikin akan merayakan peluncuran situs baru kami segera!
        </Box>
      </Flex>
    </>
  );
}

export default ComingSoon;
