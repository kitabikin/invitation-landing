import { useEffect } from 'react';
import Head from 'next/head';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { Container, Box } from '@chakra-ui/react';
import NavbarTheme from '@/layouts/navbar/navbarTheme';
import FooterTheme from '@/layouts/footer/footerTheme';

import FeatureTo from '@/components/theme/conifer/featureTo';

import { themeAtom, isOverflowYAtom } from '@/store/coniferStore';

const THEME = [
  {
    value: 'theme-blue',
    label: 'Biru',
  },
  {
    value: 'theme-red',
    label: 'Merah',
  },
  {
    value: 'theme-green',
    label: 'Hijau',
  },
];

function ContainerConifer() {
  // const isFromTheme = options.from === 'theme';
  const isFromTheme = true;
  const [isOverflowY] = useAtom(isOverflowYAtom);

  const initialTheme = 'theme-green';
  useHydrateAtoms([[themeAtom, initialTheme]]);

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add(initialTheme);
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflowY = isOverflowY ? 'auto' : 'hidden';
  }, [isOverflowY]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/conifer/conifer.css" />
      </Head>
      {isFromTheme && (
        <NavbarTheme atom={themeAtom} theme={'Conifer'} options={THEME} />
      )}
      <Box
        mt={isFromTheme ? '73px' : 0}
        minH={'100vh'}
        bg={'var(--conifer-bg-color)'}
        color={'var(--conifer-color-body)'}
        fontSize={{ base: 'md', md: 'lg' }}
      >
        <Box
          className="conifer-to"
          position={'fixed'}
          h={isFromTheme ? 'calc(100vh - 73px)' : '100vh'}
          w={'full'}
          zIndex={600}
          bg={'var(--conifer-bg-color)'}
          opacity={1}
          overflowY={'hidden'}
        >
          <FeatureTo />
        </Box>

        <Box>Conifer Layout</Box>
      </Box>
      <FooterTheme />
    </>
  );
}

export default ContainerConifer;
