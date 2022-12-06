import { useState } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import {
  Box,
  Button,
  Collapse,
  Container,
  Flex,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { RiMenuLine, RiCloseLine, RiArrowDownSLine } from 'react-icons/ri';

const NAV_ITEMS = [
  {
    label: 'Acara',
    href: '/event',
  },
];

export default function NavbarDefault() {
  const { isOpen, onToggle } = useDisclosure();
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <Box as={'nav'} zIndex={999}>
      <Flex
        bgColor={isOpen ? 'white' : 'rgba(255, 255, 255, 0.8)'}
        position={'fixed'}
        top={0}
        width={'full'}
        minH={'60px'}
        justify={'center'}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        zIndex={999}
      >
        <Container
          maxW="container.lg"
          display={'flex'}
          alignItems={'center'}
          width={'full'}
        >
          <Flex
            flex={{ base: 0, md: 'auto' }}
            ml={{ base: -2 }}
            mr={{ base: 4 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <RiCloseLine /> : <RiMenuLine />}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>

          <Flex flex={{ base: 1 }} justify={'start'}>
            <NextLink href="/" passHref>
              <Link
                display={'flex'}
                alignItems={'center'}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                <NextImage
                  src={'/images/logo/logo36x36.png'}
                  width={32}
                  height={32}
                  alt={'Kitabikin Undangan'}
                />
                <Text
                  display={{ base: 'none', md: 'block' }}
                  as="h1"
                  size="md"
                  ml={3}
                  fontWeight={'700'}
                >
                  Undangan
                </Text>
              </Link>
            </NextLink>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            alignItems={'center'}
            justify={'flex-end'}
            direction={'row'}
            spacing={{ base: 2, md: 4 }}
          >
            <Flex display={{ base: 'none', md: 'flex' }}>
              <DesktopNav />
            </Flex>

            <NextLink href={'/contact'} passHref>
              <Button
                as={'a'}
                colorScheme={'pink'}
                fontWeight={400}
                _focus={{
                  boxShadow: 'inherit',
                }}
              >
                Kontak
              </Button>
            </NextLink>
          </Stack>
        </Container>
      </Flex>

      {isOpen && <MobileNav toggleParrent={onToggle} />}
    </Box>
  );
}

const MobileNav = ({ toggleParrent }) => {
  return (
    <Stack
      bgColor={'white'}
      position={'fixed'}
      top={'60px'}
      width={'full'}
      minHeight={'calc(100vh - 60px)'}
      px={4}
      display={{ md: 'none' }}
      zIndex={9999}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          toggleParrent={toggleParrent}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, toggleParrent }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={'gray.200'}
      mt={'0 !important'}
    >
      <Stack spacing={4} onClick={children && onToggle}>
        <NextLink href={href ?? '#'} passHref>
          <Flex
            py={3}
            as={Link}
            justify={'space-between'}
            align={'center'}
            _hover={{
              textDecoration: 'none',
            }}
            onClick={href && toggleParrent}
          >
            <Text color={'gray.700'} fontWeight={600}>
              {label}
            </Text>
            {children && (
              <Icon
                as={RiArrowDownSLine}
                transition={'all .25s ease-in-out'}
                transform={isOpen ? 'rotate(180deg)' : ''}
              />
            )}
          </Flex>
        </NextLink>

        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0' }}>
          <Stack color={'gray.500'} pl={4} align={'start'}>
            {children &&
              children.map((child) => (
                <Link
                  key={child.label}
                  pt={2}
                  pb={3}
                  mt={'0 !important'}
                  href={child.href}
                >
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    </Box>
  );
};

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={2}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <NextLink href={navItem.href} passHref>
            <Button
              as={'a'}
              variant={'ghost'}
              fontWeight={400}
              color={'gray.700'}
              _hover={{
                textDecoration: 'none',
                color: 'pink.800',
              }}
              _active={{
                bg: 'inherit',
              }}
              _focus={{
                boxShadow: 'inherit',
              }}
            >
              {navItem.label}
            </Button>
          </NextLink>
        </Box>
      ))}
    </Stack>
  );
};
