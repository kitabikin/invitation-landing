import {
  Box,
  Flex,
  Icon,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';

import { BiBuildingHouse } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import { FaRegBuilding } from 'react-icons/fa';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { ImManWoman, ImQuotesLeft } from 'react-icons/im';
import { IoMdGlobe } from 'react-icons/io';
import { MdOutlineSubtitles, MdTimer, MdOutlineMasks } from 'react-icons/md';
import {
  RiRoadMapLine,
  RiInstagramLine,
  RiUser3Line,
  RiHeart2Line,
  RiHandHeartLine,
  RiImage2Line,
  RiVideoLine,
  RiMailLine,
  RiBookLine,
  RiUserSmileLine,
  RiMusicLine,
  RiSnowyLine,
} from 'react-icons/ri';

const FEATURE_ITEMS = [
  {
    label: 'Domain Undangan',
    icon: IoMdGlobe,
  },
  {
    label: 'Header Undangan',
    icon: MdOutlineSubtitles,
  },
  {
    label: 'Informasi Mempelai',
    icon: ImManWoman,
  },
  {
    label: 'Quotes',
    icon: ImQuotesLeft,
  },
  {
    label: 'Unduh Mantu',
    icon: BiBuildingHouse,
  },
  {
    label: 'Akad Nikah',
    icon: HiOutlineOfficeBuilding,
  },
  {
    label: 'Resepsi Nikah',
    icon: FaRegBuilding,
  },
  {
    label: 'Kalender',
    icon: BsCalendarDate,
  },
  {
    label: 'Peta Lokasi',
    icon: RiRoadMapLine,
  },
  {
    label: 'Countdown Timer',
    icon: MdTimer,
  },
  {
    label: 'Live Wedding',
    icon: RiInstagramLine,
  },
  {
    label: 'Turut Mengundang',
    icon: RiMailLine,
  },
  {
    label: 'Panduan Tamu',
    icon: RiUser3Line,
  },
  {
    label: 'Protokol Kesehatan',
    icon: MdOutlineMasks,
  },
  {
    label: 'Love Story',
    icon: RiHeart2Line,
  },
  {
    label: 'Love Quotes',
    icon: RiHandHeartLine,
  },
  {
    label: 'Galeri Foto',
    icon: RiImage2Line,
  },
  {
    label: 'Galeri Video',
    icon: RiVideoLine,
  },
  {
    label: 'Konfirmasi Kehadiran',
    icon: RiBookLine,
  },
  {
    label: 'Ucapan & Doa',
    icon: RiUserSmileLine,
  },
  {
    label: 'Music',
    icon: RiMusicLine,
  },
  {
    label: 'Falling Animation',
    icon: RiSnowyLine,
  },
];

function HomeHero() {
  return (
    <Box>
      <Text
        as={'h2'}
        fontWeight={700}
        fontSize={{ base: '2xl', md: '3xl' }}
        lineHeight={1.25}
        textAlign={'center'}
      >
        Fitur
      </Text>
      <Tabs variant="soft-rounded" colorScheme="green" mt={8} id={'feature'}>
        <TabList justifyContent={'center'}>
          <Tab>Pernikahan</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <SimpleGrid columns={[2, null, 4]} spacing="24px">
              {FEATURE_ITEMS.map((item) => (
                <Box key={item.label} p={6} boxShadow="md" rounded="md">
                  <Flex
                    w={'32px'}
                    h={'32px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={'full'}
                    bg={'gray.100'}
                    color={'gray.700'}
                  >
                    <Icon as={item.icon} size={16}></Icon>
                  </Flex>
                  <Box mt={4} fontWeight={600}>
                    {item.label}
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default HomeHero;
