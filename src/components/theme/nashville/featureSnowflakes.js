import { useEffect, useRef } from 'react'
import _ from 'lodash'
import { Box } from '@chakra-ui/react'
import { gsap } from 'gsap'

function FeatureSnowflakes({ ...props }) {
  const containerRef = useRef()

  // Get Data ==================================================================
  // Snowflakes
  const codeSnowflakes = `${props.options.code}-snowflakes`
  const snowflakes = props.feature[codeSnowflakes].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeSnowflakes}-image`]: snowflakesImage,
    [`${codeSnowflakes}-total`]: snowflakesTotal,
  } = snowflakes

  useEffect(() => {
    const w = containerRef.current.clientWidth
    const h = containerRef.current.clientHeight

    for (let i = 0; i < snowflakesTotal.value; i++) {
      const Div = document.createElement('div')
      const size = R(20, 30)

      gsap.set(Div, {
        width: `${size}px`,
        height: `${size}px`,
        position: 'absolute',
        backgroundImage: `url(${snowflakesImage.value})`,
        backgroundSize: '100% 100%',
        x: R(0, w),
        y: R(-200, -150),
        z: R(-200, 200),
      })
      containerRef.current.appendChild(Div)
      animm(Div)
    }

    function animm(elm) {
      gsap.to(elm, {
        y: h + 100,
        ease: 'Linear.easeNone',
        repeat: -1,
        delay: -15,
        duration: R(10, 30),
      })
      gsap.to(elm, {
        x: '+=100',
        rotationZ: R(0, 180),
        repeat: -1,
        yoyo: true,
        ease: 'Sine.easeInOut',
        duration: R(4, 8),
      })
      gsap.to(elm, {
        rotationX: R(0, 360),
        rotationY: R(0, 360),
        repeat: -1,
        yoyo: true,
        ease: 'Sine.easeInOut',
        delay: -5,
        duration: R(4, 8),
      })
    }

    function R(min, max) {
      return min + Math.random() * (max - min)
    }
  })

  return (
    <>
      <Box
        zIndex="400"
        ref={containerRef}
        position={'absolute'}
        width={'full'}
        height={'100vh'}
      ></Box>
    </>
  )
}

export default FeatureSnowflakes
