import Image from 'next/image'
import { Flex } from '@chakra-ui/react'

function ImageFrame({ frame, image, size }) {
  const frameHeight = size + 1
  const frameWidth = frameHeight * 1.188

  return (
    <>
      <Flex
        position="absolute"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        w="full"
      >
        <Flex borderRadius="50%" overflow="hidden">
          <Image
            src={image.value}
            alt={image.label}
            width={size}
            height={size}
          />
        </Flex>
      </Flex>
      <Image
        src={frame.value}
        alt={frame.label}
        width={frameWidth}
        height={frameHeight}
      />
    </>
  )
}

export default ImageFrame
