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

export { code, name, style, theme, linkTags };
