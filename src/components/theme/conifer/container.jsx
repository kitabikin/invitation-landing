import { useEffect } from 'react';
import Head from 'next/head';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { Container, Box } from '@chakra-ui/react';
import NavbarTheme from '@/layouts/navbar/navbarTheme';
import FooterTheme from '@/layouts/footer/footerTheme';

import FeatureTo from '@/components/theme/conifer/featureTo';

import { themeAtom, displayAtom } from '@/store/coniferStore';

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
  const [display] = useAtom(displayAtom);

  const initialTheme = 'theme-green';
  useHydrateAtoms([[themeAtom, initialTheme]]);

  useEffect(() => {
    document.querySelector('body').classList.add(initialTheme);
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/conifer/conifer.css" />
      </Head>
      <NavbarTheme atom={themeAtom} theme={'Conifer'} options={THEME} />
      <Box
        mt={{
          base: isFromTheme ? '8rem' : 0,
          md: isFromTheme ? '5.5rem' : 0,
        }}
        bg={'var(--conifer-bg-color)'}
        color={'var(--conifer-color-body)'}
        fontSize={{ base: 'md', md: 'lg' }}
        minH={'100vh'}
      >
        <Box
          position={'fixed'}
          h={'full'}
          w={'full'}
          zIndex={600}
          bg={'var(--conifer-bg-color)'}
          opacity={1}
          overflowY={'hidden'}
          display={display}
        >
          <FeatureTo />
        </Box>
      </Box>
      <FooterTheme />
    </>
  );
}

export default ContainerConifer;
