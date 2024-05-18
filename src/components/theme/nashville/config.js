const code = 'nashville';
const name = 'Nashville';
const style = '/nashville/nashville.css';
const linkTags = [
  {
    rel: 'preload',
    href: `/nashville/TheBlacklight.ttf`,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: `/nashville/OptimusPrinceps.ttf`,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: `/nashville/StylishCalligraphy.ttf`,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: `/nashville/Millerstone.ttf`,
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
];

export { code, name, style, linkTags };
