import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import _ from 'lodash'
import { Container, Box } from '@chakra-ui/react'

import FeatureKepada from '@/components/theme/nashville/featureKepada'
import FeatureMusik from '@/components/theme/nashville/featureMusik'
import FeatureSampul from '@/components/theme/nashville/featureSampul'
import FeaturePembukaan from '@/components/theme/nashville/featurePembukaan'
import FeatureQuotes from '@/components/theme/nashville/featureQuotes'
import FeatureDetailUnduh from '@/components/theme/nashville/featureDetailUnduh'
import FeatureDetailAkad from '@/components/theme/nashville/featureDetailAkad'
import FeatureDetailResepsi from '@/components/theme/nashville/featureDetailResepsi'
import FeatureCountdownTimer from '@/components/theme/nashville/featureCountdownTimer'
import FeaturePenutupan from '@/components/theme/nashville/featurePenutupan'
import FeatureLiveWedding from '@/components/theme/nashville/featureLiveWedding'
import FeatureTurutMengundang from '@/components/theme/nashville/featureTurutMengundang'
import FeaturePanduanTamu from '@/components/theme/nashville/featurePanduanTamu'
import FeatureProtokolKesehatan from '@/components/theme/nashville/featureProtokolKesehatan'
import FeatureLoveStory from '@/components/theme/nashville/featureLoveStory'
import FeatureLoveQuotes from '@/components/theme/nashville/featureLoveQuotes'
import FeatureGalleryPhoto from '@/components/theme/nashville/featureGalleryPhoto'
import FeatureGalleryVideo from '@/components/theme/nashville/featureGalleryVideo'
import FeatureKehadiranUcapan from '@/components/theme/nashville/featureKehadiranUcapan'
import FeatureUcapanDoa from '@/components/theme/nashville/featureUcapanDoa'

function ContainerNashville({ options, data }) {
  const [display, setDisplay] = useState('block')
  const [isPlaying, setIsPlaying] = useState(false)

  // Get Data ==================================================================
  // Feature
  const feature = data.feature.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
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
    [`${options.code}-kehadiranUcapan`]: fKehadiranUcapan,
    [`${options.code}-ucapanDoa`]: fUcapanDoa,
  } = feature

  // General
  const codeGeneral = `${options.code}-general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGeneral}-bgColor`]: generalBgColor,
    [`${codeGeneral}-colorBody`]: generalColorBody,
    [`${codeGeneral}-bgLeaf`]: generalBgLeaf,
    [`${codeGeneral}-bgSection1`]: generalBgSection1,
    [`${codeGeneral}-bgSection2`]: generalBgSection2,
    [`${codeGeneral}-bgSection3`]: generalBgSection3,
    [`${codeGeneral}-bgHr`]: generalBgHr,
  } = general

  // Function ==================================================================
  function handleClickKepada() {
    setDisplay('none')
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/fonts/nashville/nashville.css" />
      </Head>
      <Box color={generalColorBody.value} fontFamily="nashvilleBody" mb="32">
        {/* Musik */}
        <Box zIndex="400">
          {fMusik && fMusik.is_active && (
            <FeatureMusik
              options={options}
              feature={feature}
              isPlaying={isPlaying}
              onPlayingChange={() => setIsPlaying(!isPlaying)}
            />
          )}
        </Box>

        <Box
          position="fixed"
          h="full"
          w="full"
          zIndex="500"
          bg={generalBgColor.value}
          opacity="1"
          overflowY="hidden"
          display={display}
        >
          {/* Kepada */}
          {fKepada && fKepada.is_active && (
            <FeatureKepada
              options={options}
              feature={feature}
              display={display}
              onDisplayChange={handleClickKepada}
            />
          )}
        </Box>

        <Box zIndex="300">
          {/* Sampul */}
          {fSampul && fSampul.is_active && (
            <FeatureSampul options={options} feature={feature} />
          )}
        </Box>

        <Box
          position="relative"
          py="24"
          _before={{
            bgImage: `url('${generalBgSection1.value}')`,
            bgPosition: 'top right',
            bgRepeat: 'no-repeat',
            bgSize: 'contain',
            content: "''",
            display: 'block',
            height: { base: '234px', md: '160px' },
            width: { base: 'calc(100% + 130px)', md: '100%' },
            zIndex: '99',
            position: 'absolute',
            top: { base: '-70px', md: '-100px' },
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
            bgImage: `url('${generalBgLeaf.value}')`,
            bgPosition: 'top left',
            bgRepeat: 'no-repeat',
            bgSize: 'contain',
            content: "''",
            display: 'block',
            height: { base: '234px', md: '260px' },
            width: { base: 'calc(100% + 130px)', md: '100%' },
            zIndex: '99',
            position: 'absolute',
            top: { base: '-90px', md: '-100px' },
            left: { base: '-65px', md: '-70px' },
          }}
          _after={{
            bgImage: `url('${generalBgSection2.value}')`,
            bgPosition: 'top right',
            bgRepeat: 'no-repeat',
            bgSize: 'contain',
            content: "''",
            display: 'block',
            height: { base: '234px', md: '160px' },
            width: { base: 'calc(100% + 500px)', md: '100%' },
            zIndex: '99',
            position: 'absolute',
            top: { base: '-90px', md: '-100px' },
            right: { base: '-650px', md: '-550px' },
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

        <Box
          position="relative"
          py="24"
          _before={{
            bgImage: `url('${generalBgSection3.value}')`,
            bgPosition: 'top left',
            bgRepeat: 'no-repeat',
            bgSize: 'contain',
            content: "''",
            display: 'block',
            height: { base: '234px', md: '160px' },
            width: { base: 'calc(100% + 130px)', md: '100%' },
            zIndex: '99',
            position: 'absolute',
            top: { base: '10px', md: '-10px' },
            left: { base: '-110px', md: '-260px' },
          }}
        >
          <Container h="full" maxW="2xl" centerContent pt="14" px="10">
            <Box position="relative" h="full" w="full" textAlign="center">
              {/* General Hr */}
              <Box mb="4">
                <Image
                  src={generalBgHr.value}
                  alt={generalBgHr.label}
                  width="100"
                  height="42.77"
                />
              </Box>
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

        <Box position="relative" py="24">
          <Container h="full" maxW="2xl" centerContent pt="14" px="10">
            <Box position="relative" h="full" w="full" textAlign="center">
              {/* General Hr */}
              <Box mb="4">
                <Image
                  src={generalBgHr.value}
                  alt={generalBgHr.label}
                  width="100"
                  height="42.77"
                />
              </Box>
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

        <Box position="relative" py="24">
          <Container h="full" maxW="2xl" centerContent pt="14" px="10">
            <Box position="relative" h="full" w="full" textAlign="center">
              {/* General Hr */}
              <Box mb="4">
                <Image
                  src={generalBgHr.value}
                  alt={generalBgHr.label}
                  width="100"
                  height="42.77"
                />
              </Box>
            </Box>
          </Container>

          {/* Kehadiran Ucapan */}
          {fKehadiranUcapan && fKehadiranUcapan.is_active && (
            <FeatureKehadiranUcapan options={options} feature={feature} />
          )}

          {/* Ucapan Doa */}
          {fUcapanDoa && fUcapanDoa.is_active && (
            <FeatureUcapanDoa
              options={options}
              feature={feature}
              data={
                options.from === 'theme'
                  ? data.theme_greeting
                  : data.invitation_greeting
              }
            />
          )}
        </Box>
      </Box>
    </>
  )
}

export default ContainerNashville
