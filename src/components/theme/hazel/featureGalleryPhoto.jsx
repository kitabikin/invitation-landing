import { useState } from 'react';
import _ from 'lodash';
import { Container, Box, Text, Img } from '@chakra-ui/react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { reduceFeature } from '@/libs/utils';

function FeatureGalleryPhoto({ ...props }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // Get Data ==================================================================
  // Gallery Photo
  const codeGalleryPhoto = `${props.options.code}-galleryPhoto`;
  const galleryPhoto = reduceFeature(props.feature[codeGalleryPhoto].column);
  const {
    [`${codeGalleryPhoto}-title`]: galleryPhotoTitle,
    [`${codeGalleryPhoto}-photo`]: galleryPhotoPhoto,
  } = galleryPhoto;

  const photos = _.map(JSON.parse(galleryPhotoPhoto.value), (result) => {
    return {
      src: result.photo,
      width: Number(result.width),
      height: Number(result.height),
    };
  });

  const openLightbox = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <>
      <Container h="full" maxW="4xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Gallery Photo Title */}
          {galleryPhotoTitle && galleryPhotoTitle.is_active && (
            <Text fontFamily="hazelHeading" fontSize="3xl">
              {galleryPhotoTitle.value}
            </Text>
          )}

          {/* Gallery Photo Photo */}
          {galleryPhotoPhoto && galleryPhotoPhoto.is_active && (
            <>
              <Box mt="6" sx={{ columnCount: [2], columnGap: '8px' }}>
                {photos.map((photo, index) => (
                  <Img
                    key={index}
                    w="100%"
                    mb="2px"
                    d="inline-block"
                    cursor="pointer"
                    src={photo.src}
                    alt={`Gallery Photo ${index + 1}`}
                    onClick={() => openLightbox(index)}
                  />
                ))}
              </Box>

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
                      (currentImage + photos.length - 1) % photos.length,
                    )
                  }
                  onMoveNextRequest={() =>
                    setCurrentImage((currentImage + 1) % photos.length)
                  }
                />
              )}
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default FeatureGalleryPhoto;
