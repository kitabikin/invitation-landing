import Image from 'next/image';
import { useAtom } from 'jotai';
import _ from 'lodash';
import { Container, Box, Flex, Button } from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

import { displayAtom, isPlayingAtom, overflowYAtom } from '@/store/hazelStore';

function FeatureKepada({ ...props }) {
  const [, setDisplay] = useAtom(displayAtom);
  const [, setIsPlaying] = useAtom(isPlayingAtom);
  const [, setOverflowY] = useAtom(overflowYAtom);

  // Get Data ==================================================================
  // Kepada
  const codeKepada = `${props.options.code}-kepada`;
  const kepada = reduceFeature(props.feature[codeKepada].column);
  const {
    [`${codeKepada}-image`]: kepadaImage,
    [`${codeKepada}-title`]: kepadaTitle,
    [`${codeKepada}-buttonLabel`]: kepadaButtonLabel,
  } = kepada;

  // Function ==================================================================
  function handleClickTo() {
    setDisplay('none');
    setIsPlaying(true);
    setOverflowY('auto');
  }

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
          bgImage={'var(--hazel-bg-to)'}
          bgPosition={'center'}
          bgRepeat={'no-repeat'}
          bgSize={'contain'}
          flexDir={'column'}
        >
          {/* Kepada Image */}
          {kepadaImage && kepadaImage.is_active && (
            <Flex borderRadius={'50%'} overflow={'hidden'}>
              <Image
                src={kepadaImage.value}
                alt={kepadaImage.label}
                width={100}
                height={100}
              />
            </Flex>
          )}

          {/* Kepada Title */}
          {kepadaTitle && kepadaTitle.is_active && (
            <Box mt={4} fontWeight={'bold'} fontStyle={'italic'}>
              {kepadaTitle.value}
            </Box>
          )}

          {/* Options Guest */}
          <Box mt={4} fontWeight={'bold'} fontSize={{ base: '2xl', md: '3xl' }}>
            {props.options.guest}
          </Box>

          {/* Kepada Button Label */}
          <Button
            mt={4}
            bg={'white'}
            color={'var(--hazel-color-body)'}
            border={'2px'}
            borderColor={'var(--hazel-color-primary)'}
            borderRadius={'20px'}
            fontStyle={'italic'}
            px={8}
            _hover={{ bg: 'var(--hazel-color-primary)', color: 'white' }}
            onClick={() => handleClickTo()}
          >
            {kepadaButtonLabel.value}
          </Button>
        </Flex>
      </Container>
    </>
  );
}

export default FeatureKepada;
