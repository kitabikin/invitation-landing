import Image from 'next/image'

import _ from 'lodash'
import { Container, Box } from '@chakra-ui/react'

function Quotes({ options, feature }) {
  const code = 'golden-gold'

  // General
  const codeGeneral = `${code}_general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}_background-hr`]: gBgHr } = general

  // Quotes
  const codeQuotes = `${code}_quotes`
  const quotes = feature[codeQuotes].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeQuotes}_content`]: qContent,
    [`${codeQuotes}_source`]: qSource,
  } = quotes

  return (
    <>
      <Box
        position="relative"
        px={{ base: 10, md: 4 }}
        py="8"
        h="full"
        w="full"
        textAlign="center"
      >
        <Image src={gBgHr.value} alt={gBgHr.label} width="128" height="41" />
        <Box mt="6">{qContent.value}</Box>
        <Box mt="4" fontWeight="bold" fontSize="xl">
          {qSource.value}
        </Box>
      </Box>
    </>
  )
}

export default Quotes
