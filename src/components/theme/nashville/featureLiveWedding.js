import Image from 'next/image'
import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureLiveWedding({ ...props }) {
  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}-bgHr`]: generalBgHr } = general

  // LiveWedding
  const codeLiveWedding = `${props.options.code}-liveWedding`
  const liveWedding = props.feature[codeLiveWedding].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeLiveWedding}-title`]: liveWeddingTitle,
    [`${codeLiveWedding}-instagram`]: liveWeddingInstagram,
  } = liveWedding

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
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

          {/* Live Wedding Title */}
          {liveWeddingTitle && liveWeddingTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {liveWeddingTitle.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureLiveWedding
