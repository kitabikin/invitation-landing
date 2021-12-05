import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'

function FeatureGalleryPhoto({ ...props }) {
  // Get Data ==================================================================
  // GalleryPhoto
  const codeGalleryPhoto = `${props.options.code}-galleryPhoto`
  const galleryPhoto = props.feature[codeGalleryPhoto].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGalleryPhoto}-title`]: galleryPhotoTitle,
    [`${codeGalleryPhoto}-instagram`]: galleryPhotoInstagram,
  } = galleryPhoto

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Live Wedding Title */}
          {galleryPhotoTitle && galleryPhotoTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {galleryPhotoTitle.value}
            </Text>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureGalleryPhoto
