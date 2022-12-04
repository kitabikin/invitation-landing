import { isNil } from 'lodash';
import { Box, Button, Flex, Select, SimpleGrid } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Pagination = ({
  perPageItems,
  pagination,
  perPage,
  page,
  onPerPage,
  onPage,
}) => {
  const totalPages = isNil(pagination) ? 0 : pagination.total_pages;
  const pageItems = [];
  for (let index = 1; index <= totalPages; index += 1) {
    pageItems.push({ value: index, label: index.toString() });
  }

  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={0}
      fontSize={'sm'}
      bg={'white'}
      border={1}
      borderStyle={'solid'}
      borderColor={'gray.200'}
    >
      <Box
        display={{ base: 'none', md: 'flex' }}
        justifyContent={{ base: 'center', lg: 'start' }}
      >
        <Flex
          alignItems={'center'}
          borderRight={{ lg: 1 }}
          borderRightStyle={{ lg: 'solid' }}
          borderRightColor={{ lg: 'gray.200' }}
        >
          <Box px={2}>Tampilkan</Box>
          <Select
            placeholder="Tampilkan"
            value={perPage}
            variant="filled"
            border={0}
            borderRadius={0}
            onChange={(e) => onPerPage(e.target.value)}
          >
            {perPageItems.map((res, index) => (
              <option key={index} value={res.value}>
                {res.label}
              </option>
            ))}
          </Select>
          <Box pl={2} pr={{ base: 1, lg: 2 }}>
            Item
          </Box>
        </Flex>
        <Flex
          alignItems={'center'}
          pl={{ base: 0, lg: 2 }}
          pr={2}
          borderRight={{ lg: 1 }}
          borderRightStyle={{ lg: 'solid' }}
          borderRightColor={{ lg: 'gray.200' }}
        >
          dari total
          <Box as={'span'} ml={1} fontWeight={'semibold'}>
            {pagination.total_items}
          </Box>
        </Flex>
      </Box>
      <Flex
        alignItems={'center'}
        justifyContent={{ base: 'space-between', lg: 'flex-end' }}
      >
        <Box display={{ base: 'flex', lg: 'none' }}>
          <Box
            borderRight={{ lg: 1 }}
            borderRightStyle={{ lg: 'solid' }}
            borderRightColor={{ lg: 'gray.200' }}
          >
            <Button
              borderRadius={0}
              colorScheme={'pink'}
              disabled={pagination.previous_page < 1}
              onClick={() => onPage(pagination.previous_page)}
            >
              <MdChevronLeft size={20} />
            </Button>
          </Box>
        </Box>
        <Flex
          alignItems={'center'}
          borderRight={{ lg: 1 }}
          borderRightStyle={{ lg: 'solid' }}
          borderRightColor={{ lg: 'gray.200' }}
        >
          <Box px={2}>Halaman</Box>
          <Select
            placeholder="Halaman"
            value={page}
            variant="filled"
            border={0}
            borderRadius={0}
            onChange={(e) => onPage(e.target.value)}
          >
            {pageItems.map((res, index) => (
              <option key={index} value={res.value}>
                {res.label}
              </option>
            ))}
          </Select>
          <Flex pl={2} pr={3}>
            dari
            <Box as={'span'} ml={1} fontWeight={'semibold'}>
              {pagination.total_pages}
            </Box>
          </Flex>
        </Flex>
        <Flex>
          <Box
            display={{ base: 'none', lg: 'block' }}
            borderRight={{ lg: 1 }}
            borderRightStyle={{ lg: 'solid' }}
            borderRightColor={{ lg: 'gray.200' }}
          >
            <Button
              borderRadius={0}
              colorScheme={'pink'}
              disabled={pagination.previous_page < 1}
              onClick={() => onPage(pagination.previous_page)}
            >
              <MdChevronLeft size={20} />
            </Button>
          </Box>
          <Box
            borderLeft={{ base: 1, lg: 0 }}
            borderLeftStyle={{ base: 'solid' }}
            borderLeftColor={{ base: 'gray.200' }}
          >
            <Button
              borderRadius={0}
              colorScheme={'pink'}
              disabled={pagination.next_page > pagination.total_pages}
              onClick={() => onPage(pagination.next_page)}
            >
              <MdChevronRight size={20} />
            </Button>
          </Box>
        </Flex>
      </Flex>
    </SimpleGrid>
  );
};

export default Pagination;
