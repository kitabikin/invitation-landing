import { useState } from 'react';
import Image from 'next/image';
import _ from 'lodash';
import { Container, Box, Text, Img } from '@chakra-ui/react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import ImageAlbum from '@/components/global/imageAlbum';

function FeatureGalleryPhoto({ ...props }) {
  const [currentImage, setCurrentImage] = useState(-1);

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
        </Box>
      </Container>
    </>
  );
}

export default FeatureGalleryPhoto;
