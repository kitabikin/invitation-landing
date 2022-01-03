import { useEffect, useState } from 'react'
import Image from 'next/image'
import _ from 'lodash'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { Container, Box, SimpleGrid, Text } from '@chakra-ui/react'

function FeatureCountdownTimer({ ...props }) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGeneral}-bgHr`]: generalBgHr,
    [`${codeGeneral}-colorPrimary`]: generalColorPrimary,
  } = general

  // CountdownTimer
  const codeCountdownTimer = `${props.options.code}-countdownTimer`
  const countdownTimer = props.feature[codeCountdownTimer].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeCountdownTimer}-date`]: countdownTimerDate,
    [`${codeCountdownTimer}-time`]: countdownTimerTime,
  } = countdownTimer

  const deadline =
    props.options.from === 'theme'
      ? props.options.date
      : `${countdownTimerDate.value} ${countdownTimerTime.value}`

  const leading0 = num => {
    return num < 10 ? '0' + num : num
  }

  const getTimeUntil = deadline => {
    const time = Date.parse(deadline) - Date.parse(new Date())
    if (time < 0) {
      setDays(0)
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)))
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
      setMinutes(Math.floor((time / 1000 / 60) % 60))
      setSeconds(Math.floor((time / 1000) % 60))
    }
  }

  useEffect(() => {
    setInterval(() => getTimeUntil(deadline), 1000)

    return () => getTimeUntil(deadline)
  }, [deadline])

  return (
    <>
      <Container h="full" maxW="xl" centerContent py="6" px="6">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* General Hr */}
          <Image
            src={generalBgHr.value}
            alt={generalBgHr.label}
            width="100"
            height="42.77"
          />

          <SimpleGrid mt="4" columns={4}>
            <Box>
              <Text
                fontFamily="Arial"
                fontSize={{ base: '5xl', md: '6xl' }}
                fontWeight="bold"
              >
                {leading0(days)}
              </Text>{' '}
              <Box fontSize="2xl" color={generalColorPrimary.value} mt="-35px">
                Hari
              </Box>
            </Box>
            <Box>
              <Text
                fontFamily="Arial"
                fontSize={{ base: '5xl', md: '6xl' }}
                fontWeight="bold"
              >
                {leading0(hours)}
              </Text>{' '}
              <Box fontSize="2xl" color={generalColorPrimary.value} mt="-35px">
                Jam
              </Box>
            </Box>
            <Box>
              <Text
                fontFamily="Arial"
                fontSize={{ base: '5xl', md: '6xl' }}
                fontWeight="bold"
              >
                {leading0(minutes)}
              </Text>{' '}
              <Box fontSize="2xl" color={generalColorPrimary.value} mt="-35px">
                Menit
              </Box>
            </Box>
            <Box>
              <Text
                fontFamily="Arial"
                fontSize={{ base: '5xl', md: '6xl' }}
                fontWeight="bold"
              >
                {leading0(seconds)}
              </Text>{' '}
              <Box fontSize="2xl" color={generalColorPrimary.value} mt="-35px">
                Detik
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </>
  )
}

export default FeatureCountdownTimer
