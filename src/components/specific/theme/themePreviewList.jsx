import NextLink from 'next/link';
import { Badge, Box, Image, Link, Text } from '@chakra-ui/react';

function ThemePreviewCommingSoon({ event, theme }) {
  return (
    <NextLink href={`/event/${event.code}/${theme.code}`} passHref>
      <Box
        as={Link}
        p={6}
        border={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        borderRadius={8}
        _hover={{
          textDecoration: 'none',
          borderColor: 'gray.400',
        }}
      >
        <Image src={theme.image} alt={theme.name} />
        <Box mt={2}>
          <Badge>{theme.theme_category.name}</Badge>
        </Box>
        <Box mt={1}>
          <Text>{theme.name}</Text>
        </Box>
      </Box>
    </NextLink>
  );
}

export default ThemePreviewCommingSoon;
