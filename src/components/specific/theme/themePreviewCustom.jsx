import NextLink from 'next/link';
import { Button, Flex, Text } from '@chakra-ui/react';

function ThemePreviewCustom() {
  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      alignItems={'center'}
      justifyContent={'space-between'}
      gridGap={4}
      p={6}
      border={1}
      borderStyle={'solid'}
      borderColor={'gray.200'}
      borderRadius={8}
    >
      <Text
        fontSize={'lg'}
        fontWeight={700}
        textAlign={{ base: 'center', md: 'left' }}
      >
        Request tema khusus Anda
      </Text>
      <NextLink href={`/contact`} passHref>
        <Button as={'a'} colorScheme={'green'}>
          Request
        </Button>
      </NextLink>
    </Flex>
  );
}

export default ThemePreviewCustom;
