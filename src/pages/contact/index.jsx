import NextImage from "next/legacy/image";
import {
  Button,
  Container,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';

import site from '@/config/site';
import ContainerDefault from '@/layouts/container/containerDefault';
import HeaderPage from '@/components/global/header/headerPage';

import { RiWhatsappLine, RiMailSendLine } from 'react-icons/ri';

function Contact() {
  // Settings
  const description = `Tim kita akan segera menanggapi pertanyaan, saran, atau keluhan dari pengguna dengan cepat dan ramah. Ayo hubungi kita untuk mendapatkan informasi lebih lanjut atau bantuan.`;

  const wa = site.whatsappNumber;
  const txt = encodeURIComponent(
    `Halo kak, saya tertarik ingin membuat undangan. \nMohon bantuannya :)`,
  );

  return (
    <ContainerDefault title="Kontak" description={description}>
      <Container maxW="container.lg" mt={20}>
        <HeaderPage title={'Tim kita siap membantu'} position={'center'} />

        <SimpleGrid columns={[1, null, 2]} spacing={'24px'} mb={24}>
          <Flex
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            py={4}
            px={8}
            border={1}
            borderStyle={'solid'}
            borderColor={'gray.200'}
            borderRadius={8}
          >
            <Spacer
              flex={'none'}
              alignSelf={'center'}
              w={{ base: 2, md: 4 }}
              h={{ base: 2, md: 4 }}
            />
            <Flex
              w={'85px'}
              h={'85px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={'full'}
              bg={'#25D366'}
              color={'white'}
            >
              <RiWhatsappLine color={'white'} size={45} />
            </Flex>
            <Spacer flex={'none'} alignSelf={'center'} w={4} h={4} />
            <Text
              as={'h3'}
              fontSize={{ base: 'lg', md: '2xl' }}
              fontWeight={700}
              textAlign={'center'}
            >
              Whatsapp
            </Text>
            <Spacer
              flex={'none'}
              alignSelf={'center'}
              w={{ base: 2, md: 4 }}
              h={{ base: 2, md: 4 }}
            />
            <Button
              as={'a'}
              bg={'#25D366'}
              color={'white'}
              w={'full'}
              href={`https://wa.me/${wa}?text=${txt}`}
              target={'_blank'}
              _hover={{
                bg: '#128C7E',
              }}
            >
              Kontak kita
            </Button>
            <Spacer
              flex={'none'}
              alignSelf={'center'}
              w={{ base: 2, md: 4 }}
              h={{ base: 2, md: 4 }}
            />
          </Flex>
          <Flex
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            p={4}
            border={1}
            borderStyle={'solid'}
            borderColor={'gray.200'}
            borderRadius={8}
          >
            <Spacer
              flex={'none'}
              alignSelf={'center'}
              w={{ base: 2, md: 4 }}
              h={{ base: 2, md: 4 }}
            />
            <Flex
              w={'85px'}
              h={'85px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={'full'}
              bg={'blue.500'}
              color={'white'}
            >
              <RiMailSendLine color={'white'} size={45} />
            </Flex>
            <Spacer flex={'none'} alignSelf={'center'} w={4} h={4} />
            <Text
              as={'h3'}
              fontSize={{ base: 'lg', md: '2xl' }}
              fontWeight={700}
              textAlign={'center'}
            >
              Email
            </Text>
            <Spacer
              flex={'none'}
              alignSelf={'center'}
              w={{ base: 2, md: 4 }}
              h={{ base: 2, md: 4 }}
            />
            <Button
              colorScheme={'blue'}
              w={'full'}
              onClick={(e) => {
                window.location.href = `mailto:social.kitabikin@gmail.com`;
                e.preventDefault();
              }}
            >
              Kirim email
            </Button>
            <Spacer
              flex={'none'}
              alignSelf={'center'}
              w={{ base: 2, md: 4 }}
              h={{ base: 2, md: 4 }}
            />
          </Flex>
        </SimpleGrid>

        <Flex justifyContent={'center'}>
          <NextImage
            src="/images/illustration/contact.png"
            width={316}
            height={419}
          />
        </Flex>
      </Container>
    </ContainerDefault>
  );
}

export default Contact;
