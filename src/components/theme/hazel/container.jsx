import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import _ from 'lodash';
import { Container, Box } from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';
import NavbarTheme from '@/layouts/navbar/navbarTheme';
import FooterTheme from '@/layouts/footer/footerTheme';

// import localFont from '@next/font/local';
// import {
//   EB_Garamond as hazelBody,
//   Libre_Bodoni as hazelTitle,
// } from '@next/font/google';
// const hazelHeading = localFont({ src: '/hazel/FallInLove.ttf' });
// const hazelHandwriting = localFont({ src: '/hazel/Sienthas.otf' });

import FeatureKepada from '@/components/theme/hazel/featureKepada';
import FeatureMusik from '@/components/theme/hazel/featureMusik';
import FeatureSnowflakes from '@/components/theme/hazel/featureSnowflakes';
import FeatureSampul from '@/components/theme/hazel/featureSampul';
import FeaturePembukaan from '@/components/theme/hazel/featurePembukaan';
import FeatureQuotes from '@/components/theme/hazel/featureQuotes';
import FeatureDetailUnduh from '@/components/theme/hazel/featureDetailUnduh';
import FeatureDetailAkad from '@/components/theme/hazel/featureDetailAkad';
import FeatureDetailResepsi from '@/components/theme/hazel/featureDetailResepsi';
import FeatureCountdownTimer from '@/components/theme/hazel/featureCountdownTimer';
import FeaturePenutupan from '@/components/theme/hazel/featurePenutupan';
import FeatureLiveWedding from '@/components/theme/hazel/featureLiveWedding';
import FeatureTurutMengundang from '@/components/theme/hazel/featureTurutMengundang';
import FeaturePanduanTamu from '@/components/theme/hazel/featurePanduanTamu';
import FeatureProtokolKesehatan from '@/components/theme/hazel/featureProtokolKesehatan';
import FeatureLoveStory from '@/components/theme/hazel/featureLoveStory';
import FeatureLoveQuotes from '@/components/theme/hazel/featureLoveQuotes';
import FeatureGalleryPhoto from '@/components/theme/hazel/featureGalleryPhoto';
import FeatureGalleryVideo from '@/components/theme/hazel/featureGalleryVideo';
import FeatureWeddingGift from '@/components/theme/hazel/featureWeddingGift';
import FeatureKehadiranUcapan from '@/components/theme/hazel/featureKehadiranUcapan';
import FeatureUcapanDoa from '@/components/theme/hazel/featureUcapanDoa';

import { themeAtom, displayAtom, overflowYAtom } from '@/store/hazelStore';

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

