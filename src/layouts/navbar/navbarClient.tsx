import { useRouter } from 'next/router';
import Image from 'next/image';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { RiMenuLine, RiCloseLine, RiArrowDownSLine } from 'react-icons/ri';

const navigation = [
  { name: 'Dashboard', href: '/a/dashboard' },
  { name: 'Tampilan', href: '/a/appearance' },
  { name: 'Buku Tamu', href: '/a/guestbook' },
  { name: 'Kehadiran', href: '/a/attendance' },
  { name: 'Ucapan & Doa', href: '/a/words' },
];

const NavItem = (props) => {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <NextLink href={props.href} passHref>
      <Link
        fontSize={'sm'}
        fontWeight={'bold'}
        color={isActive ? 'pink.500' : 'gray.800'}
        _after={{
          content: `''`,
          display: 'block',
          borderBottom: 2,
          borderStyle: 'solid',
          borderColor: 'pink.500',
          transform: 'scaleX(0)',
          transition: 'transform 300ms ease-in-out',
          transformOrigin: '0 50%',
        }}
        _hover={{
          _after: {
            transform: 'scaleX(1)',
          },
        }}
      >
        <Text as={'span'}>{props.text}</Text>
      </Link>
    </NextLink>
  );
};

const NavItemMobile = (props) => {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <NextLink href={props.href} passHref>
      <Link
        display={'block'}
        w={'full'}
        fontSize={'sm'}
        fontWeight={'bold'}
        color={isActive ? 'pink.500' : 'gray.800'}
        bg={isActive ? 'pink.50' : 'white'}
        py={3}
        px={4}
      >
        <Text as={'span'}>{props.text}</Text>
      </Link>
    </NextLink>
  );
};

const NavbarClient = () => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  const handleLogout = () => {
    router.push('/api/logout');
  };

  return (
    <>
      <Box
        as={'nav'}
        bg={'white'}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.300'}
      >
        <Container maxW={'8xl'}>
          <Flex
            pos={'relative'}
            flexWrap={'wrap'}
            alignItems={'center'}
            justifyContent={'space-between'}
            py={4}
          >
            <HStack spacing={6} alignItems={'center'}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onToggle}
                icon={isOpen ? <RiCloseLine /> : <RiMenuLine />}
                variant={'ghost'}
                aria-label={'Toggle Navigation'}
                size={'sm'}
              />
              <NextLink href="/a/dashboard" passHref>
                <Link display={'flex'} ms={{ base: 6, md: '0 !important' }}>
                  <Image
                    src={'/images/logo/logo36x36.png'}
                    width={32}
                    height={32}
                    alt={'Kitabikin Undangan'}
                  />
                </Link>
              </NextLink>
              <HStack
                spacing={6}
                alignItems={'center'}
                display={{ base: 'none', md: 'flex' }}
              >
                {navigation.map((nav, index) => (
                  <NavItem key={index} href={nav.href} text={nav.name} />
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar size={'sm'} bg={'#073B57'} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogout}>Keluar</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Container>

        {isOpen && (
          <Box
            pos={'absolute'}
            zIndex={1}
            w={'full'}
            bg={'white'}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={'gray.300'}
            mt={1}
            py={4}
          >
            <VStack spacing={1} alignItems={'flex-start'}>
              {navigation.map((nav, index) => (
                <NavItemMobile key={index} href={nav.href} text={nav.name} />
              ))}
            </VStack>
          </Box>
        )}
      </Box>
    </>
  );
};

export default NavbarClient;
