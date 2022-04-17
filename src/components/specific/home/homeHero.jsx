import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { BsArrowRight } from 'react-icons/bs';

import site from '@/config/site';
import TitleHome from '@/components/global/title/titleHome';

const TITLE_ITEMS = ['invitation', 'happiness', 'love'];

function HomeHero() {
  const [inView, updateInView] = useState(false);
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState(TITLE_ITEMS[counter]);

  useEffect(() => {
    setTimeout(() => {
      updateInView(!inView);
      setCounter(counter < TITLE_ITEMS.length - 1 ? counter + 1 : 0);
      setTitle(TITLE_ITEMS[counter]);
    }, 5000);
  }, [inView, counter, title]);

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
          <TitleHome>{` ${title}`}</TitleHome>
        </Flex>
      </Text>
      <Text fontSize={{ base: 'lg', md: 'xl' }} color={'gray.500'} mt={6}>
        {site.description}
      </Text>
      <NextLink href={`/event`} passHref>
        <Button
          as={'a'}
          colorScheme={'green'}
          mt={8}
          rightIcon={<BsArrowRight />}
        >
          Jelajahi Acara
        </Button>
      </NextLink>
    </Box>
  );
}

export default HomeHero;
