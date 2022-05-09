import _ from 'lodash';
import {
  Box,
  Button,
  SimpleGrid,
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

import ButtonSolid from '@/components/theme/hazel/buttonSolid';

function FeatureMap({ ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get Data ==================================================================
  // Map
  const codeMap = `${props.options.code}-map${props.type}`;
  const map = reduceFeature(props.feature[codeMap].column);
  const {
    [`${codeMap}-buttonLabel`]: mapButtonLabel,
    [`${codeMap}-title`]: mapTitle,
    [`${codeMap}-subTitle`]: mapSubTitle,
    [`${codeMap}-googleLabel`]: mapGoogleLabel,
    [`${codeMap}-googleLink`]: mapGoogleLink,
    [`${codeMap}-googleEmbed`]: mapGoogleEmbed,
    [`${codeMap}-wazeLabel`]: mapWazeLabel,
    [`${codeMap}-wazeLink`]: mapWazeLink,
  } = map;

  return (
    <>
      <ButtonSolid onClick={onOpen} role={'button'}>
        {mapButtonLabel.value}
      </ButtonSolid>

      <Modal onClose={onClose} isOpen={isOpen} size={'xl'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {mapTitle.value} <br />
            <Box as={'p'} fontWeight="normal" fontSize="14px">
              {mapSubTitle.value}
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacingX="4">
              <Box>
                <ButtonSolid
                  as="a"
                  href={mapGoogleLink.value}
                  target="_blank"
                  w="full"
                >
                  {mapGoogleLabel.value}
                </ButtonSolid>
              </Box>
              <Box>
                <ButtonSolid
                  as="a"
                  href={mapWazeLink.value}
                  target="_blank"
                  w="full"
                >
                  {mapWazeLabel.value}
                </ButtonSolid>
              </Box>
            </SimpleGrid>
            <Box mt="4">
              <AspectRatio ratio={4 / 3}>
                <iframe
                  src={mapGoogleEmbed.value}
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </AspectRatio>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}

export default FeatureMap;
