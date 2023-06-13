import Head from 'next/head';
import { NextSeo, EventJsonLd } from 'next-seo';
import site from '@/config/site';
import _ from 'lodash';

function BaseHeadStyle({ css }) {
  return (
    <Head>
      <link rel="preload" href={css} as="style" />
      <link rel="stylesheet" href={css} />
    </Head>
  );
}

function BaseHeadLinkTags({ linkTags }) {
  return <NextSeo additionalLinkTags={linkTags} />;
}

function BaseHeadImage({ image }) {
  return (
    <NextSeo
      openGraph={{
        images: [{ url: image }],
      }}
    />
  );
}

function BaseHeadEvent({ metadata, image }) {
  if (!_.isEmpty(metadata)) {
    const parse = JSON.parse(metadata);
    const {
      name,
      startDate,
      endDate,
      locationName,
      locationSameAs,
      locationStreetAddress,
      locationAddressLocality,
      locationAddressRegion,
      locationPostalCode,
      locationAddressCountry,
      url,
      images,
      description,
    } = parse;

    return (
      <>
        <BaseHeadImage image={images} />
        <EventJsonLd
          name={name}
          startDate={startDate}
          endDate={endDate}
          location={{
            name: locationName,
            sameAs: locationSameAs,
            address: {
              streetAddress: locationStreetAddress,
              addressLocality: locationAddressLocality,
              addressRegion: locationAddressRegion,
              postalCode: locationPostalCode,
              addressCountry: locationAddressCountry,
            },
          }}
          url={url}
          images={[images]}
          description={description}
          organizer={{
            type: 'Organization',
            name: site.author,
            url: site.siteUrl,
          }}
        />
      </>
    );
  }

  return <BaseHeadImage image={image} />;
}

export { BaseHeadStyle, BaseHeadLinkTags, BaseHeadImage, BaseHeadEvent };
