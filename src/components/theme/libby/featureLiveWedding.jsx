import _ from 'lodash';
import {
  Container,
  Box,
  Text,
  SimpleGrid,
  Center,
  Link,
} from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

import { SiInstagram, SiYoutube, SiZoom, SiGooglemeet } from 'react-icons/si';

function FeatureLiveWedding({ ...props }) {
  // Get Data ==================================================================
  // LiveWedding
  const codeLiveWedding = `${props.options.code}-liveWedding`;
  const liveWedding = reduceFeature(props.feature[codeLiveWedding].column);
  const {
    [`${codeLiveWedding}-title`]: liveWeddingTitle,
    [`${codeLiveWedding}-instagram`]: liveWeddingInstagram,
    [`${codeLiveWedding}-youtube`]: liveWeddingYoutube,
    [`${codeLiveWedding}-zoom`]: liveWeddingZoom,
    [`${codeLiveWedding}-googleMeet`]: liveWeddingGoogleMeet,
  } = liveWedding;

  return (
    <>
      <Container h="full" maxW="2xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {liveWeddingTitle && liveWeddingTitle.is_active && (
            <Text fontFamily="libbyTitle" fontSize="3xl">
              {liveWeddingTitle.value}
            </Text>
          )}

          <SimpleGrid
            minChildWidth={{ base: '120px', md: '120px' }}
            spacing="16px"
            mt="8"
          >
            {liveWeddingInstagram && liveWeddingInstagram.is_active && (
              <Center minH="50px">
                <Link
                  href={liveWeddingInstagram.value}
                  isExternal
                  aria-label={'Instagram'}
                >
                  <SiInstagram size="48px" />
                </Link>
              </Center>
            )}

            {liveWeddingYoutube && liveWeddingYoutube.is_active && (
              <Center minH="50px">
                <Link
                  href={liveWeddingYoutube.value}
                  isExternal
                  aria-label={'Youtube'}
                >
                  <SiYoutube size="48px" />
                </Link>
              </Center>
            )}

            {liveWeddingZoom && liveWeddingZoom.is_active && (
              <Center minH="50px">
                <Link
                  href={liveWeddingZoom.value}
                  isExternal
                  aria-label={'Zoom'}
                >
                  <SiZoom size={100} />
                </Link>
              </Center>
            )}

            {liveWeddingGoogleMeet && liveWeddingGoogleMeet.is_active && (
              <Center minH="50px">
                <Link
                  href={liveWeddingGoogleMeet.value}
                  isExternal
                  aria-label={'Google Meet'}
                >
                  <SiGooglemeet size="48px" />
                </Link>
              </Center>
            )}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
}

export default FeatureLiveWedding;
