import { useEffect, useState } from 'react'
import _ from 'lodash'
import { Box } from '@chakra-ui/react'

function CountdownTimer({ options, feature }) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const code = 'golden-gold'

  // Countdown Timer
  const codeCountdownTimer = `${code}_countdown-timer`
  const countdownTimer = feature[codeCountdownTimer].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeCountdownTimer}_datepicker`]: ctDate,
    [`${codeCountdownTimer}_timepicker`]: ctTime,
  } = countdownTimer
  const deadline =
    options.from === 'theme'
      ? options.date
      : new Date(`${ctDate.value} ${ctTime.value}`).toUTCString()

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
      <Box fontWeight="bold" fontSize="xl">
        {leading0(days)} Hari {leading0(hours)} Jam {leading0(minutes)} Menit{' '}
        {leading0(seconds)} Detik
      </Box>
    </>
  )
}

export default CountdownTimer
