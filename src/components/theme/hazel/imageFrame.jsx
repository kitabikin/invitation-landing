import Image from 'next/image';
import { Flex } from '@chakra-ui/react';

function ImageFrame({ image, size }) {
  const frameHeight = size + 35;
  const frameWidth = frameHeight;

  return (
    <>
      <Flex
        overflow={'hidden'}
        justifyContent={'center'}
        alignItems={'center'}
        w={'full'}
        my={'24px'}
        height={frameHeight}
        _before={{
          bgImage: 'var(--hazel-bg-frame)',
          bgPosition: 'right 10px top 5px',
          bgRepeat: 'no-repeat',
          bgSize: 'contain',
          content: "''",
          display: 'block',
          height: frameHeight,
          width: frameWidth,
          zIndex: '99',
          position: 'absolute',
        }}
      >
        <Flex borderRadius={'50%'} overflow={'hidden'}>
          <Image
            src={image.value}
            alt={image.label}
            width={size}
            height={size}
          />
        </Flex>
      </Flex>
    </>
  );
}

export default ImageFrame;
