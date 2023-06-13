import localFont from 'next/font/local';
import { EB_Garamond, Libre_Bodoni } from 'next/font/google';

const code = 'hazel';
const name = 'Hazel';
const style = '/hazel/hazel.css';
const theme = [
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
const linkTags = [
  {
    rel: 'preload',
    href: `https://fonts.gstatic.com/s/librebodoni/v2/_Xmr-H45qDWDYULr5OfyZud9wQiR.woff2`,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: `/hazel/FallInLove.ttf`,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: `/hazel/Sienthas.otf`,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
];
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--hazel-font-body',
});
const filHeading = localFont({
  src: './fonts/FallInLove.ttf',
  variable: '--hazel-font-heading',
});
const libreBodoni = Libre_Bodoni({
  subsets: ['latin'],
  display: 'swap',
  variable: '--hazel-font-title',
});
const sHandwriting = localFont({
  src: './fonts/Sienthas.otf',
  variable: '--hazel-font-handwriting',
});

export {
  code,
  name,
  style,
  theme,
  linkTags,
  ebGaramond,
  filHeading,
  libreBodoni,
  sHandwriting,
};
