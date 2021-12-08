import Image from 'next/image'
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
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}-bgHr`]: generalBgHr } = general

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
      <Container h="full" maxW="2xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* General Hr */}
          <Box mb="4">
            <Image
              src={generalBgHr.value}
              alt={generalBgHr.label}
              width="100"
              height="42.77"
            />
          </Box>

          {/* Live Wedding Title */}
          {liveWeddingTitle && liveWeddingTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {liveWeddingTitle.value}
            </Text>
          )}

          <SimpleGrid
            minChildWidth={{ base: '180px', md: '120px' }}
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
