import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import _ from 'lodash';
import { Box, Circle } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { reduceFeature } from '@/libs/utils';

import { isPlayingAtom } from '@/store/libbyStore';

import { MdMusicNote, MdMusicOff } from 'react-icons/md';

function FeatureMusik({ ...props }) {
  const [showChild, setShowChild] = useState(false);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  // Get Data ==================================================================
  // Musik
  const codeMusik = `${props.options.code}-musik`;
  const musik = reduceFeature(props.feature[codeMusik].column);
  const { [`${codeMusik}-song`]: musikSong } = musik;

  // Function ==================================================================
  function handlePlaying() {
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      <Circle
        as={'button'}
        cursor="pointer"
        position="fixed"
        size="50px"
        bottom="30px"
        right="30px"
        border="2px"
        onClick={() => handlePlaying()}
        zIndex="500"
        aria-label="Music"
      >
        {isPlaying ? <MdMusicNote size={20} /> : <MdMusicOff size={20} />}
      </Circle>
      <ReactPlayer
        url={musikSong.value}
        playing={isPlaying}
        loop={true}
        style={{ display: 'none' }}
        playsinline={true}
        playsInline={true}
      />
    </>
  );
}

export default FeatureMusik;
