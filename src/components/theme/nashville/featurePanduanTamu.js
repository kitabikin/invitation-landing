import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeaturePanduanTamu({ ...props }) {
  // Get Data ==================================================================
  // PanduanTamu
  const codePanduanTamu = `${props.options.code}-panduanTamu`
  const panduanTamu = props.feature[codePanduanTamu].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codePanduanTamu}-title`]: panduanTamuTitle,
    [`${codePanduanTamu}-instagram`]: panduanTamuInstagram,
  } = panduanTamu

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {panduanTamuTitle && panduanTamuTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {panduanTamuTitle.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeaturePanduanTamu
