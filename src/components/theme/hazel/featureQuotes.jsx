import _ from 'lodash';
import { Container, Box, Text } from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

function FeatureQuotes({ ...props }) {
  // Get Data ==================================================================
  // Quotes
  const codeQuotes = `${props.options.code}-quotes`;
  const quotes = reduceFeature(props.feature[codeQuotes].column);
  const {
    [`${codeQuotes}-quotes`]: quotesQuotes,
    [`${codeQuotes}-source`]: quotesSource,
  } = quotes;

  return (
    <>
      <Container h={'full'} maxW={'4xl'} centerContent py={14} px={10}>
        <Box position="relative" h={'full'} w={'full'} textAlign={'center'}>
          {/* General Hr */}
          <Box
            mt={6}
            bgImage={'var(--hazel-bg-hr)'}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="contain"
            h="75"
          />

          {/* Quotes */}
          {quotesQuotes && quotesQuotes && (
            <Text mt={6} fontStyle={'italic'}>
              {quotesQuotes.value}
            </Text>
          )}

          {/* Quotes Source */}
          {quotesSource && quotesSource && (
            <Text mt={4} fontWeight={'bold'} fontStyle={'italic'}>
              {quotesSource.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  );
}

export default FeatureQuotes;
