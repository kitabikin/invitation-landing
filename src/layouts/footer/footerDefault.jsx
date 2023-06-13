import NextLink from 'next/link';
import { Box, Container, Flex, Icon, Link } from '@chakra-ui/react';
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
            <Box justifyContent={'center'} textAlign={'center'}>
              Copyright ©{new Date().getFullYear()}{' '}
              <Link as={NextLink} href="/">
                Kitabikin Undangan
              </Link>
              .
            </Box>
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
