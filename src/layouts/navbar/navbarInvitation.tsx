import { useRouter } from 'next/router';
import Image from 'next/image';
import NextLink from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

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
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';

const NavItem = (props) => {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <Link
      as={NextLink}
      href={props.href}
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
  );
};

const NavItemMobile = (props) => {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <Link
      as={NextLink}
      href={props.href}
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
  );
};

const NavbarClient = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { isOpen, onToggle } = useDisclosure();

  const { code_invitation } = router.query;

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Box
        as={'nav'}
        pos={'fixed'}
        w={'full'}
        zIndex={10}
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
              <Link
                as={NextLink}
                href="/a/invitation"
                display={'flex'}
                ms={{ base: 6, md: '0 !important' }}
              >
                <Image
                  src={'/images/logo/logo36x36.png'}
                  width={32}
                  height={32}
                  alt={'Kitabikin Undangan'}
                />
              </Link>
              <HStack
                spacing={6}
                alignItems={'center'}
                display={{ base: 'none', md: 'flex' }}
              >
                <NavItem
                  href={`/a/invitation/${code_invitation}/analytics`}
                  text={'Analitik'}
                />
                {/* <NavItem
                  href={`/a/invitation/${code_invitation}/appearance`}
                  text={'Tampilan'}
                /> */}
                <NavItem
                  href={`/a/invitation/${code_invitation}/guestbook`}
                  text={'Buku Tamu'}
                />
                <NavItem
                  href={`/a/invitation/${code_invitation}/attendance`}
                  text={'Konfirmasi Kehadiran'}
                />
                <NavItem
                  href={`/a/invitation/${code_invitation}/words`}
                  text={'Ucapan & Doa'}
                />
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
                  <Avatar size={'sm'} src={session?.user.image} />
                </MenuButton>
                <MenuList zIndex={30}>
                  <MenuItem onClick={handleLogout}>Keluar</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Container>

        {isOpen && (
          <Box
            pos={'absolute'}
            zIndex={20}
            w={'full'}
            bg={'white'}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={'gray.300'}
            mt={0}
            py={4}
          >
            <VStack spacing={1} alignItems={'flex-start'}>
              <NavItemMobile
                href={`/a/invitation/${code_invitation}/analytics`}
                text={'Analitik'}
              />
              {/* <NavItemMobile
                href={`/a/invitation/${code_invitation}/appearance`}
                text={'Tampilan'}
              /> */}
              <NavItemMobile
                href={`/a/invitation/${code_invitation}/guestbook`}
                text={'Buku Tamu'}
              />
              <NavItemMobile
                href={`/a/invitation/${code_invitation}/attendance`}
                text={'Konfirmasi Kehadiran'}
              />
              <NavItemMobile
                href={`/a/invitation/${code_invitation}/words`}
                text={'Ucapan & Doa'}
              />
            </VStack>
          </Box>
        )}
      </Box>
    </>
  );
};

export default NavbarClient;
