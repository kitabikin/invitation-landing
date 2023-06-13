import Image from "next/legacy/image"
import _ from 'lodash'
import { Container, Box, Flex, Button } from '@chakra-ui/react'

function FeatureKepada({ ...props }) {
  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGeneral}-bgCloud`]: generalbgCloud,
    [`${codeGeneral}-bgHr`]: generalbgHr,
    [`${codeGeneral}-colorPrimary`]: generalcolorPrimary,
  } = general

  // Kepada
  const codeKepada = `${props.options.code}-kepada`
  const kepada = props.feature[codeKepada].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeKepada}-image`]: kepadaImage,
    [`${codeKepada}-title`]: kepadaTitle,
    [`${codeKepada}-buttonLabel`]: kepadaButtonLabel,
  } = kepada

  return (
    <>
      <Container h="full" maxW="md" centerContent>
        <Flex
          position="relative"
          px="4"
          py="8"
          h="full"
          w="full"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          bgImage={`url('${generalbgCloud.value}')`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="contain"
          flexDir="column"
        >
          {/* Kepada Image */}
          {kepadaImage && kepadaImage.is_active && (
            <Flex borderRadius="50%" overflow="hidden">
              <Image
                src={kepadaImage.value}
                alt={kepadaImage.label}
                width="100"
                height="100"
              />
            </Flex>
          )}

          {/* General Hr */}
          <Box mt="6">
            <Image
              src={generalbgHr.value}
              alt={generalbgHr.label}
              width="100"
              height="42.77"
            />
          </Box>

          {/* Kepada Title */}
          {kepadaTitle && kepadaTitle.is_active && (
            <Box mt="4" fontWeight="bold" fontStyle="italic">
              {kepadaTitle.value}
            </Box>
          )}

          {/* Options Guest */}
          <Box mt="6" fontWeight="bold" fontSize="3xl">
            {props.options.guest}
          </Box>

          {/* Kepada Button Label */}
          <Button
            mt="6"
            bg="white"
            color="black"
            border="2px"
            borderColor={generalcolorPrimary.value}
            borderRadius="20px"
            fontStyle="italic"
            px="8"
            _hover={{ bg: generalcolorPrimary.value }}
            onClick={props.onDisplayChange}
          >
            {kepadaButtonLabel.value}
          </Button>
        </Flex>
      </Container>
    </>
  )
}

export default FeatureKepada
