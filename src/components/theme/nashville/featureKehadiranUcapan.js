import Image from 'next/image'
import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureKehadiranUcapan({ ...props }) {
  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}-bgHr`]: generalBgHr } = general

  // KehadiranUcapan
  const codeKehadiranUcapan = `${props.options.code}-kehadiranUcapan`
  const kehadiranUcapan = props.feature[codeKehadiranUcapan].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeKehadiranUcapan}-title`]: kehadiranUcapanTitle,
    [`${codeKehadiranUcapan}-instagram`]: kehadiranUcapanInstagram,
  } = kehadiranUcapan

  return (
    <>
      <Container h="full" maxW="4xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {kehadiranUcapanTitle && kehadiranUcapanTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {kehadiranUcapanTitle.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureKehadiranUcapan
