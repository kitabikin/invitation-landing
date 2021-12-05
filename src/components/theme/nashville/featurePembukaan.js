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
  const { [`${codeGeneral}-colorPrimary`]: generalColorPrimary } = general

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

          {/* Groom */}
          <Box mt="16">
            {/* Groom Photo */}
            {pembukaanGroomImage && pembukaanGroomImage && (
              <Box position="relative" w="full">
                <ImageFrame
                  frame={pembukaanFrame}
                  image={pembukaanGroomImage}
                  size={200}
                />
              </Box>
            )}

            {/* Groom Fullname */}
            {pembukaanGroomFullname && pembukaanGroomFullname && (
              <Text
                mt="5"
                fontFamily="nashvilleTitle"
                fontSize="2xl"
                color={generalColorPrimary.value}
                textTransform="uppercase"
              >
                {pembukaanGroomFullname.value}
              </Text>
            )}

            <Text mt="5" fontStyle="italic">
              {pembukaanGroomSon.value} {pembukaanGroomSonTo.value}{' '}
              {pembukaanGroomFromCouple.value}
            </Text>

            <Text mt="1" fontWeight="bold" fontStyle="italic">
              {pembukaanGroomFatherName.value} {pembukaanGroomCoupleAnd.value}{' '}
              {pembukaanGroomMotherName.value}
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
            {/* Bride Photo */}
            {pembukaanBrideImage && pembukaanBrideImage && (
              <Box position="relative" w="full">
                <ImageFrame
                  frame={pembukaanFrame}
                  image={pembukaanBrideImage}
                  size={200}
                />
              </Box>
            )}

            {/* Bride Fullname */}
            {pembukaanBrideFullname && pembukaanBrideFullname && (
              <Text
                mt="5"
                fontFamily="nashvilleTitle"
                fontSize="2xl"
                color={generalColorPrimary.value}
                textTransform="uppercase"
              >
                {pembukaanBrideFullname.value}
              </Text>
            )}

            <Text mt="5" fontStyle="italic">
              {pembukaanBrideSon.value} {pembukaanBrideSonTo.value}{' '}
              {pembukaanBrideFromCouple.value}
            </Text>

            <Text mt="1" fontWeight="bold" fontStyle="italic">
              {pembukaanBrideFatherName.value} {pembukaanBrideCoupleAnd.value}{' '}
              {pembukaanBrideMotherName.value}
            </Text>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default FeaturePembukaan
