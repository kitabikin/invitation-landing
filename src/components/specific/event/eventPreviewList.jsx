import NextLink from 'next/link';
import NextImage from 'next/legacy/image';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

import site from '@/config/site';
import { MdBrokenImage } from 'react-icons/md';
import * as KbIcon from '@/components/global/icon';

function EventPreviewList({ event }) {
  const Icon = KbIcon[event.image];

  return (
    <Box
      as={NextLink}
      href={`/event/${event.code}`}
      p={6}
      border={1}
      borderStyle={'solid'}
      borderColor={'gray.200'}
      borderRadius={8}
      _hover={{
        borderColor: 'pink.300',
      }}
    >
      <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
        <Spacer
          flex={'none'}
          alignSelf={'center'}
          w={{ base: 2, md: 4 }}
          h={{ base: 2, md: 4 }}
        />
        <Flex
          w={'85px'}
          h={'85px'}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={'full'}
          bg={'gray.100'}
          color={'gray.700'}
        >
          {event.image ? (
            <NextImage
              width={45}
              height={45}
              src={`${site.cloudinaryPath}/invitation/event/${event.image}`}
            />
          ) : (
            <MdBrokenImage size={45} />
          )}
        </Flex>
        <Spacer flex={'none'} alignSelf={'center'} w={4} h={4} />
        <Text
          as={'h3'}
          fontSize={{ base: 'lg', md: '2xl' }}
          fontWeight={700}
          textAlign={'center'}
        >
          {event.name}
        </Text>
        <Spacer
          flex={'none'}
          alignSelf={'center'}
          w={{ base: 2, md: 4 }}
          h={{ base: 2, md: 4 }}
        />
      </Flex>
    </Box>
  );
}

export default EventPreviewList;
