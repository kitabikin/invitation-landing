import { Box, Heading, SimpleGrid, Text, Flex } from '@chakra-ui/react';

const STATISTIC_ITEMS = [
  {
    label: 'PENGGUNA',
    value: '56',
  },
  {
    label: 'ACARA',
    value: '2',
  },
  {
    label: 'TEMA',
    value: '4',
  },
];

function HomeStatistic() {
  return (
    <Box py={3}>
      <SimpleGrid columns={[1, null, 3]} spacing="24px" mt={4}>
        {STATISTIC_ITEMS.map((item, index, row) => (
          <Flex
            key={item.label}
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text fontSize={'5xl'} fontWeight={700}>
              {item.value}
            </Text>
            <Heading
              as={'h3'}
              fontWeight={700}
              fontSize={{ base: 'xl', md: 'lg' }}
              lineHeight={1.25}
            >
              {item.label}
            </Heading>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default HomeStatistic;