function ContainerHazel({ options, data, greeting }) {
  const router = useRouter();
  const isFromTheme = options.from === 'theme';
  const [display] = useAtom(displayAtom);
  const [overflowY] = useAtom(overflowYAtom);

  const scroll = router.query.scroll || 'true';
  const isScroll = scroll === 'true';

  // Get Data ==================================================================
  // Feature
  const feature = reduceFeature(data.feature);
  const {
    [`${options.code}-kepada`]: fKepada,
    [`${options.code}-musik`]: fMusik,
    [`${options.code}-snowflakes`]: fSnowflakes,
    [`${options.code}-sampul`]: fSampul,
    [`${options.code}-pembukaan`]: fPembukaan,
    [`${options.code}-quotes`]: fQuotes,
    [`${options.code}-detailUnduh`]: fDetailUnduh,
    [`${options.code}-detailAkad`]: fDetailAkad,
    [`${options.code}-detailResepsi`]: fDetailResepsi,
    [`${options.code}-countdownTimer`]: fCountdownTimer,
    [`${options.code}-penutupan`]: fPenutupan,
    [`${options.code}-liveWedding`]: fLiveWedding,
    [`${options.code}-turutMengundang`]: fTurutMengundang,
    [`${options.code}-panduanTamu`]: fPanduanTamu,
    [`${options.code}-protokolKesehatan`]: fProtokolKesehatan,
    [`${options.code}-loveStory`]: fLoveStory,
    [`${options.code}-loveQuotes`]: fLoveQuotes,
    [`${options.code}-galleryPhoto`]: fGalleryPhoto,
    [`${options.code}-galleryVideo`]: fGalleryVideo,
    [`${options.code}-weddingGift`]: fWeddingGift,
    [`${options.code}-kehadiranUcapan`]: fKehadiranUcapan,
    [`${options.code}-ucapanDoa`]: fUcapanDoa,
  } = feature;

  // General
  const codeGeneral = `${options.code}-general`;
  const general = reduceFeature(feature[codeGeneral].column);
  const { [`${codeGeneral}-theme`]: generalTheme } = general;

  const initialTheme = `theme-${generalTheme.value}`;
  useHydrateAtoms([[themeAtom, initialTheme]]);

  useEffect(() => {
    document.querySelector('body').classList.add(initialTheme);
    document
      .querySelector('body')
      .classList.add(!isScroll ? 'no-scroll' : null);
  }, []);

  useEffect(() => {
    document.querySelector('body').style.overflowY = overflowY;
  }, [overflowY]);

  // Section
  const section4 = (
    fLiveWedding,
    fTurutMengundang,
    fPanduanTamu,
    fProtokolKesehatan,
  ) => {
    if (
      (fLiveWedding && fLiveWedding.is_active) ||
      (fTurutMengundang && fTurutMengundang.is_active) ||
      (fPanduanTamu && fPanduanTamu.is_active) ||
      (fProtokolKesehatan && fProtokolKesehatan.is_active)
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/hazel/hazel.css" />
      </Head>
      <NextSeo
        additionalLinkTags={[
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
        ]}
      />
      {isFromTheme && (
        <NavbarTheme atom={themeAtom} theme={'Hazel'} options={THEME} />
      )}
      <Box
        mt={isFromTheme ? '73px' : 0}
        minH={'100vh'}
        bg={'var(--hazel-bg-color)'}
        color={'var(--hazel-color-body)'}
        fontFamily={'hazelBody'}
        fontSize={{ base: 'md', md: 'lg' }}
      >
        {/* Kepada */}
        <Box
          position={'fixed'}
          h={isFromTheme ? 'calc(100vh - 73px)' : '100vh'}
          w={'full'}
          zIndex={600}
          bg={'var(--hazel-bg-color)'}
          opacity={1}
          overflowY={'hidden'}
          display={display}
        >
          {fKepada && fKepada.is_active && (
            <FeatureKepada options={options} feature={feature} />
          )}
        </Box>

        {/* Musik */}
        <Box zIndex="500">
          {fMusik && fMusik.is_active && (
            <FeatureMusik options={options} feature={feature} />
          )}
        </Box>

        {/* Snowflake */}
        <Box zIndex="400" position={'relative'}>
          {fSnowflakes && fSnowflakes.is_active && (
            <FeatureSnowflakes options={options} feature={feature} />
          )}
        </Box>

        {/* Sampul */}
        <Box zIndex="300">
          {fSampul && fSampul.is_active && (
            <FeatureSampul options={options} feature={feature} />
          )}
        </Box>

        <Box
          position="relative"
          py="24"
          _before={{
            bgImage: 'var(--hazel-bg-section-1)',
            bgPosition: 'top right',
            bgRepeat: 'no-repeat',
            bgSize: 'contain',
            content: "''",
            display: 'block',
            height: { base: '200px', md: '280px' },
            width: { base: 'calc(100% + 130px)', md: '100%' },
            zIndex: '99',
            position: 'absolute',
            top: { base: '-140px', md: '-200px' },
            right: { base: '-65px', md: '-90px' },
          }}
        >
          {/* Pembukaan */}
          {fPembukaan && fPembukaan.is_active && (
            <FeaturePembukaan options={options} feature={feature} />
          )}

          {/* Quotes */}
          {fQuotes && fQuotes.is_active && (
            <FeatureQuotes options={options} feature={feature} />
          )}
        </Box>

        <Box
          position="relative"
          pt="24"
          _before={{
            bgImage: `var(--hazel-bg-section-2)`,
            bgPosition: 'top left',
            bgRepeat: 'no-repeat',
            bgSize: 'contain',
            content: "''",
            display: 'block',
            height: { base: '200px', md: '300px' },
            width: { base: 'calc(100% + 130px)', md: '100%' },
            zIndex: '99',
            position: 'absolute',
            top: { base: '-100px', md: '-125px' },
            left: { base: '-25px', md: '0px' },
          }}
          _after={{
            bgImage: `var(--hazel-bg-section-3)`,
            bgPosition: 'top right',
            bgRepeat: 'no-repeat',
            bgSize: 'contain',
            content: "''",
            display: 'block',
            height: { base: '100px', md: '150px' },
            width: { base: 'calc(100% + 500px)', md: '100%' },
            zIndex: '99',
            position: 'absolute',
            top: { base: '-65px', md: '-75px' },
            right: { base: '-25px', md: '0px' },
          }}
        >
          {/* Detail Unduh */}
          {fDetailUnduh && fDetailUnduh.is_active && (
            <FeatureDetailUnduh options={options} feature={feature} />
          )}

          {/* Detail Akad */}
          {fDetailAkad && fDetailAkad.is_active && (
            <FeatureDetailAkad options={options} feature={feature} />
          )}

          {/* Detail Resepsi */}
          {fDetailResepsi && fDetailResepsi.is_active && (
            <FeatureDetailResepsi options={options} feature={feature} />
          )}

          {/* Countdown Timer */}
          {fCountdownTimer && fCountdownTimer.is_active && (
            <FeatureCountdownTimer options={options} feature={feature} />
          )}

          {/* Penutupan */}
          {fPenutupan && fPenutupan.is_active && (
            <FeaturePenutupan options={options} feature={feature} />
          )}
        </Box>

        {section4(
          fLiveWedding,
          fTurutMengundang,
          fPanduanTamu,
          fProtokolKesehatan,
        ) && (
          <Box
            position="relative"
            py="24"
            _before={{
              bgImage: `var(--hazel-bg-section-4)`,
              bgPosition: 'top left',
              bgRepeat: 'no-repeat',
              bgSize: 'contain',
              content: "''",
              display: 'block',
              height: { base: '150px', md: '190px' },
              width: { base: 'calc(100% + 130px)', md: '100%' },
              zIndex: '99',
              position: 'absolute',
              top: { base: '10px', md: '10px' },
              left: { base: '-80px', md: 0 },
            }}
          >
            <Container h="full" maxW="2xl" centerContent pt="14" px="10" mb={6}>
              <Box position="relative" h="full" w="full" textAlign="center">
                {/* General Hr */}
                <Box
                  mt={6}
                  bgImage={'var(--hazel-bg-hr)'}
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  bgSize="contain"
                  h="75"
                />
              </Box>
            </Container>

            {/* Live Wedding */}
            {fLiveWedding && fLiveWedding.is_active && (
              <FeatureLiveWedding options={options} feature={feature} />
            )}

            {/* Turut Mengundang */}
            {fTurutMengundang && fTurutMengundang.is_active && (
              <FeatureTurutMengundang options={options} feature={feature} />
            )}

            {/* Panduan Tamu */}
            {fPanduanTamu && fPanduanTamu.is_active && (
              <FeaturePanduanTamu options={options} feature={feature} />
            )}

            {/* Protokol Kesehatan */}
            {fProtokolKesehatan && fProtokolKesehatan.is_active && (
              <FeatureProtokolKesehatan options={options} feature={feature} />
            )}
          </Box>
        )}

        <Box
          position="relative"
          py="24"
          _after={{
            bgImage: `var(--hazel-bg-section-2)`,
            bgPosition: 'top left',
            bgRepeat: 'no-repeat',
            bgSize: 'contain',
            content: "''",
            display: 'block',
            height: { base: '200px', md: '300px' },
            width: { base: 'calc(100% + 130px)', md: '100%' },
            zIndex: '99',
            position: 'absolute',
            top: {
              base: section4(
                fLiveWedding,
                fTurutMengundang,
                fPanduanTamu,
                fProtokolKesehatan,
              )
                ? '-100px'
                : '-10px',
              md: '-125px',
            },
            right: { base: '-25px', md: '0px' },
            transform: 'scaleX(-1)',
          }}
        >
          <Container h="full" maxW="2xl" centerContent pt="14" px="10" mb={6}>
            <Box position="relative" h="full" w="full" textAlign="center">
              {/* General Hr */}
              <Box
                mt={6}
                bgImage={'var(--hazel-bg-hr)'}
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="contain"
                h="75"
              />
            </Box>
          </Container>

          {/* Love Story */}
          {fLoveStory && fLoveStory.is_active && (
            <FeatureLoveStory options={options} feature={feature} />
          )}

          {/* Love Quotes */}
          {fLoveQuotes && fLoveQuotes.is_active && (
            <FeatureLoveQuotes options={options} feature={feature} />
          )}

          {/* Gallery Photo */}
          {fGalleryPhoto && fGalleryPhoto.is_active && (
            <FeatureGalleryPhoto options={options} feature={feature} />
          )}

          {/* Gallery Video */}
          {fGalleryVideo && fGalleryVideo.is_active && (
            <FeatureGalleryVideo options={options} feature={feature} />
          )}
        </Box>

        <Box
          position="relative"
          py="24"
          _before={{
            bgImage: `var(--hazel-bg-section-3)`,
            bgPosition: 'top right',
            bgRepeat: 'no-repeat',
            bgSize: 'contain',
            content: "''",
            display: 'block',
            height: { base: '100px', md: '150px' },
            width: { base: 'calc(100% + 500px)', md: '100%' },
            zIndex: '99',
            position: 'absolute',
            top: { base: '-65px', md: '-75px' },
            left: { base: '-25px', md: '0px' },
            transform: 'scaleX(-1)',
          }}
        >
          <Container h="full" maxW="2xl" centerContent pt="14" px="10" mb={6}>
            <Box position="relative" h="full" w="full" textAlign="center">
              {/* General Hr */}
              <Box
                mt={6}
                bgImage={'var(--hazel-bg-hr)'}
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="contain"
                h="75"
              />
            </Box>
          </Container>

          {/* Wedding Gift */}
          {fWeddingGift && fWeddingGift.is_active && (
            <FeatureWeddingGift options={options} feature={feature} />
          )}

          {/* Kehadiran Ucapan */}
          {fKehadiranUcapan && fKehadiranUcapan.is_active && (
            <FeatureKehadiranUcapan options={options} feature={feature} />
          )}

          {/* Ucapan Doa */}
          {fUcapanDoa && fUcapanDoa.is_active && (
            <FeatureUcapanDoa
              options={options}
              feature={feature}
              data={options.from === 'theme' ? data.theme_greeting : greeting}
            />
          )}
        </Box>
      </Box>
      <FooterTheme />
    </>
  );
}

export default ContainerHazel;
