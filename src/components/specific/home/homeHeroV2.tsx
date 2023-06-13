import NextLink from 'next/link';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { MdEast } from 'react-icons/md';

const HomeHero = () => {
  return (
    <Box py={{ base: 8, md: 16 }}>
      <Heading
        as={'h1'}
        fontWeight={'bold'}
        fontSize={{ base: '4xl', md: '6xl' }}
        lineHeight={1.25}
      >
        <Text as={'span'}>Undangan </Text>
        <Text
          as={'span'}
          position={'relative'}
          _before={{
            content: "''",
            pos: 'absolute',
            height: '45%',
            width: 'calc(100% + 10%)',
            bottom: 0,
            left: '-5%',
            backgroundColor: 'pink.100',
          }}
        >
          <Text as={'span'} pos={'relative'} zIndex={1}>
            elegan
          </Text>
        </Text>
        <Text as={'span'} display={'block'}>
          untuk setiap acara
        </Text>
      </Heading>
      <Button
        as={NextLink}
        href={`/event`}
        colorScheme={'pink'}
        mt={8}
        rightIcon={<MdEast />}
      >
        Jelajahi Acara
      </Button>
    </Box>
  );
};

export default HomeHero;
