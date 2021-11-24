import _ from 'lodash'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { Box, Container } from '@chakra-ui/react'

function Cover({ general, cover }) {
  const { data: dataGeneral } = general
  const { data: dataCover } = cover

  const item = (code, data = dataCover) => {
    return _.find(data, {
      theme_feature_column: { code: code },
    })
  }

  // General
  const backgroundBride = item(
    `golden-gold_general_background-cover-bride`,
    dataGeneral
  )

  // Cover
  const code = 'golden-gold_cover_'
  const background = item(`${code}background`)
  const title = item(`${code}title`)
  const nicknameGroom = item(`${code}nickname-groom`)
  const nicknameBride = item(`${code}nickname-bride`)
  const date = item(`${code}date`)
  const titleSub = item(`${code}title-sub`)

  return (
    <Box
      bgImage={`url('${background.value}')`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="70vh"
      maxH="100vh"
    >
      <Container maxW="md" centerContent>
        <Box
          h="full"
          w="full"
          position="absolute"
          bgGradient="linear(to-b, black, transparent)"
          opacity="0.5"
        ></Box>
        <Box position="relative" px="4" py="8" w="full" textAlign="center">
          <Box textColor="white">{title.value}</Box>
          <Box
            pt="4"
            pb="2"
            fontSize="4xl"
            textColor="white"
            bgImage={`url('${backgroundBride.value}')`}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="contain"
          >
            {nicknameGroom.value} & {nicknameBride.value}
          </Box>
          <Box mb="2" textColor="white">
            {format(parseISO(date.value), 'EEEE, d MMMM yyyy', { locale: id })}
          </Box>
          <Box textColor="white">{titleSub.value}</Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Cover
