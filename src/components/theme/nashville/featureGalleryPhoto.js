import { useState } from 'react';
import Image from 'next/image';
import _ from 'lodash';
import { Container, Box, Text } from '@chakra-ui/react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import ImageAlbum from '@/components/global/imageAlbum';

function FeatureGalleryPhoto({ ...props }) {
  const [currentImage, setCurrentImage] = useState(-1);

  // Get Data ==================================================================
  // Gallery Photo
  const codeGalleryPhoto = `${props.options.code}-galleryPhoto`;
  const galleryPhoto = props.feature[codeGalleryPhoto].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {},
  );
  const {
    [`${codeGalleryPhoto}-title`]: galleryPhotoTitle,
    [`${codeGalleryPhoto}-photo`]: galleryPhotoPhoto,
  } = galleryPhoto;

  const photos = _.map(JSON.parse(galleryPhotoPhoto.value), (result, index) => {
    return {
      src: result.photo,
      key: index,
      width: Number(result.width),
      height: Number(result.height),
    };
  });

  return (
    <>
      <Container h="full" maxW="4xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Gallery Photo Title */}
          {galleryPhotoTitle && galleryPhotoTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {galleryPhotoTitle.value}
            </Text>
          )}

          {/* Gallery Photo Photo */}
          {galleryPhotoPhoto && galleryPhotoPhoto.is_active && (
            <>
              <Box mt="6">
                <PhotoAlbum
                  layout="rows"
                  photos={photos}
                  targetRowHeight={300}
                  onClick={(event, photo, index) => setCurrentImage(index)}
                  renderPhoto={ImageAlbum}
                />
              </Box>

              <Lightbox
                open={currentImage >= 0}
                index={currentImage}
                close={() => setCurrentImage(-1)}
                slides={photos}
                render={{
                  slide: (image, offset, rect) => {
                    const width = Math.round(
                      Math.min(
                        rect.width,
                        (rect.height / image.height) * image.width,
                      ),
                    );
                    const height = Math.round(
                      Math.min(
                        rect.height,
                        (rect.width / image.width) * image.height,
                      ),
                    );

                    return (
                      <div style={{ position: 'relative', width, height }}>
                        <Image
                          src={image}
                          layout="fill"
                          loading="eager"
                          objectFit="contain"
                          alt={'alt' in image ? image.alt : ''}
                          sizes={
                            typeof window !== 'undefined'
                              ? `${Math.ceil(
                                  (width / window.innerWidth) * 100,
                                )}vw`
                              : `${width}px`
                          }
                        />
                      </div>
                    );
                  },
                }}
              />
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default FeatureGalleryPhoto;
