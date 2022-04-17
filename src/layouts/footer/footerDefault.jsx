import { Box, Container, Flex, Icon } from '@chakra-ui/react';
import { RiHeart2Fill } from 'react-icons/ri';

export default function FooterDefault() {
  return (
    <Box as={'footer'} fontSize={'sm'}>
      <Flex bgColor={'gray.50'} py={6}>
        <Container maxW="container.lg">
          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            justify={{ base: 'normal', md: 'space-between' }}
            gridGap={{ base: 1, md: 0 }}
          >
            <Flex justifyContent={'center'}>
              Copyright © {new Date().getFullYear()} Kitabikin. All rights
              reserved.
            </Flex>
            <Flex justifyContent={'center'}>
              Made with{' '}
              <Icon as={RiHeart2Fill} color={'red.500'} mx={1.5} mt={1} /> in
              Indonesia.
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
}
