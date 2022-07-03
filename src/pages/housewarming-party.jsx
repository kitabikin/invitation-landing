import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import ContainerBlank from '@/layouts/container/containerBlank';
import { NextSeo } from 'next-seo';
import {
  Box,
  Button,
  Circle,
  Container,
  Flex,
  Grid,
  Text,
  SimpleGrid,
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import site from '@/config/site';
import _ from 'lodash';
import qs from 'qs';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import ReactPlayer from 'react-player';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;
const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

import LoadingPage from '@/components/specific/loadingPage';
import FeatureGalleryPhoto from '@/components/theme/calvert/featureGalleryPhoto';
import FeatureUcapanDoa from '@/components/theme/calvert/featureUcapanDoa';

function HouseBlessingDetail({ data, greeting }) {
  const [display, setDisplay] = useState('block');
  const [isPlaying, setIsPlaying] = useState(false);
  const [formatDay, setFormatDay] = useState();
  const [formatMonth, setFormatMonth] = useState();
  const [formatYear, setFormatYear] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const router = useRouter();
  const guest = router.query.to || 'Tamu Undangan';

  if (router.isFallback) {
    return <LoadingPage />;
  }

  const options = {
    from: 'invitation',
    guest: guest,
    id: data.id_invitation,
    code: data.theme.code,
    date: new Date(data.invitation_at),
  };

  const canonical = `${site.siteUrl}/wedding/${data.code}`;
  const noIndex = !isProduction;

  const dateWedding = options.date;

  const leading0 = (num) => {
    return num < 10 ? '0' + num : num;
  };

  const getTimeUntil = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.querySelector('body').classList.add('theme-housewarming-party');
    setFormatDay(format(dateWedding, 'd', { locale: id }));
    setFormatMonth(format(dateWedding, 'MMM', { locale: id }));
    setFormatYear(format(dateWedding, 'yyyy', { locale: id }));

    setInterval(() => getTimeUntil(dateWedding), 1000);

    return () => getTimeUntil(dateWedding);
  }, [dateWedding]);

  function handleClickTo() {
    setDisplay('none');
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      <NextSeo
        title={`Housewarming Party`}
        titleTemplate={`%s | ${site.title}`}
        description={`Please join us for a housewarming party at the new house of Sendi & Vivie`}
        canonical={canonical}
        noindex={noIndex}
        openGraph={{
          url: canonical,
          title: `Housewarming Party`,
          description: `Please join us for a housewarming party at the new house of Sendi & Vivie`,
          site_name: site.title,
          images: [
            {
              url: 'https://ik.imagekit.io/kitabikincom/invitation/theme/calvert/cover-6__ZE9NkRMt.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1656744390767',
            },
          ],
        }}
      />
      <Head>
        <link rel="stylesheet" href="/calvert/housewarming-party.css" />
      </Head>

      <Box
        bg={'var(--housewarming-party-bg-color)'}
        color={'var(--housewarming-party-color-body)'}
        fontFamily={'Inter'}
        fontSize={{ base: 'md', md: 'lg' }}
        minH={'100vh'}
      >
        {/* Kepada */}
        <Box
          position={'fixed'}
          h={'full'}
          w={'full'}
          zIndex={600}
          bg={'var(--housewarming-party-bg-color)'}
          opacity={1}
          overflowY={'hidden'}
          display={display}
        >
          <Container h={'full'} maxW={'md'} centerContent>
            <Flex
              position={'relative'}
              px={12}
              py={8}
              h={'full'}
              w={'full'}
              textAlign={'center'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDir={'column'}
            >
              {/* Kepada Image */}
              <Flex overflow={'hidden'}>
                <Image
                  src={`https://ik.imagekit.io/kitabikincom/invitation/theme/calvert/to-image-illustration-2_P-y6i1VR2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656759530574`}
                  alt={`Calvert To Image Illustration`}
                  width={100}
                  height={100}
                />
              </Flex>

              <Box color={'var(--housewarming-party-color-primary)'}>
                <Box
                  mt={2}
                  fontSize={56}
                  fontStyle={'italic'}
                  fontFamily={'Parisienne'}
                >
                  House
                </Box>

                <Box
                  mt={-6}
                  fontSize={30}
                  fontWeight={'bold'}
                  fontFamily={'Yeseva One'}
                  letterSpacing={5}
                >
                  WARMING
                </Box>
              </Box>

              {/* Kepada Title */}
              <Box mt={6} fontWeight={'bold'} fontStyle={'italic'}>
                To. Mr./Mrs.
              </Box>

              {/* Kepada Button Label */}
              <Button
                mt={8}
                bg={'white'}
                color={'var(--housewarming-party-color-body)'}
                border={'2px'}
                borderColor={'var(--housewarming-party-color-primary)'}
                borderRadius={'20px'}
                fontStyle={'italic'}
                px={8}
                _hover={{
                  bg: 'var(--housewarming-party-color-primary)',
                  color: 'white',
                }}
                onClick={handleClickTo}
              >
                Open Invitation
              </Button>
            </Flex>
          </Container>
        </Box>

        {/* Musik */}
        <Box zIndex="500">
          <Circle
            as={'button'}
            cursor="pointer"
            position="fixed"
            size="50px"
            bottom="30px"
            right="30px"
            border="2px"
            onClick={() => setIsPlaying(!isPlaying)}
            zIndex="500"
            aria-label="Music"
          >
            {isPlaying ? <MdMusicNote size={20} /> : <MdMusicOff size={20} />}
          </Circle>
          <ReactPlayer
            url={
              'https://www.youtube.com/watch?v=GOiPjl6KGxM&ab_channel=INDlyrics17'
            }
            playing={isPlaying}
            loop={true}
            style={{ display: 'none' }}
          />
        </Box>

        {/* Sampul */}
        <Box zIndex="300">
          <Box
            bgImage={`url(https://ik.imagekit.io/kitabikincom/invitation/theme/calvert/cover-6__ZE9NkRMt.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1656744390767)`}
            bgPosition={'center'}
            bgRepeat={'no-repeat'}
            bgSize={'cover'}
            h={{ base: '100vh', md: '75vh' }}
            maxH={'100vh'}
          >
            <Container h={'full'} maxW={'md'} centerContent zIndex={350}>
              <Box
                h={{ base: '100vh', md: '75vh' }}
                w={'full'}
                position={'absolute'}
                bgGradient={`linear-gradient(to-b, #FFF 20%, transparent 100%)`}
              />
              <Box
                position={'relative'}
                px={4}
                py={12}
                h={'full'}
                w={'full'}
                textAlign={'center'}
              >
                <Text fontStyle={'italic'} mb={5}>
                  Please join us for a housewarming party at the new house of
                </Text>
                <Text
                  fontFamily={'calvertHandwriting'}
                  fontSize={'6xl'}
                  color={'var(--housewarming-party-color-primary)'}
                >
                  Sendi & Vivie
                </Text>
                <Text fontStyle={'italic'} mt={3}>
                  A House is made of bricks & beams
                  <br />A Home is made of hopes & dreams
                </Text>

                <Flex
                  mt={6}
                  fontFamily={'Inter'}
                  fontWeight={'bold'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  style={{ gap: '10px' }}
                >
                  <Text fontSize={'2xl'} w={'70px'} align={'right'}>
                    {formatMonth}
                  </Text>
                  <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDir={'column'}
                  >
                    <Box
                      w={'70px'}
                      border={'1px'}
                      borderColor={'var(--housewarming-party-color-primary)'}
                    ></Box>
                    <Text my={1} mx={8} fontSize={'5xl'}>
                      {formatDay}
                    </Text>
                    <Box
                      w={'70px'}
                      border={'1px'}
                      borderColor={'var(--housewarming-party-color-primary)'}
                    ></Box>
                  </Flex>
                  <Text fontSize={'2xl'} w={'70px'} align={'left'}>
                    {formatYear}
                  </Text>
                </Flex>
              </Box>
            </Container>
          </Box>
        </Box>

        <Box position="relative" py="16">
          <Container h={'full'} maxW={'4xl'} centerContent px={6}>
            <Box
              position={'relative'}
              h={'full'}
              w={'full'}
              textAlign={'center'}
            >
              <Text
                mt={6}
                fontStyle={'italic'}
                fontWeight={'bold'}
                lineHeight={1.7}
              >
                If the Lord does not build a house, then those who build it work
                in vain.
                <br />
                (Psalm 127:1)
              </Text>

              <Text mt={16} fontFamily={'Kaushan Script'} fontSize={'3xl'}>
                House Blessing
              </Text>

              <Text mt={2} fontWeight={'bold'} fontStyle={'italic'}>
                09:00 WIB
              </Text>

              <Text mt={16} fontStyle={'italic'}>
                Kindly join us & Warm out New Home with Lovely Presence. Gift us
                your precious Blessing.
              </Text>

              <Text mt={16} fontFamily={'Kaushan Script'} fontSize={'3xl'}>
                Housewarming Party
              </Text>

              <Grid
                mt={4}
                mb="4"
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
                gap={0}
                alignItems="center"
              >
                <Flex justifyContent="center">
                  <Text
                    fontFamily="Inter"
                    textTransform="uppercase"
                    fontSize={{ base: '1.75rem', md: '2.5rem' }}
                    fontWeight={'bold'}
                    mb={{ base: 1, md: 0 }}
                  >
                    {formatMonth}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Box
                    h={{ base: '0', md: '90px' }}
                    w={{ base: '90px', md: '0' }}
                    border="1px"
                    borderColor={'var(--housewarming-party-color-primary)'}
                  ></Box>
                  <Text
                    flexShrink="1"
                    fontFamily="Inter"
                    fontWeight={'bold'}
                    fontSize="6xl"
                    lineHeight="1"
                  >
                    {formatDay}
                  </Text>
                  <Box
                    h={{ base: '0', md: '90px' }}
                    w={{ base: '90px', md: '0' }}
                    border="1px"
                    borderColor={'var(--housewarming-party-color-primary)'}
                  ></Box>
                </Flex>
                <Flex justifyContent="center">
                  <Text
                    fontFamily="Inter"
                    fontSize={{ base: '1.75rem', md: '2.5rem' }}
                    fontWeight={'bold'}
                    mt={{ base: 1, md: 0 }}
                  >
                    {formatYear}
                  </Text>
                </Flex>
              </Grid>

              <Text fontWeight={'bold'} fontStyle={'italic'}>
                Sesi 1: 12:00 WIB
              </Text>

              <Text fontWeight={'bold'} fontStyle={'italic'}>
                Sesi 2: 14:00 WIB
              </Text>

              <Text fontWeight={'bold'} fontStyle={'italic'}>
                Sesi 3: 17:00 WIB
              </Text>

              <Text mt="4" fontStyle="italic">
                Taman Kopo Indah 2 Blok C3 No.38 <br />
                (Patung Kuda)
              </Text>

              <Box mt="4">
                <Button
                  bg={'var(--housewarming-party-color-primary)'}
                  color="white"
                  size="md"
                  borderRadius="20px"
                  _hover={{ bg: 'blue.600' }}
                  fontWeight="normal"
                  px="6"
                  onClick={onOpen}
                  role={'button'}
                >
                  View Location
                </Button>

                <Modal onClose={onClose} isOpen={isOpen} size={'xl'} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Location</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <SimpleGrid columns={1} spacingX="4">
                        <Box>
                          <Button
                            bg={'var(--housewarming-party-color-primary)'}
                            color="white"
                            size="md"
                            borderRadius="20px"
                            _hover={{ bg: 'blue.600' }}
                            fontWeight="normal"
                            px="6"
                            as="a"
                            href={`https://goo.gl/maps/x5184aXehG5qVopt9`}
                            target="_blank"
                            w="full"
                          >
                            Google Maps
                          </Button>
                        </Box>
                        <Box></Box>
                      </SimpleGrid>
                      <Box mt="4">
                        <AspectRatio ratio={4 / 3}>
                          <iframe
                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.52166813956987!2d107.56229899067739!3d-6.96836427845248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68ef262b83431f%3A0xe87b225ca2771677!2sBlk.%20C3-E1%2C%20Mekar%20Rahayu%2C%20Kec.%20Margaasih%2C%20Kabupaten%20Bandung%2C%20Jawa%20Barat%2040218!5e0!3m2!1sid!2sid!4v1656498062747!5m2!1sid!2sid`}
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                          />
                        </AspectRatio>
                      </Box>
                    </ModalBody>
                    <ModalFooter />
                  </ModalContent>
                </Modal>
              </Box>

              <Container
                h="full"
                maxW="xl"
                centerContent
                py={6}
                px={{ base: '0', md: '6' }}
              >
                <Box position="relative" h="full" w="full" textAlign="center">
                  <SimpleGrid mt="4" columns={4}>
                    <Box>
                      <Text
                        fontFamily="Inter"
                        fontSize={{ base: '4xl', md: '5xl' }}
                        fontWeight="bold"
                      >
                        {leading0(days)}
                      </Text>{' '}
                      <Box
                        fontSize={{ base: 'sm', md: 'xl' }}
                        color={'var(--hazel-color-primary)'}
                        mt="-15px"
                      >
                        Days
                      </Box>
                    </Box>
                    <Box>
                      <Text
                        fontFamily="Inter"
                        fontSize={{ base: '4xl', md: '5xl' }}
                        fontWeight="bold"
                      >
                        {leading0(hours)}
                      </Text>{' '}
                      <Box
                        fontSize={{ base: 'sm', md: 'xl' }}
                        color={'var(--hazel-color-primary)'}
                        mt="-15px"
                      >
                        Hours
                      </Box>
                    </Box>
                    <Box>
                      <Text
                        fontFamily="Inter"
                        fontSize={{ base: '4xl', md: '5xl' }}
                        fontWeight="bold"
                      >
                        {leading0(minutes)}
                      </Text>{' '}
                      <Box
                        fontSize={{ base: 'sm', md: 'xl' }}
                        color={'var(--hazel-color-primary)'}
                        mt="-15px"
                      >
                        Minutes
                      </Box>
                    </Box>
                    <Box>
                      <Text
                        fontFamily="Inter"
                        fontSize={{ base: '4xl', md: '5xl' }}
                        fontWeight="bold"
                      >
                        {leading0(seconds)}
                      </Text>{' '}
                      <Box
                        fontSize={{ base: 'sm', md: 'xl' }}
                        color={'var(--hazel-color-primary)'}
                        mt="-15px"
                      >
                        Seconds
                      </Box>
                    </Box>
                  </SimpleGrid>
                </Box>
              </Container>

              <Text mt={16} fontStyle={'italic'} lineHeight={1.7}>
                Yet He filled their houses with good things, but the counsel of
                the wicked is far from me.
                <br />
                (Job 22:18)
              </Text>
            </Box>
          </Container>
        </Box>

        {/* <Box position="relative" py="16">
          <FeatureGalleryPhoto options={options} />
        </Box> */}

        <Box position="relative" py="16">
          <FeatureUcapanDoa options={options} data={greeting} />
        </Box>
      </Box>
    </>
  );
}

async function getData(params) {
  const pParams = {
    where: [{ 'event:code': 'housewarming' }],
    with: [
      { event: true },
      { theme: true },
      { invitation_feature: true },
      { invitation_feature_data: true },
    ],
  };

  const merge = qs.stringify(pParams);
  const res = await fetch(
    `${coreUrl}/v1/invitation/${params.code_invitation}?${merge}`,
  );
  const data = await res.json();

  return data;
}

async function getGreeting(idInvitation) {
  const pParams = {
    where: [
      { is_active: true },
      { is_delete: false },
      { id_invitation: idInvitation },
    ],
    sort: 'created_at:desc',
  };

  const merge = qs.stringify(pParams);
  const res = await fetch(`${coreUrl}/v1/invitation-greeting?${merge}`);
  const data = await res.json();

  return data;
}

export async function getServerSideProps() {
  const params = { code_invitation: 'housewarming-party' };
  const data = await getData(params);

  if (data.error === 1) {
    return {
      notFound: true,
    };
  }

  const greeting = await getGreeting(data.data.id_invitation);

  return { props: { data: data.data, greeting: greeting.data } };
}

HouseBlessingDetail.Layout = function getLayout(page) {
  return <ContainerBlank>{page}</ContainerBlank>;
};

export default HouseBlessingDetail;
