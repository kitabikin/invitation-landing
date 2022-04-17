import { Box, Flex, Text } from '@chakra-ui/react';

const STATISTIC_ITEMS = [
  {
    label: 'ACARA',
    value: '5',
  },
  {
    label: 'TEMA',
    value: '1',
  },
  {
    label: 'PENGGUNA',
    value: '2',
  },
];

function HomeStatistic() {
  return (
    <Box py={6}>
      <Flex flexDir={{ base: 'column', md: 'row' }} gridGap={4}>
        {STATISTIC_ITEMS.map((item, index, row) => (
          <Box
            key={item.label}
            flexGrow={1}
            px={16}
            textAlign={'center'}
            borderRight={{ base: 0, md: index + 1 < row.length ? 1 : 0 }}
            borderStyle={{ base: 'inherit', md: 'solid' }}
            borderColor={{ base: 'inherit', md: 'gray.200' }}
          >
            <Text fontSize={'5xl'} fontWeight={700}>
              {item.value}
            </Text>
            <Text>{item.label}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default HomeStatistic;
