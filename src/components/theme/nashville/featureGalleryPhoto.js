import { useState, useCallback } from 'react'
import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

function FeatureGalleryPhoto({ ...props }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  // Get Data ==================================================================
  // Gallery Photo
  const codeGalleryPhoto = `${props.options.code}-galleryPhoto`
  const galleryPhoto = props.feature[codeGalleryPhoto].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGalleryPhoto}-title`]: galleryPhotoTitle,
    [`${codeGalleryPhoto}-photo`]: galleryPhotoPhoto,
  } = galleryPhoto

  const photos = _.map(JSON.parse(galleryPhotoPhoto.value), result => {
    return {
      src: result.photo,
      width: Number(result.width),
      height: Number(result.height),
    }
  })

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Gallery Photo Title */}
          {galleryPhotoTitle && galleryPhotoTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {galleryPhotoTitle.value}
            </Text>
          )}

          {/* Gallery Photo Photo */}
          {galleryPhotoPhoto && galleryPhotoPhoto.is_active && (
            <Box mt="6">
              <Gallery photos={photos} onClick={openLightbox} />
              {viewerIsOpen && (
                <Lightbox
                  mainSrc={photos[currentImage].src}
                  nextSrc={photos[(currentImage + 1) % photos.length].src}
                  prevSrc={
                    photos[(currentImage + photos.length - 1) % photos.length]
                      .src
                  }
                  onCloseRequest={closeLightbox}
                  onMovePrevRequest={() =>
                    setCurrentImage(
                      (currentImage + photos.length - 1) % photos.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setCurrentImage((currentImage + 1) % photos.length)
                  }
                />
              )}
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureGalleryPhoto
