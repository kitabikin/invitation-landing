import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureProtokolKesehatan({ ...props }) {
  // Get Data ==================================================================
  // ProtokolKesehatan
  const codeProtokolKesehatan = `${props.options.code}-protokolKesehatan`
  const protokolKesehatan = props.feature[codeProtokolKesehatan].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeProtokolKesehatan}-title`]: protokolKesehatanTitle,
    [`${codeProtokolKesehatan}-instagram`]: protokolKesehatanInstagram,
  } = protokolKesehatan

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {protokolKesehatanTitle && protokolKesehatanTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {protokolKesehatanTitle.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureProtokolKesehatan
