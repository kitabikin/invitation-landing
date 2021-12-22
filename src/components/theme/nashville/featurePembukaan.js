import Image from 'next/image'
import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'
import ImageFrame from '@/components/theme/nashville/imageFrame'

function FeaturePembukaan({ ...props }) {
  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGeneral}-colorPrimary`]: generalColorPrimary,
    [`${codeGeneral}-orderGroomBride`]: generalOrderGroomBride,
  } = general

  // Pembukaan
  const codePembukaan = `${props.options.code}-pembukaan`
  const pembukaan = props.feature[codePembukaan].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codePembukaan}-saying`]: pembukaanSaying,
    [`${codePembukaan}-greeting`]: pembukaanGreeting,
    [`${codePembukaan}-sentence`]: pembukaanSentence,
    [`${codePembukaan}-frame`]: pembukaanFrame,
    [`${codePembukaan}-groomImage`]: pembukaanGroomImage,
    [`${codePembukaan}-groomFullname`]: pembukaanGroomFullname,
    [`${codePembukaan}-groomSon`]: pembukaanGroomSon,
    [`${codePembukaan}-groomSonTo`]: pembukaanGroomSonTo,
    [`${codePembukaan}-groomFromCouple`]: pembukaanGroomFromCouple,
    [`${codePembukaan}-groomFatherName`]: pembukaanGroomFatherName,
    [`${codePembukaan}-groomCoupleAnd`]: pembukaanGroomCoupleAnd,
    [`${codePembukaan}-groomMotherName`]: pembukaanGroomMotherName,
    [`${codePembukaan}-coupleAnd`]: pembukaanCoupleAnd,
    [`${codePembukaan}-brideImage`]: pembukaanBrideImage,
    [`${codePembukaan}-brideFullname`]: pembukaanBrideFullname,
    [`${codePembukaan}-brideSon`]: pembukaanBrideSon,
    [`${codePembukaan}-brideSonTo`]: pembukaanBrideSonTo,
    [`${codePembukaan}-brideFromCouple`]: pembukaanBrideFromCouple,
    [`${codePembukaan}-brideFatherName`]: pembukaanBrideFatherName,
    [`${codePembukaan}-brideCoupleAnd`]: pembukaanBrideCoupleAnd,
    [`${codePembukaan}-brideMotherName`]: pembukaanBrideMotherName,
  } = pembukaan

  return (
    <>
      <Container h="full" maxW="4xl" centerContent px="6">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Pembukaan Saying */}
          {pembukaanSaying && pembukaanSaying.is_active && (
            <Image
              src={pembukaanSaying.value}
              alt={pembukaanSaying.label}
              width="192"
              height="62"
            />
          )}

          {/* Pembukaan Saying */}
          {pembukaanGreeting && pembukaanGreeting && (
            <Text mt="6" fontFamily="nashvilleHeading" fontSize="3xl">
              {pembukaanGreeting.value}
            </Text>
          )}

          {/* Pembukaan Saying */}
          {pembukaanSentence && pembukaanSentence && (
            <Text mt="4" fontStyle="italic">
              {pembukaanSentence.value}
            </Text>
          )}

          {/* Groom & Bride */}
          <Box mt="16">
            {pembukaanGroomImage && pembukaanGroomImage && (
              <Box position="relative" w="full">
                <ImageFrame
                  frame={pembukaanFrame}
                  image={
                    generalOrderGroomBride.value === 'bride'
                      ? pembukaanBrideImage
                      : pembukaanGroomImage
                  }
                  size={200}
                />
              </Box>
            )}

            {pembukaanGroomFullname && pembukaanGroomFullname && (
              <Text
                mt="5"
                fontFamily="nashvilleTitle"
                fontSize="2xl"
                color={generalColorPrimary.value}
                textTransform="uppercase"
              >
                {generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideFullname.value
                  : pembukaanGroomFullname.value}
              </Text>
            )}

            <Text mt="5" fontStyle="italic">
              <Text as="span">
                {generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideSon.value
                  : pembukaanGroomSon.value}{' '}
              </Text>
              <Text as="span">
                {generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideSonTo.value
                  : pembukaanGroomSonTo.value}{' '}
              </Text>
              <Text as="span">
                {generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideFromCouple.value
                  : pembukaanGroomFromCouple.value}
              </Text>
            </Text>

            <Text mt="1" fontWeight="bold" fontStyle="italic">
              <Text as="span">
                {generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideFatherName.value
                  : pembukaanGroomFatherName.value}{' '}
              </Text>
              <Text as="span">{pembukaanGroomCoupleAnd.value} </Text>
              <Text as="span">
                {generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideMotherName.value
                  : pembukaanGroomMotherName.value}
              </Text>
            </Text>
          </Box>

          <Text
            mt="16"
            fontFamily="nashvilleHandwriting2"
            fontSize="2xl"
            fontWeight="bold"
          >
            {pembukaanCoupleAnd.value}
          </Text>

          {/* Bride */}
          <Box mt="16">
            {pembukaanGroomImage && pembukaanGroomImage && (
              <Box position="relative" w="full">
                <ImageFrame
                  frame={pembukaanFrame}
                  image={
                    generalOrderGroomBride.value !== 'bride'
                      ? pembukaanBrideImage
                      : pembukaanGroomImage
                  }
                  size={200}
                />
              </Box>
            )}

            {pembukaanGroomFullname && pembukaanGroomFullname && (
              <Text
                mt="5"
                fontFamily="nashvilleTitle"
                fontSize="2xl"
                color={generalColorPrimary.value}
                textTransform="uppercase"
              >
                {generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideFullname.value
                  : pembukaanGroomFullname.value}
              </Text>
            )}

            <Text mt="5" fontStyle="italic">
              <Text as="span">
                {generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideSon.value
                  : pembukaanGroomSon.value}{' '}
              </Text>
              <Text as="span">
                {generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideSonTo.value
                  : pembukaanGroomSonTo.value}{' '}
              </Text>
              <Text as="span">
                {generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideFromCouple.value
                  : pembukaanGroomFromCouple.value}
              </Text>
            </Text>

            <Text mt="1" fontWeight="bold" fontStyle="italic">
              <Text as="span">
                {generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideFatherName.value
                  : pembukaanGroomFatherName.value}{' '}
              </Text>
              <Text as="span">{pembukaanGroomCoupleAnd.value} </Text>
              <Text as="span">
                {generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideMotherName.value
                  : pembukaanGroomMotherName.value}
              </Text>
            </Text>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default FeaturePembukaan
