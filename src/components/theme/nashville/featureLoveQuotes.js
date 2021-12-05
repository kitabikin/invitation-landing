import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureLoveQuotes({ ...props }) {
  // Get Data ==================================================================
  // LoveQuotes
  const codeLoveQuotes = `${props.options.code}-loveQuotes`
  const loveQuotes = props.feature[codeLoveQuotes].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeLoveQuotes}-title`]: loveQuotesTitle,
    [`${codeLoveQuotes}-instagram`]: loveQuotesInstagram,
  } = loveQuotes

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {loveQuotesTitle && loveQuotesTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {loveQuotesTitle.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureLoveQuotes
