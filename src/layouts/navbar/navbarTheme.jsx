import { useAtom } from 'jotai';
import { Box, Container, Flex, Heading, Select } from '@chakra-ui/react';

function NavbarTheme({ atom, theme, options }) {
  const [themeColor, setThemeColor] = useAtom(atom);

  function handleClickTheme(theme) {
    document.querySelector('body').classList.remove(themeColor);
    setThemeColor(theme);
    document.querySelector('body').classList.add(theme);
  }

  return (
    <Box
      as={'nav'}
      pos={'fixed'}
      zIndex={700}
      w={'full'}
      borderBottomStyle={'solid'}
      borderBottomWidth={1}
      borderBottomColor={'gray.300'}
    >
      <Flex bgColor={'gray.50'} py={4}>
        <Container maxW="container.lg">
          <Flex gridGap={4} justify={'space-between'} alignItems={'center'}>
            <Heading as="h4" size="md">
              Tema {theme}
            </Heading>
            <Select
              w={{ base: 125, md: 270 }}
              onChange={(event) => handleClickTheme(event.target.value)}
              defaultValue={themeColor}
            >
              {options.map((res) => (
                <option key={res.value} value={res.value}>
                  {res.label}
                </option>
              ))}
            </Select>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
}

export default NavbarTheme;
