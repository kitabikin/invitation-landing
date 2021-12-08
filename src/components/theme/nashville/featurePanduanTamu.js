import _ from 'lodash'
import { Container, Box, Text, OrderedList, ListItem } from '@chakra-ui/react'

function FeaturePanduanTamu({ ...props }) {
  // Get Data ==================================================================
  // Panduan Tamu
  const codePanduanTamu = `${props.options.code}-panduanTamu`
  const panduanTamu = props.feature[codePanduanTamu].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codePanduanTamu}-title`]: panduanTamuTitle,
    [`${codePanduanTamu}-guide`]: panduanTamuGuide,
  } = panduanTamu

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Panduan Tamu Title */}
          {panduanTamuTitle && panduanTamuTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {panduanTamuTitle.value}
            </Text>
          )}

          {/* Panduan Tamu Guide */}
          {panduanTamuGuide && panduanTamuGuide.is_active && (
            <OrderedList textAlign="center" listStylePos="inside" mt="6">
              {JSON.parse(panduanTamuGuide.value).map((data, i) => (
                <ListItem key={i} mb="2" fontSize="lg" fontStyle="italic">
                  {data.guide}
                </ListItem>
              ))}
            </OrderedList>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeaturePanduanTamu
