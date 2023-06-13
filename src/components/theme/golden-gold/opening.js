import Image from "next/legacy/image"

import _ from 'lodash'
import { Container, Box } from '@chakra-ui/react'
import ImageFrame from '@/components/specific/imageFrame'

import Quotes from '@/components/theme/golden-gold/quotes'

function Opening({ options, feature }) {
  const code = 'golden-gold'

  // Feature
  const { [`${code}_quotes`]: fQuotes } = feature

  // General
  const codeGeneral = `${code}_general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGeneral}_background`]: gBg,
    [`${codeGeneral}_background-between-quotes-event-detail-after`]: gBgAfter,
  } = general

  // Opening
  const codeOpening = `${code}_opening`
  const opening = feature[codeOpening].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeOpening}_saying`]: oSaying,
    [`${codeOpening}_greeting`]: oGreeting,
    [`${codeOpening}_sentence`]: oSentence,
    [`${codeOpening}_frame`]: oFrame,
    [`${codeOpening}_groom-photo`]: oGroomPhoto,
    [`${codeOpening}_groom-fullname`]: oGroomFullname,
    [`${codeOpening}_groom-son`]: oGroomSon,
    [`${codeOpening}_groom-son-to`]: oGroomSonTo,
    [`${codeOpening}_groom-from-couple`]: oGroomFromCouple,
    [`${codeOpening}_groom-father-name`]: oGroomFatherName,
    [`${codeOpening}_groom-couple-and`]: oGroomCoupleAnd,
    [`${codeOpening}_groom-mother-name`]: oGroomMotherName,
    [`${codeOpening}_couple-and`]: oCoupleAnd,
    [`${codeOpening}_bride-photo`]: oBridePhoto,
    [`${codeOpening}_bride-fullname`]: oBrideFullname,
    [`${codeOpening}_bride-son`]: oBrideSon,
    [`${codeOpening}_bride-son-to`]: oBrideSonTo,
    [`${codeOpening}_bride-from-couple`]: oBrideFromCouple,
    [`${codeOpening}_bride-father-name`]: oBrideFatherName,
    [`${codeOpening}_bride-couple-and`]: oBrideCoupleAnd,
    [`${codeOpening}_bride-mother-name`]: oBrideMotherName,
  } = opening

  return (
    <>
      <Box
        position="relative"
        _after={{
          bgImage: `url('${gBgAfter.value}')`,
          bgPosition: 'bottom right',
          bgRepeat: 'no-repeat',
          bgSize: 'contain',
          content: "''",
          display: 'block',
          height: '140px',
          width: '100%',
          zIndex: '99',
          position: 'absolute',
          bottom: '-50px',
          right: '0',
        }}
      >
        <Box
          bgImage={`url('${gBg.value}')`}
          bgPosition="center center"
          bgRepeat="repeat"
          bgSize="300px 300px"
          pt="24"
          pb="24"
        >
          <Container h="full" maxW="4xl" centerContent>
            <Box
              position="relative"
              px="4"
              py="8"
              h="full"
              w="full"
              textAlign="center"
            >
              {/* Opening Saying */}
              {oSaying && oSaying.is_active && (
                <Image
                  src={oSaying.value}
                  alt={oSaying.label}
                  width="192"
                  height="62"
                />
              )}

              {/* Opening Saying */}
              {oGreeting && oGreeting && (
                <Box mt="5" fontSize="xl">
                  {oGreeting.value}
                </Box>
              )}

              {/* Opening Saying */}
              {oSentence && oSentence && <Box mt="3">{oSentence.value}</Box>}

              {/* Groom */}
              {/* Groom Photo */}
              {oGroomPhoto && oGroomPhoto && (
                <Box mt="16" position="relative" w="full">
                  <ImageFrame frame={oFrame} image={oGroomPhoto} size={200} />
                </Box>
              )}

              {/* Groom Fullname */}
              {oGroomFullname && oGroomFullname && (
                <Box mt="5" fontSize="xl">
                  {oGroomFullname.value}
                </Box>
              )}

              <Box mt="5">
                {oGroomSon.value} {oGroomSonTo.value} {oGroomFromCouple.value}
              </Box>

              <Box mt="1" fontWeight="bold">
                {oGroomFatherName.value} {oGroomCoupleAnd.value}{' '}
                {oGroomMotherName.value}
              </Box>

              <Box mt="12">- {oCoupleAnd.value} -</Box>

              {/* Bride */}
              {/* Bride Photo */}
              {oBridePhoto && oBridePhoto && (
                <Box mt="16" position="relative" w="full">
                  <ImageFrame frame={oFrame} image={oBridePhoto} size={200} />
                </Box>
              )}

              {/* Groom Fullname */}
              {oBrideFullname && oBrideFullname && (
                <Box mt="5" fontSize="xl">
                  {oBrideFullname.value}
                </Box>
              )}

              <Box mt="5">
                {oBrideSon.value} {oBrideSonTo.value} {oBrideFromCouple.value}
              </Box>
              <Box mt="1" fontWeight="bold">
                {oBrideFatherName.value} {oBrideCoupleAnd.value}{' '}
                {oBrideMotherName.value}
              </Box>
            </Box>

            {fQuotes && fQuotes.is_active && (
              <Quotes options={options} feature={feature} />
            )}
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Opening
