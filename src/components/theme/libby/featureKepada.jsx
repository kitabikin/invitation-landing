import Image from 'next/image';
import { useAtom } from 'jotai';
import _ from 'lodash';
import { Container, Box, Flex, Button } from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

import { displayAtom, isPlayingAtom, overflowYAtom } from '@/store/libbyStore';

function FeatureKepada({ ...props }) {
  const [, setDisplay] = useAtom(displayAtom);
  const [, setIsPlaying] = useAtom(isPlayingAtom);
  const [, setOverflowY] = useAtom(overflowYAtom);

  // Get Data ==================================================================
  // Kepada
  const codeKepada = `${props.options.code}-kepada`;
  const kepada = reduceFeature(props.feature[codeKepada].column);
  const {
    [`${codeKepada}-bgImage`]: kepadaBgImage,
    [`${codeKepada}-to`]: kepadaTo,
    [`${codeKepada}-to-subject`]: kepadaToSubject,
    [`${codeKepada}-buttonLabel`]: kepadaButtonLabel,
  } = kepada;

  // Section
  const bgImage = (kepadaBgImage) => {
    if (kepadaBgImage && kepadaBgImage.is_active) {
      return kepadaBgImage.value;
    }

    return 'var(--libby-color-primary)';
  };

  // Function ==================================================================
  function handleClickTo() {
    setDisplay('none');
    setIsPlaying(true);
    setOverflowY('auto');
  }

  return (
    <>
      <Flex
        position={'relative'}
        px={12}
        py={8}
        h={'full'}
        w={'full'}
        textAlign={'center'}
        alignItems={'center'}
        justifyContent={'center'}
        bgImage={bgImage(kepadaBgImage)}
        bgPosition={'center'}
        bgRepeat={'repeat'}
        bgSize={{ base: 'cover', md: 'contain' }}
        flexDir={'column'}
      >
        {/* Kepada To */}
        {kepadaTo && kepadaTo.is_active && (
          <Box fontWeight={'bold'} fontStyle={'italic'}>
            {kepadaTo.value}
          </Box>
        )}

        {/* Kepada To Subject */}
        {kepadaToSubject && kepadaToSubject.is_active && (
          <Box fontWeight={'bold'} fontStyle={'italic'}>
            {kepadaToSubject.value}
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
          color={'var(--libby-color-body)'}
          px={8}
          _hover={{ bg: 'var(--libby-color-primary)', color: 'white' }}
          onClick={() => handleClickTo()}
        >
          {kepadaButtonLabel.value}
        </Button>
      </Flex>
    </>
  );
}

export default FeatureKepada;
