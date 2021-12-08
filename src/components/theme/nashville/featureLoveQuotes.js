import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureLoveQuotes({ ...props }) {
  // Get Data ==================================================================
  // Love Quotes
  const codeLoveQuotes = `${props.options.code}-loveQuotes`
  const loveQuotes = props.feature[codeLoveQuotes].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeLoveQuotes}-title`]: loveQuotesTitle,
    [`${codeLoveQuotes}-quotes`]: loveQuotesQuotes,
  } = loveQuotes

  return (
    <>
      <Container h="full" maxW="full" centerContent py="14" px="0">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Love Quotes Title */}
          {loveQuotesTitle && loveQuotesTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {loveQuotesTitle.value}
            </Text>
          )}

          <Box mt="6">
            {loveQuotesQuotes &&
              loveQuotesQuotes.is_active &&
              JSON.parse(loveQuotesQuotes.value).map((data, i) => (
                <Box
                  key={i}
                  bgImage={`url('${data.photo}')`}
                  bgBlendMode="multiply"
                  bgColor="lightslategray"
                  bgPos="center"
                  bgRepeat="no-repeat"
                  bgSize="cover"
                  position="relative"
                  py="12"
                >
                  <Text fontSize="2xl" fontStyle="italic" color="white" px="16">
                    {data.quotes}
                  </Text>

                  {data.source && (
                    <Text
                      fontWeight="bold"
                      fontStyle="italic"
                      fontSize="2xl"
                      color="white"
                      px="16"
                      mt="2"
                    >
                      {data.source}
                    </Text>
                  )}
                </Box>
              ))}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default FeatureLoveQuotes
