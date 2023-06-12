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

export { code, name, style, theme, linkTags };
