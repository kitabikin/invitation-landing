import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureGalleryVideo({ ...props }) {
  // Get Data ==================================================================
  // GalleryVideo
  const codeGalleryVideo = `${props.options.code}-galleryVideo`
  const galleryVideo = props.feature[codeGalleryVideo].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGalleryVideo}-title`]: galleryVideoTitle,
    [`${codeGalleryVideo}-instagram`]: galleryVideoInstagram,
  } = galleryVideo

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {galleryVideoTitle && galleryVideoTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {galleryVideoTitle.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureGalleryVideo
