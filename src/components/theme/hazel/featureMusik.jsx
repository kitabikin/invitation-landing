import _ from 'lodash';
import { Box, Circle } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { reduceFeature } from '@/libs/utils';

import { MdMusicNote, MdMusicOff } from 'react-icons/md';

function FeatureMusik({ ...props }) {
  // Get Data ==================================================================
  // Musik
  const codeMusik = `${props.options.code}-musik`;
  const musik = reduceFeature(props.feature[codeMusik].column);
  const { [`${codeMusik}-song`]: musikSong } = musik;

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
        onClick={props.onPlayingChange}
        zIndex="500"
        aria-label="Music"
      >
        {props.isPlaying ? <MdMusicNote size={20} /> : <MdMusicOff size={20} />}
      </Circle>
      <ReactPlayer
        url={musikSong.value}
        playing={props.isPlaying}
        loop={true}
        style={{ display: 'none' }}
      />
    </>
  );
}

export default FeatureMusik;
