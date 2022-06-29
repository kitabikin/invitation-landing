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
  const galleryPhoto = [
    {
      photo:
        'https://ik.imagekit.io/kitabikincom/invitation/theme/calvert/1_MyT1uZ7Oj.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1656501821420',
      width: 3,
      height: 4,
    },
    {
      photo:
        'https://ik.imagekit.io/kitabikincom/invitation/theme/calvert/2_mkuvvYWXM.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1656501821271',
      width: 3,
      height: 4,
    },
    {
      photo:
        'https://ik.imagekit.io/kitabikincom/invitation/theme/calvert/3_-BgzxcnTM.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1656501821389',
      width: 4,
      height: 3,
    },
    {
      photo:
        'https://ik.imagekit.io/kitabikincom/invitation/theme/calvert/4_LMWkKTLru.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1656501821530',
      width: 3,
      height: 4,
    },
    {
      photo:
        'https://ik.imagekit.io/kitabikincom/invitation/theme/calvert/5_PxbAm9WjL.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1656501821787',
      width: 3,
      height: 4,
    },
    {
      photo:
        'https://ik.imagekit.io/kitabikincom/invitation/theme/calvert/6_ebnkOc_hnw.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1656501822084',
      width: 4,
      height: 3,
    },
  ];

  const photos = _.map(galleryPhoto, (result) => {
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
          <Text fontFamily="Kaushan Script" fontSize="3xl">
            Galeri Foto
          </Text>

          {/* Gallery Photo Photo */}
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
                  photos[(currentImage + photos.length - 1) % photos.length].src
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
        </Box>
      </Container>
    </>
  );
}

export default FeatureGalleryPhoto;
