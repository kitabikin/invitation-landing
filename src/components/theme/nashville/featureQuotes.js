import Image from 'next/image'
import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureQuotes({ ...props }) {
  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}-bgHr`]: generalBgHr } = general

  // Quotes
  const codeQuotes = `${props.options.code}-quotes`
  const quotes = props.feature[codeQuotes].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeQuotes}-quotes`]: quotesQuotes,
    [`${codeQuotes}-source`]: quotesSource,
  } = quotes

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* General Hr */}
          <Box mt="6">
            <Image
              src={generalBgHr.value}
              alt={generalBgHr.label}
              width="100"
              height="42.77"
            />
          </Box>

          {/* Quotes */}
          {quotesQuotes && quotesQuotes && (
            <Text mt="6" fontStyle="italic">
              {quotesQuotes.value}
            </Text>
          )}

          {/* Quotes Source */}
          {quotesSource && quotesSource && (
            <Text mt="4" fontWeight="bold" fontStyle="italic">
              {quotesSource.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureQuotes
