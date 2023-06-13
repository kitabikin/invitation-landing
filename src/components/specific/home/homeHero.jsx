import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { BsArrowRight } from 'react-icons/bs';

import site from '@/config/site';
import TitleHome from '@/components/global/title/titleHome';

const TITLE_ITEMS = ['invitation', 'happiness', 'love'];

function HomeHero() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setCounter((index) => index + 1),
      5000,
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Box textAlign={'center'} py={{ base: 8, md: 16 }}>
      <Text
        as={'h1'}
        fontWeight={900}
        fontSize={{ base: '5xl', md: '7xl' }}
        lineHeight={1.25}
      >
        Kitabikin
        <br />
        <Flex
          as={Text}
          color={'#073B57'}
          flexDir={{ base: 'column', md: 'row' }}
          justifyContent={'center'}
          gridGap={2}
        >
          <Text as={'span'}>help share</Text>
          <TitleHome>{` ${
            TITLE_ITEMS[counter % TITLE_ITEMS.length]
          }`}</TitleHome>
        </Flex>
      </Text>
      <Text fontSize={{ base: 'lg', md: 'xl' }} color={'gray.500'} mt={6}>
        {site.description}
      </Text>
      <Button
        as={NextLink}
        href={`/event`}
        colorScheme={'green'}
        mt={8}
        rightIcon={<BsArrowRight />}
      >
        Jelajahi Acara
      </Button>
    </Box>
  );
}

export default HomeHero;
