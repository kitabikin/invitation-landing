import _ from 'lodash'
import {
  Container,
  Box,
  Text,
  SimpleGrid,
  Center,
  Link,
} from '@chakra-ui/react'

import { SiInstagram, SiYoutube, SiZoom, SiGooglemeet } from 'react-icons/si'

function FeatureLiveWedding({ ...props }) {
  // Get Data ==================================================================
  // LiveWedding
  const codeLiveWedding = `${props.options.code}-liveWedding`
  const liveWedding = props.feature[codeLiveWedding].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeLiveWedding}-title`]: liveWeddingTitle,
    [`${codeLiveWedding}-instagram`]: liveWeddingInstagram,
    [`${codeLiveWedding}-youtube`]: liveWeddingYoutube,
    [`${codeLiveWedding}-zoom`]: liveWeddingZoom,
    [`${codeLiveWedding}-googleMeet`]: liveWeddingGoogleMeet,
  } = liveWedding

  return (
    <>
      <Container h="full" maxW="2xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {liveWeddingTitle && liveWeddingTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {liveWeddingTitle.value}
            </Text>
          )}

          <SimpleGrid
            minChildWidth={{ base: '120px', md: '120px' }}
            spacing="16px"
            mt="6"
          >
            {liveWeddingInstagram && liveWeddingInstagram.is_active && (
              <Center minH="100px">
                <Link href={liveWeddingInstagram.value} isExternal>
                  <SiInstagram size="48px" />
                </Link>
              </Center>
            )}

            {liveWeddingYoutube && liveWeddingYoutube.is_active && (
              <Center minH="100px">
                <Link href={liveWeddingYoutube.value} isExternal>
                  <SiYoutube size="48px" />
                </Link>
              </Center>
            )}

            {liveWeddingZoom && liveWeddingZoom.is_active && (
              <Center minH="100px">
                <Link href={liveWeddingZoom.value} isExternal>
                  <SiZoom size={100} />
                </Link>
              </Center>
            )}

            {liveWeddingGoogleMeet && liveWeddingGoogleMeet.is_active && (
              <Center minH="100px">
                <Link href={liveWeddingGoogleMeet.value} isExternal>
                  <SiGooglemeet size="48px" />
                </Link>
              </Center>
            )}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  )
}

export default FeatureLiveWedding
