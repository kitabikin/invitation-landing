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

function FeatureMap({ ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGeneral}-colorPrimary`]: generalColorPrimary,
    [`${codeGeneral}-colorSecondary`]: generalColorSecondary,
  } = general

  // Map
  const codeMap = `${props.options.code}-map${props.type}`
  const map = props.feature[codeMap].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeMap}-buttonLabel`]: mapButtonLabel,
    [`${codeMap}-title`]: mapTitle,
    [`${codeMap}-subTitle`]: mapSubTitle,
    [`${codeMap}-googleLabel`]: mapGoogleLabel,
    [`${codeMap}-googleLink`]: mapGoogleLink,
    [`${codeMap}-googleEmbed`]: mapGoogleEmbed,
    [`${codeMap}-wazeLabel`]: mapWazeLabel,
    [`${codeMap}-wazeLink`]: mapWazeLink,
  } = map

  return (
    <>
      <Button
        bg={generalColorPrimary.value}
        color="white"
        size="sm"
        borderRadius="20px"
        _hover={{ bg: generalColorSecondary.value }}
        onClick={onOpen}
        fontWeight="normal"
        px="6"
      >
        {mapButtonLabel.value}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} size={'xl'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {mapTitle.value} <br />
            <Box as={'span'} fontWeight="normal" fontSize="14px">
              {mapSubTitle.value}
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacingX="4">
              <Box>
                <Button
                  bg={generalColorPrimary.value}
                  color="white"
                  size="sm"
                  borderRadius="20px"
                  _hover={{ bg: generalColorSecondary.value }}
                  w="full"
                  as="a"
                  target="_blank"
                  href={mapGoogleLink.value}
                >
                  {mapGoogleLabel.value}
                </Button>
              </Box>
              <Box>
                <Button
                  bg={generalColorPrimary.value}
                  color="white"
                  size="sm"
                  borderRadius="20px"
                  _hover={{ bg: generalColorSecondary.value }}
                  w="full"
                  as="a"
                  target="_blank"
                  href={mapWazeLink.value}
                >
                  {mapWazeLabel.value}
                </Button>
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
  )
}

export default FeatureMap
