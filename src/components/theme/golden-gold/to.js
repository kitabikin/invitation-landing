import { useState } from 'react'
import Image from 'next/image'

import _ from 'lodash'
import { Container, Box, Flex, Button } from '@chakra-ui/react'

function To({ options, feature }) {
  const [display, setDisplay] = useState('block')

  const code = 'golden-gold'

  // General
  const codeGeneral = `${code}_general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}_background-to`]: gBgTo } = general

  // To
  const codeTo = `${code}_to`
  const to = feature[codeTo].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeTo}_photo`]: tPhoto,
    [`${codeTo}_label`]: tLabel,
    [`${codeTo}_button-label`]: tButtonLabel,
  } = to

  return (
    <>
      <Box
        position="fixed"
        h="full"
        w="full"
        zIndex="500"
        bg="white"
        opacity="1"
        overflowY="hidden"
        display={display}
      >
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
            bgImage={`url('${gBgTo.value}')`}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="contain"
            flexDir="column"
          >
            {/* To Photo */}
            {tPhoto && tPhoto.is_active && (
              <Flex borderRadius="50%" overflow="hidden">
                <Image
                  src={tPhoto.value}
                  alt={tPhoto.label}
                  width="100"
                  height="100"
                />
              </Flex>
            )}

            {/* To Label */}
            {tLabel && tLabel.is_active && <Box mt="6">{tLabel.value}</Box>}

            {/* Options Guest */}
            <Box mt="6" fontWeight="bold" fontSize="xl">
              {options.guest}
            </Box>

            {/* To Button Label */}
            <Button
              mt="6"
              bg="white"
              color="black"
              border="2px"
              borderColor="yellow.500"
              borderRadius="20px"
              px="8"
              _hover={{ bg: 'yellow.500' }}
              onClick={() => setDisplay('none')}
            >
              {tButtonLabel.value}
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default To
