import _ from 'lodash'
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
} from '@chakra-ui/react'

function Map({ options, feature, type }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const code = 'golden-gold'

  // Map
  const codeMap = `${code}_map-${type}`
  const map = feature[codeMap].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeMap}_button-label`]: mButtonLabel,
    [`${codeMap}_title`]: mTitle,
    [`${codeMap}_title-sub`]: mTitleSub,
    [`${codeMap}_google-label`]: mGoogleLabel,
    [`${codeMap}_google-link`]: mGoogleLink,
    [`${codeMap}_google-embed`]: mGoogleEmbed,
    [`${codeMap}_waze-label`]: mWazeLabel,
    [`${codeMap}_waze-link`]: mWazeLink,
  } = map

  return (
    <>
      <Button
        bg="yellow.600"
        color="white"
        size="sm"
        borderRadius="20px"
        _hover={{ bg: 'yellow.700' }}
        onClick={onOpen}
      >
        {mButtonLabel.value}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} size={'xl'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {mTitle.value} <br />
            <Box as={'span'} fontWeight="normal" fontSize="14px">
              {mTitleSub.value}
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={1} spacingY="16px">
              <Box>
                <Button
                  bg="yellow.600"
                  color="white"
                  size="sm"
                  borderRadius="20px"
                  _hover={{ bg: 'yellow.700' }}
                  w="full"
                  as="a"
                  target="_blank"
                  href={mGoogleLink.value}
                >
                  {mGoogleLabel.value}
                </Button>
              </Box>
              <Box>
                <Button
                  bg="yellow.600"
                  color="white"
                  size="sm"
                  borderRadius="20px"
                  _hover={{ bg: 'yellow.700' }}
                  w="full"
                  as="a"
                  target="_blank"
                  href={mWazeLink.value}
                >
                  {mWazeLabel.value}
                </Button>
              </Box>
              <Box>
                <AspectRatio ratio={4 / 3}>
                  <iframe
                    src={mGoogleEmbed.value}
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </AspectRatio>
              </Box>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}

export default Map
