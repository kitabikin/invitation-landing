import Image from 'next/image'
import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureLoveStory({ ...props }) {
  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}-bgHr`]: generalBgHr } = general

  // Love Story
  const codeLoveStory = `${props.options.code}-loveStory`
  const loveStory = props.feature[codeLoveStory].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeLoveStory}-title`]: loveStoryTitle,
    [`${codeLoveStory}-timeline`]: loveStoryTimeline,
  } = loveStory

  return (
    <>
      <Container h="full" maxW="4xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Love Story Title */}
          {loveStoryTitle && loveStoryTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
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
  )
}

export default FeatureLoveStory
