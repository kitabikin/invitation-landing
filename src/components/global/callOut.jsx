import NextLink from 'next/link';
import { Box, Button, Flex, Container, Text } from '@chakra-ui/react';

function CallOut() {
  return (
    <Box bg={'#073B57'} color={'white'} py={16}>
      <Container maxW="container.lg">
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          alignItems={'center'}
          justifyContent={'space-between'}
          gridGap={4}
        >
          <Text fontSize={'xl'} textAlign={{ base: 'center', md: 'left' }}>
            Kamu perlu undangan? Yuk, Kitabikin.
          </Text>
          <NextLink href={`/contact`} passHref>
            <Button
              as={'a'}
              size={'lg'}
              colorScheme={'gray'}
              variant={'outline'}
              _hover={{
                background: 'rgba(247, 250, 252, 0.1)',
              }}
            >
              Hubungi kita
            </Button>
          </NextLink>
        </Flex>
      </Container>
    </Box>
  );
}

export default CallOut;
