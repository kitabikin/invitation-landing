import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Container, Box, Text, AspectRatio } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { reduceFeature } from '@/libs/utils';

function FeatureGalleryVideo({ ...props }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  // Get Data ==================================================================
  // Gallery Video
  const codeGalleryVideo = `${props.options.code}-galleryVideo`;
  const galleryVideo = reduceFeature(props.feature[codeGalleryVideo].column);
  const {
    [`${codeGalleryVideo}-title`]: galleryVideoTitle,
    [`${codeGalleryVideo}-video`]: galleryVideoVideo,
  } = galleryVideo;

  return (
    <>
      <Container h="full" maxW="4xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Gallery Video Title */}
          {galleryVideoTitle && galleryVideoTitle.is_active && (
            <Text fontFamily="hazelHeading" fontSize="3xl">
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
  );
}

export default FeatureGalleryVideo;
