import site from '@/config/site';
import qs from 'qs';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

const Sitemap = () => {};

async function getEvent() {
  const pParams = {
    where: [{ is_active: true }],
    sort: 'name:asc',
  };
  const merge = qs.stringify(pParams);
  const res = await fetch(`${coreUrl}/v1/event?${merge}`);
  const data = await res.json();

  return data;
}

async function getTheme(eventCode) {
  const pParams = {
    where: [
      { is_active: true },
      { 'theme_category:is_active': true },
      { 'event:code': eventCode },
    ],
    with: [{ theme_category: true }, { event: true }],
  };
  const merge = qs.stringify(pParams);
  const res = await fetch(`${coreUrl}/v1/theme?${merge}`);
  const data = await res.json();

  return data;
}

async function getInvitation() {
  const pParams = {
    where: [{ is_active: true }],
    with: [{ event: true }],
  };
  const merge = qs.stringify(pParams);
  const res = await fetch(`${coreUrl}/v1/invitation?${merge}`);
  const data = await res.json();

  return data;
}

export const getServerSideProps = async ({ res }) => {
  const baseUrl = site.siteUrl;

  // Static
  const staticPages = ['', 'event', 'contact'].map((staticPagePath) => {
    return `${baseUrl}/${staticPagePath}`;
  });

  // Event
  const eventPages = await getEvent();

  // Theme
  const themePages = [];
  await Promise.all(
    eventPages.data.map(async (event) => {
      const theme = await getTheme(event.code);
      theme.error === 0 &&
        theme.data.map((theme) => {
          themePages.push({
            url: `${baseUrl}/event/${event.code}/${theme.code}`,
            modified_at: theme.modified_at,
          });
        });
    }),
  );

  // Invitation
  const invitationPages = await getInvitation();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
      ${eventPages.data
        .map(({ code, modified_at }) => {
          return `
              <url>
                <loc>${baseUrl}/event/${code}</loc>
                <lastmod>${modified_at}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
        })
        .join('')}
      ${themePages
        .map(({ url, modified_at }) => {
          return `
              <url>
                <loc>${url}</loc>
                <lastmod>${modified_at}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
        })
        .join('')}
      ${invitationPages.data
        .map(({ code, event }) => {
          return `
              <url>
                <loc>${baseUrl}/${event.code}/${code}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.5</priority>
              </url>
            `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
