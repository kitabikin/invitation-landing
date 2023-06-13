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
  Popover,
  PopoverTrigger,
  PopoverContent,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { RiMenuLine, RiCloseLine, RiArrowDownSLine } from 'react-icons/ri';
import { FaChild, FaBirthdayCake } from 'react-icons/fa';
import { ImManWoman } from 'react-icons/im';
import { MdGroups, MdToys } from 'react-icons/md';

const NAV_ITEMS = [
  {
    label: 'Acara',
    children: [
      {
        icon: <FaChild color={'white'} />,
        label: 'Aqiqah',
        subLabel: 'Comming soon...',
        href: '/event/aqiqah',
      },
      {
        icon: <MdToys color={'white'} />,
        label: 'Khitanan',
        subLabel: 'Comming soon...',
        href: '/event/wedding',
      },
      {
        icon: <ImManWoman color={'white'} />,
        label: 'Pernikahan',
        subLabel: 'Comming soon...',
        href: '/event/wedding',
      },
      {
        icon: <MdGroups color={'white'} />,
        label: 'Reuni',
        subLabel: 'Comming soon...',
        href: '/event/reunion',
      },
      {
        icon: <FaBirthdayCake color={'white'} />,
        label: 'Ulang Tahun',
        subLabel: 'Comming soon...',
        href: '/event/birthday',
      },
    ],
  },
];

export default function NavbarDefault() {
  const { isOpen, onToggle } = useDisclosure();

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
            <Link
              as={NextLink}
              href="/"
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
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={{ base: 2, md: 2 }}
          >
            <Flex display={{ base: 'none', md: 'flex' }}>
              <DesktopNav />
            </Flex>

            <NextLink href={'/event'} passHref>
              <Button
                as={'a'}
                variant={'ghost'}
                fontSize={'sm'}
                fontWeight={400}
                color={'gray.700'}
                _hover={{
                  textDecoration: 'none',
                }}
                _active={{
                  bg: 'inherit',
                }}
                _focus={{
                  boxShadow: 'inherit',
                }}
              >
                Masuk
              </Button>
            </NextLink>
            <NextLink href={'/event'} passHref>
              <Button
                as={'a'}
                colorScheme={'green'}
                fontSize={'sm'}
                fontWeight={400}
                _focus={{
                  boxShadow: 'inherit',
                }}
              >
                Daftar
              </Button>
            </NextLink>
          </Stack>
        </Container>
      </Flex>

      {isOpen && <MobileNav />}
    </Box>
  );
}

const MobileNav = () => {
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
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
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
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <Stack direction={'row'} spacing={2}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover id={'navbar-event'} strategy={'fixed'}>
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  {navItem.href ? (
                    <NextLink href={'/event'} passHref>
                      <Button
                        as={'a'}
                        variant={'ghost'}
                        fontSize={'sm'}
                        fontWeight={400}
                        color={'gray.700'}
                        _hover={{
                          textDecoration: 'none',
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
                  ) : (
                    <Button
                      variant={'ghost'}
                      fontSize={'sm'}
                      fontWeight={400}
                      color={'gray.700'}
                      _hover={{
                        textDecoration: 'none',
                      }}
                      _active={{
                        bg: 'inherit',
                      }}
                      _focus={{
                        boxShadow: 'inherit',
                      }}
                      rightIcon={
                        navItem.children && (
                          <Icon
                            as={RiArrowDownSLine}
                            transition={'all .25s ease-in-out'}
                            transform={isOpen ? 'rotate(180deg)' : ''}
                          />
                        )
                      }
                      onClick={open}
                    >
                      {navItem.label}
                    </Button>
                  )}
                </PopoverTrigger>

                {navItem.children && (
                  <PopoverContent
                    width={'100vw'}
                    borderX={0}
                    borderRadius={'none'}
                    transformOrigin={'none !important'}
                    transform={'none !important'}
                    py={6}
                    _focus={{
                      boxShadow: 'inherit',
                    }}
                  >
                    <Container maxW="container.lg">
                      <SimpleGrid columns={{ md: 2, lg: 3 }} spacing="40px">
                        {navItem.children.map((child) => (
                          <DesktopSubNav
                            key={child.label}
                            close={onClose}
                            {...child}
                          />
                        ))}
                      </SimpleGrid>
                    </Container>
                  </PopoverContent>
                )}
              </>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ icon, label, href, subLabel, close }) => {
  return (
    <NextLink href={href ?? '#'} passHref>
      <Flex
        alignItems={'center'}
        as={Link}
        _hover={{
          textDecoration: 'none',
        }}
        _focus={{
          boxShadow: 'inherit',
        }}
        onClick={() => close()}
      >
        <Flex
          width={'48px'}
          height={'48px'}
          borderRadius={'full'}
          bg={'green.500'}
          alignItems={'center'}
          justify={'center'}
          flexShrink={0}
        >
          {icon}
        </Flex>
        <Box ml={4} width={200}>
          <Text fontWeight={600}>{label}</Text>
        </Box>
      </Flex>
    </NextLink>
  );
};
