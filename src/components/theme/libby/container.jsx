import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import _ from 'lodash';
import { Box } from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';
import NavbarTheme from '@/layouts/navbar/navbarTheme';
import FooterTheme from '@/layouts/footer/footerTheme';

import {
  name as configName,
  style as configStyle,
  theme as configTheme,
  linkTags as configLinkTags,
} from '@/components/theme/libby/config';
import {
  BaseHeadStyle,
  BaseHeadLinkTags,
  BaseHeadImage,
  BaseHeadEvent,
} from '@/components/theme/wedding/baseHead';
import FeatureKepada from '@/components/theme/libby/featureKepada';
import FeatureMusik from '@/components/theme/libby/featureMusik';
import FeatureSampul from '@/components/theme/libby/featureSampul';
import FeaturePembukaan from '@/components/theme/libby/featurePembukaan';
import FeatureQuotes from '@/components/theme/libby/featureQuotes';
import FeatureDetailUnduh from '@/components/theme/libby/featureDetailUnduh';
import FeatureDetailAkad from '@/components/theme/libby/featureDetailAkad';
import FeatureDetailResepsi from '@/components/theme/libby/featureDetailResepsi';
import FeatureCountdownTimer from '@/components/theme/libby/featureCountdownTimer';
import FeaturePenutupan from '@/components/theme/libby/featurePenutupan';
import FeatureLiveWedding from '@/components/theme/libby/featureLiveWedding';
import FeatureTurutMengundang from '@/components/theme/libby/featureTurutMengundang';
import FeaturePanduanTamu from '@/components/theme/libby/featurePanduanTamu';
import FeatureProtokolKesehatan from '@/components/theme/libby/featureProtokolKesehatan';
import FeatureLoveStory from '@/components/theme/libby/featureLoveStory';
import FeatureLoveQuotes from '@/components/theme/libby/featureLoveQuotes';
import FeatureGalleryPhoto from '@/components/theme/libby/featureGalleryPhoto';
import FeatureGalleryVideo from '@/components/theme/libby/featureGalleryVideo';
import FeatureWeddingGift from '@/components/theme/libby/featureWeddingGift';
import FeatureKehadiranUcapan from '@/components/theme/libby/featureKehadiranUcapan';
import FeatureUcapanDoa from '@/components/theme/libby/featureUcapanDoa';

import { themeAtom, displayAtom, overflowYAtom } from '@/store/libbyStore';

function ContainerLibby({ options, data, greeting }) {
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
  const {
    [`${codeGeneral}-theme`]: generalTheme,
    [`${codeGeneral}-openGraph`]: generalOpenGraph,
  } = general;

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
      <BaseHeadStyle css={configStyle} />
      <BaseHeadLinkTags linkTags={configLinkTags} />

      {isFromTheme ? (
        <>
          <NavbarTheme
            atom={themeAtom}
            theme={configName}
            options={configTheme}
          />
          <BaseHeadImage image={generalOpenGraph.value} />
        </>
      ) : (
        <BaseHeadEvent
          metadata={data.metadata}
          image={generalOpenGraph.value}
        />
      )}

      {/* Main */}
      <Box
        mt={isFromTheme ? '73px' : 0}
        minH={'100vh'}
        bg={'var(--libby-bg-color)'}
        color={'var(--libby-color-body)'}
        fontFamily={'libbyBody'}
        fontSize={{ base: 'md', md: 'lg' }}
      >
        {/* Kepada */}
        <Box
          position={'fixed'}
          h={isFromTheme ? 'calc(100vh - 73px)' : '100vh'}
          w={'full'}
          zIndex={600}
          bg={'var(--libby-bg-color)'}
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

        {/* Sampul */}
        <Box zIndex="300">
          {fSampul && fSampul.is_active && (
            <FeatureSampul options={options} feature={feature} />
          )}
        </Box>

        <Box position="relative" py="24">
          {/* Pembukaan */}
          {fPembukaan && fPembukaan.is_active && (
            <FeaturePembukaan options={options} feature={feature} />
          )}
        </Box>

        <Box position="relative" py="24">
          {/* Quotes */}
          {fQuotes && fQuotes.is_active && (
            <FeatureQuotes options={options} feature={feature} />
          )}
        </Box>

        <Box position="relative" py="24">
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
          <Box position="relative" py="24">
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

        <Box position="relative" py="24">
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

        <Box position="relative" py="24">
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

export default ContainerLibby;
