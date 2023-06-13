import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import { Box, Circle } from '@chakra-ui/react';

import { MdMusicNote, MdMusicOff } from 'react-icons/md';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

function FeatureMusik({ ...props }) {
  const [hasWindow, setHasWindow] = useState(false);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  // Get Data ==================================================================
  // Musik
  const codeMusik = `${props.options.code}-musik`;
  const musik = props.feature[codeMusik].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {},
  );
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
      {hasWindow && (
        <ReactPlayer
          url={musikSong.value}
          playing={props.isPlaying}
          loop={true}
          style={{ display: 'none' }}
          playsinline={true}
          playsInline={true}
        />
      )}
    </>
  );
}

export default FeatureMusik;
