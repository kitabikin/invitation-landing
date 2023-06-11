import _ from 'lodash';
import { Container, Box, Text } from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

function FeaturePenutupan({ ...props }) {
  // Get Data ==================================================================
  // Penutupan
  const codePenutupan = `${props.options.code}-penutupan`;
  const penutupan = reduceFeature(props.feature[codePenutupan].column);
  const {
    [`${codePenutupan}-sentence`]: penutupanSentence,
    [`${codePenutupan}-thankYou`]: penutupanThankYou,
    [`${codePenutupan}-greeting`]: penutupanGreeting,
  } = penutupan;

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="12" px="6">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Penutupan Sentence */}
          {penutupanSentence && penutupanSentence && (
            <Text mt="4" fontStyle="italic">
              {penutupanSentence.value}
            </Text>
          )}

          {/* Penutupan ThankYou */}
          {penutupanThankYou && penutupanThankYou && (
            <Text mt="4" fontStyle="italic">
              {penutupanThankYou.value}
            </Text>
          )}

          {/* Penutupan Greeting */}
          {penutupanGreeting && penutupanGreeting && (
            <Text
              mt="8"
              fontFamily="libbyTitle"
              fontSize={{ base: '2xl', md: '3xl' }}
            >
              {penutupanGreeting.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  );
}

export default FeaturePenutupan;
