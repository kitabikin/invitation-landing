import _ from 'lodash'
import { Container, Box, Text, AspectRatio } from '@chakra-ui/react'
import ReactPlayer from 'react-player'

function FeatureGalleryVideo({ ...props }) {
  // Get Data ==================================================================
  // Gallery Video
  const codeGalleryVideo = `${props.options.code}-galleryVideo`
  const galleryVideo = props.feature[codeGalleryVideo].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGalleryVideo}-title`]: galleryVideoTitle,
    [`${codeGalleryVideo}-video`]: galleryVideoVideo,
  } = galleryVideo

  return (
    <>
      <Container h="full" maxW="4xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Gallery Video Title */}
          {galleryVideoTitle && galleryVideoTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {galleryVideoTitle.value}
            </Text>
          )}

          {/* Gallery Video Video */}
          <Box mt="6">
            {galleryVideoVideo &&
              galleryVideoVideo.is_active &&
              JSON.parse(galleryVideoVideo.value).map((data, i) => (
                <Box key={i} mb="8">
                  <AspectRatio ratio={16 / 9}>
                    <ReactPlayer
                      url={data.video}
                      width="100%"
                      height="100%"
                      controls={true}
                    />
                  </AspectRatio>
                  <Text mt="2" fontStyle="italic">
                    {data.description}
                  </Text>
                </Box>
              ))}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default FeatureGalleryVideo
