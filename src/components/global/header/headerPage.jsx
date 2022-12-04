import { Box, Spacer, Heading } from '@chakra-ui/react';

function HeaderPage({ title, position = 'left' }) {
  return (
    <>
      <Spacer w={{ base: 4, md: 8 }} h={{ base: 4, md: 8 }} />
      <Box as={'header'} mb={{ base: 8, md: 14 }} textAlign={position}>
        <Heading as={'h2'} fontSize={'5xl'} fontWeight={700}>
          {title}
        </Heading>
      </Box>
    </>
  );
}

export default HeaderPage;
