import _ from 'lodash'
import { Container, Box, SimpleGrid, Center, Link } from '@chakra-ui/react'

import { SiInstagram, SiYoutube, SiZoom, SiGooglemeet } from 'react-icons/si'

function LiveWedding({ options, feature }) {
  const code = 'golden-gold'

  // General
  const codeGeneral = `${code}_general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}_background`]: gBg } = general

  // Live Wedding
  const codeLiveWedding = `${code}_live-wedding`
  const liveWedding = feature[codeLiveWedding].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeLiveWedding}_title`]: lwTitle,
    [`${codeLiveWedding}_instagram`]: lwInstagram,
    [`${codeLiveWedding}_youtube`]: lwYoutube,
    [`${codeLiveWedding}_zoom`]: lwZoom,
    [`${codeLiveWedding}_google-meet`]: lwGoogleMeet,
  } = liveWedding

  return (
    <>
      <Box position="relative">
        <Box
          bgImage={`url('${gBg.value}')`}
          bgPosition="center center"
          bgRepeat="repeat"
          bgSize="300px 300px"
          pt="24"
        >
          <Container h="full" maxW="2xl" centerContent>
            <Box
              position="relative"
              px="4"
              py="8"
              h="full"
              w="full"
              textAlign="center"
            >
              {/* Live Wedding Title */}
              {lwTitle && lwTitle.is_active && (
                <Box fontWeight="bold" fontSize="2xl">
                  {lwTitle.value}
                </Box>
              )}

              <SimpleGrid
                minChildWidth={{ base: '180px', md: '120px' }}
                spacing="16px"
                mt="6"
              >
                {lwInstagram && lwInstagram.is_active && (
                  <Center minH="100px">
                    <Link href={lwInstagram.value} isExternal>
                      <SiInstagram size="48px" />
                    </Link>
                  </Center>
                )}

                {lwYoutube && lwYoutube.is_active && (
                  <Center minH="100px">
                    <Link href={lwYoutube.value} isExternal>
                      <SiYoutube size="48px" />
                    </Link>
                  </Center>
                )}

                {lwZoom && lwZoom.is_active && (
                  <Center minH="100px">
                    <Link href={lwZoom.value} isExternal>
                      <SiZoom size={100} />
                    </Link>
                  </Center>
                )}

                {lwGoogleMeet && lwGoogleMeet.is_active && (
                  <Center minH="100px">
                    <Link href={lwGoogleMeet.value} isExternal>
                      <SiGooglemeet size="48px" />
                    </Link>
                  </Center>
                )}
              </SimpleGrid>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default LiveWedding
