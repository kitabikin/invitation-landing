import Image from 'next/image';
import { gsap } from 'gsap';
import { useAtom } from 'jotai';
import { Container, Box, Button, Flex } from '@chakra-ui/react';

import { isOverflowYAtom } from '@/store/coniferStore';

function FeatureTo({ ...props }) {
  const [_, setIsOverflowYAtom] = useAtom(isOverflowYAtom);

  const handleClick = () => {
    const refTo = document.querySelector('.conifer-to');
    const tl = gsap.timeline();
    tl.fromTo(
      refTo,
      {
        y: 0,
      },
      {
        y: -refTo.clientHeight,
        duration: 1,
        ease: 'Sine.easeIn',
        display: 'none',
      },
    );

    setTimeout(() => {
      setIsOverflowYAtom(true);
    }, 1000);
  };

  return (
    <>
      <Container h={'full'} maxW={'md'} centerContent>
        <Flex
          position={'relative'}
          px={12}
          py={8}
          h={'full'}
          w={'full'}
          textAlign={'center'}
          alignItems={'center'}
          justifyContent={'center'}
          bgImage={'var(--conifer-bg-to)'}
          bgPosition={'center'}
          bgRepeat={'no-repeat'}
          bgSize={'contain'}
          flexDir={'column'}
        >
          {/* Kepada Image */}
          {/* {kepadaImage && kepadaImage.is_active && ( */}
          <Flex borderRadius={'50%'} overflow={'hidden'}>
            <Image
              src={'/theme/to-image.png'} // kepadaImage.value
              alt={'To Image'} // kepadaImage.label
              width={100}
              height={100}
            />
          </Flex>
          {/* )} */}

          {/* Kepada Title */}
          {/* {kepadaTitle && kepadaTitle.is_active && ( */}
          <Box mt={4} fontWeight={'bold'} fontStyle={'italic'}>
            {'Yth. Bapak/Ibu/Saudara/i'} {/* {kepadaTitle.value} */}
          </Box>
          {/* )} */}

          {/* Options Guest */}
          <Box mt={4} fontWeight={'bold'} fontSize={{ base: '2xl', md: '3xl' }}>
            {'Tamu Undangan'} {/* {props.options.guest} */}
          </Box>

          {/* Kepada Button Label */}
          <Button
            mt={4}
            bg={'white'}
            color={'var(--conifer-color-body)'}
            border={'2px'}
            borderColor={'#F0D6A5'}
            borderRadius={'20px'}
            fontStyle={'italic'}
            px={6}
            _hover={{
              bg: 'var(--conifer-color-primary)',
              color: 'white',
              borderColor: 'var(--conifer-color-primary)',
            }}
            onClick={handleClick}
          >
            {'Buka Undangan'} {/* {kepadaButtonLabel.value} */}
          </Button>
        </Flex>
      </Container>
    </>
  );
}

export default FeatureTo;
