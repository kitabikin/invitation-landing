import _ from 'lodash'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { Box, Container } from '@chakra-ui/react'

function Cover({ options, feature }) {
  const code = 'golden-gold'

  // General
  const codeGeneral = `${code}_general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGeneral}_background-between-cover-opening-after`]: gBgAfter,
    [`${codeGeneral}_background-cover-bride`]: gBgBride,
  } = general

  // Cover
  const codeCover = `${code}_cover`
  const cover = feature[codeCover].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeCover}_background`]: cBg,
    [`${codeCover}_title`]: cTitle,
    [`${codeCover}_nickname-groom`]: cNicknameGroom,
    [`${codeCover}_nickname-bride`]: cNicknameBride,
    [`${codeCover}_date`]: cDate,
    [`${codeCover}_title-sub`]: cTitleSub,
  } = cover

  const formatDate = date => {
    return format(date, 'EEEE, d MMMM yyyy', { locale: id })
  }

  return (
    <>
      <Box
        bgImage={`url('${cBg.value}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        h={{ base: '100vh', md: '70vh' }}
        maxH="100vh"
        _after={{
          bgImage: `url('${gBgAfter.value}')`,
          bgPosition: 'bottom right',
          bgRepeat: 'no-repeat',
          bgSize: 'contain',
          content: "''",
          display: 'block',
          height: '140px',
          zIndex: '99',
          marginTop: '-3.5rem',
        }}
      >
        <Container h="full" maxW="md" centerContent>
          <Box
            h={{ base: '100vh', md: '70vh' }}
            w="full"
            position="absolute"
            bgGradient="linear(to-b, black, transparent)"
            opacity="0.5"
          ></Box>
          <Box
            position="relative"
            px="4"
            py="8"
            h="full"
            w="full"
            textAlign="center"
          >
            {/* Cover Title */}
            {cTitle && cTitle.is_active && (
              <Box textColor="white">{cTitle.value}</Box>
            )}

            {/* Cover Nickname Groom & Bride */}
            <Box
              pt="4"
              pb="2"
              fontSize="4xl"
              textColor="white"
              bgImage={`url('${gBgBride.value}')`}
              bgPosition="center"
              bgRepeat="no-repeat"
              bgSize="contain"
            >
              {cNicknameGroom.value} & {cNicknameBride.value}
            </Box>

            {/* Cover Date */}
            {cover[`${codeCover}_date`] &&
              cover[`${codeCover}_date`].is_active && (
                <Box mb="2" textColor="white">
                  {formatDate(
                    options.from === 'theme'
                      ? options.date
                      : parseISO(cDate.value)
                  )}
                </Box>
              )}

            {/* Cover Sub Title */}
            {cTitleSub && cTitleSub.is_active && (
              <Box textColor="white">{cTitleSub.value}</Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Cover
