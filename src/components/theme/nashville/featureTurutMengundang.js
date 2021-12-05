import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureTurutMengundang({ ...props }) {
  // Get Data ==================================================================
  // TurutMengundang
  const codeTurutMengundang = `${props.options.code}-turutMengundang`
  const turutMengundang = props.feature[codeTurutMengundang].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeTurutMengundang}-title`]: turutMengundangTitle,
    [`${codeTurutMengundang}-instagram`]: turutMengundangInstagram,
  } = turutMengundang

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {turutMengundangTitle && turutMengundangTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {turutMengundangTitle.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureTurutMengundang
