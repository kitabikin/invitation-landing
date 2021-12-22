import { useState } from 'react'
import Image from 'next/image'
import ReactPlayer from 'react-player'

import _ from 'lodash'
import { Container, Box, Flex, Button, Circle } from '@chakra-ui/react'
import { MdMusicNote, MdMusicOff } from 'react-icons/md'

function To({ options, feature }) {
  const [display, setDisplay] = useState('block')
  const [playing, setPlaying] = useState(false)

  const code = 'golden-gold'

  // Feature
  const { [`${code}_music`]: fMusic } = feature

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

  // Music
  const codeMusic = `${code}_music`
  const music = feature[codeMusic].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeMusic}_source`]: mSource } = music

  function handleClick() {
    setDisplay('none')
    setPlaying(!playing)
  }

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
              onClick={() => handleClick()}
            >
              {tButtonLabel.value}
            </Button>
          </Flex>
        </Container>
      </Box>

      {fMusic && fMusic.is_active && (
        <Box>
          <Circle
            as={'button'}
            cursor="pointer"
            position="fixed"
            size="50px"
            bottom="30px"
            right="30px"
            border="2px"
            zIndex="400"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <MdMusicNote size={20} /> : <MdMusicOff size={20} />}
          </Circle>
          <ReactPlayer
            url={mSource.value}
            playing={playing}
            loop={true}
            width="0"
            height="0"
          />
        </Box>
      )}
    </>
  )
}

export default To
