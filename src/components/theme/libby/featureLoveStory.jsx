import _ from 'lodash';
import { Container, Box, Text } from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

function FeatureLoveStory({ ...props }) {
  // Get Data ==================================================================
  // Love Story
  const codeLoveStory = `${props.options.code}-loveStory`;
  const loveStory = reduceFeature(props.feature[codeLoveStory].column);
  const {
    [`${codeLoveStory}-title`]: loveStoryTitle,
    [`${codeLoveStory}-timeline`]: loveStoryTimeline,
  } = loveStory;

  return (
    <>
      <Container h="full" maxW="4xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Love Story Title */}
          {loveStoryTitle && loveStoryTitle.is_active && (
            <Text fontFamily="var(--libby-font-title)" fontSize="3xl">
              {loveStoryTitle.value}
            </Text>
          )}

          {/* Love Story Timeline */}
          {loveStoryTimeline &&
            loveStoryTimeline.is_active &&
            JSON.parse(loveStoryTimeline.value).map((data, i) => (
              <Box key={i} textAlign="center" mt="4">
                <Text fontSize="5xl">{data.date}</Text>
                <Text fontSize="lg">{data.description}</Text>
              </Box>
            ))}
        </Box>
      </Container>
    </>
  );
}

export default FeatureLoveStory;
