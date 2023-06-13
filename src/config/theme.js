import { extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';

import { Inter, Lora } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
});

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: lora.style.fontFamily,
    body: inter.style.fontFamily,
  },
};

const customTheme = {
  styles: {
    global: {
      body: {
        overflowX: 'hidden',
        background:
          'linear-gradient(180deg,hsla(0,0%,100%,0) 0,#fff 300px),fixed 0 0 /20px 20px radial-gradient(#d1d1d1 1px,transparent 0),fixed 10px 10px /20px 20px radial-gradient(#d1d1d1 1px,transparent 0)',
      },
      '.swiper-greeting': {
        width: '100%',
      },
    },
  },
  ...config,
};

const theme = extendTheme(customTheme, withProse());

export default theme;
