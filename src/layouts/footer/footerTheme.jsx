import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Container, Flex, Icon, Link } from '@chakra-ui/react';
import { RiHeart2Fill } from 'react-icons/ri';

export default function FooterTheme() {
  return (
    <Box as={'footer'} fontSize={'sm'} textColor={'gray.100'}>
      <Flex bgColor={'gray.800'} py={6}>
        <Container maxW="container.lg">
          <Flex
            mb={6}
            flexDir={'column'}
            justify={'center'}
            alignItems={'center'}
            gridGap={{ base: 1, md: 0 }}
          >
            <span>Our Partner</span>
            <Image
              src="https://ik.imagekit.io/kitabikincom/invitation/theme/global/orangephotography_NWs35E8c7.png?updatedAt=1685788309838"
              alt="Orange Photography"
              width="200"
              height="26"
            />
          </Flex>
          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            justify={{ base: 'normal', md: 'space-between' }}
            gridGap={{ base: 1, md: 0 }}
          >
            <Box justifyContent={'center'} textAlign={'center'}>
              ©{' '}
              <NextLink href={'/'} passHref>
                <Link>Kitabikin Undangan</Link>
              </NextLink>
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
