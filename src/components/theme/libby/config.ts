import localFont from 'next/font/local';
import { Quicksand } from 'next/font/google';

const code = 'libby';
const name = 'Libby';
const style = '/libby/libby.css';
const theme = [
  {
    value: 'theme-gray',
    label: 'Abu-abu',
  },
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
    href: `https://fonts.gstatic.com/s/quicksand/v30/6xKtdSZaM9iE8KbpRA_hK1QN.woff2`,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: `/libby/LeGrand.ttf`,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: `/libby/Sienthas.otf`,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
];
const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--libby-font-body',
});
const lgTitle = localFont({
  src: './fonts/LeGrand.ttf',
  variable: '--libby-font-title',
});
const sHandwriting = localFont({
  src: './fonts/Sienthas.otf',
  variable: '--libby-font-handwriting',
});

export { code, name, style, theme, linkTags, quicksand, lgTitle, sHandwriting };
