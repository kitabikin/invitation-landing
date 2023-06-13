import { useRef } from 'react';
import {
  Box,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import WeddingGift from '@/components/global/theme/weddingGift';
import ButtonSolid from '@/components/theme/libby/buttonSolid';
import { reduceFeature } from '@/libs/utils';

function FeatureWeddingGift({ ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  // Get Data ==================================================================
  // Ucapan Doa
  const codWeddingGift = `${props.options.code}-weddingGift`;
  const weddingGift = reduceFeature(props.feature[codWeddingGift].column);
  const {
    [`${codWeddingGift}-title`]: weddingGiftTitle,
    [`${codWeddingGift}-gift`]: weddingGiftGift,
  } = weddingGift;

  return (
    <>
      <Container h="full" maxW="5xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full">
          {/* Ucapan Doa Title */}
          {weddingGiftTitle && weddingGiftTitle.is_active && (
            <Text
              fontFamily="var(--libby-font-title)"
              fontSize="3xl"
              textAlign="center"
            >
              {weddingGiftTitle.value}
            </Text>
          )}

          {weddingGiftGift && weddingGiftGift.is_active && (
            <Box mt="6" textAlign="center">
              <ButtonSolid onClick={onOpen} role={'button'}>
                Kirim Wedding Gift
              </ButtonSolid>

              <Modal
                initialFocusRef={initialRef}
                onClose={onClose}
                isOpen={isOpen}
                size={'xl'}
                isCentered
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Kirim Wedding Gift</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {JSON.parse(weddingGiftGift.value).map(
                      (res, index, row) => (
                        <>
                          <WeddingGift
                            key={index}
                            code={res.gift}
                            alias={res.alias}
                            nomor={res.nomor}
                          />
                          {index + 1 !== row.length && (
                            <hr style={{ margin: '24px 0' }} />
                          )}
                        </>
                      ),
                    )}
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}

export default FeatureWeddingGift;
