import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureUcapanDoa({ ...props }) {
  // Get Data ==================================================================
  // UcapanDoa
  const codeUcapanDoa = `${props.options.code}-ucapanDoa`
  const ucapanDoa = props.feature[codeUcapanDoa].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeUcapanDoa}-title`]: ucapanDoaTitle,
    [`${codeUcapanDoa}-instagram`]: ucapanDoaInstagram,
  } = ucapanDoa

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {ucapanDoaTitle && ucapanDoaTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {ucapanDoaTitle.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureUcapanDoa
