import { useEffect, useRef } from 'react';
import _ from 'lodash';
import { Box } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { reduceFeature } from '@/libs/utils';

function FeatureSnowflakes({ ...props }) {
  const containerRef = useRef();

  // Get Data ==================================================================
  // Snowflakes
  const codeSnowflakes = `${props.options.code}-snowflakes`;
  const snowflakes = reduceFeature(props.feature[codeSnowflakes].column);
  const {
    [`${codeSnowflakes}-image`]: snowflakesImage,
    [`${codeSnowflakes}-total`]: snowflakesTotal,
  } = snowflakes;

  useEffect(() => {
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;

    for (let i = 0; i < snowflakesTotal.value; i++) {
      const Div = document.createElement('div');
      const size = R(20, 30);

      const image = snowflakesImage.value
        ? `url(${snowflakesImage.value})`
        : 'var(--hazel-bg-snowflake)';

      gsap.set(Div, {
        width: `${size}px`,
        height: `${size}px`,
        position: 'absolute',
        backgroundImage: image,
        backgroundSize: '100% 100%',
        x: R(0, w),
        y: R(-200, -150),
        z: R(-200, 200),
      });
      containerRef.current.appendChild(Div);
      animm(Div);
    }

    function animm(elm) {
      gsap.to(elm, {
        y: h + 200,
        ease: 'Linear.easeNone',
        repeat: -1,
        delay: -15,
        duration: R(10, 30),
      });
      gsap.to(elm, {
        x: '+=100',
        rotationX: R(0, 360),
        rotationY: R(0, 360),
        rotationZ: R(0, 180),
        repeat: -1,
        yoyo: true,
        ease: 'Sine.easeOut',
        duration: R(4, 8),
        opacity: 0.5,
      });
    }

    function R(min, max) {
      return min + Math.random() * (max - min);
    }
  }, [snowflakesImage, snowflakesTotal]);

  return (
    <>
      <Box
        zIndex="400"
        ref={containerRef}
        position={'absolute'}
        width={'full'}
        height={{ base: '100vh', md: '80vh' }}
      ></Box>
    </>
  );
}

export default FeatureSnowflakes;
