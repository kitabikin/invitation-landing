import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Container, Box, SimpleGrid, Text } from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

function FeatureCountdownTimer({ ...props }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Get Data ==================================================================
  // Countdown Timer
  const codeCountdownTimer = `${props.options.code}-countdownTimer`;
  const countdownTimer = reduceFeature(
    props.feature[codeCountdownTimer].column,
  );
  const {
    [`${codeCountdownTimer}-date`]: countdownTimerDate,
    [`${codeCountdownTimer}-time`]: countdownTimerTime,
  } = countdownTimer;

  const leading0 = (num) => {
    return num < 10 ? '0' + num : num;
  };

  const getTimeUntil = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  useEffect(() => {
    const dt = countdownTimerDate.value;
    const tm = countdownTimerTime.value;
    const ctDate = new Date(`${dt} ${tm}`) || props.options.date;
    setInterval(() => getTimeUntil(ctDate), 1000);

    return () => getTimeUntil(ctDate);
  }, [countdownTimerDate, countdownTimerTime, props.options.date]);

  return (
    <>
      <Container h="full" maxW="xl" centerContent py="6" px="6">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* General Hr */}
          <Box
            mt={6}
            bgImage={'var(--hazel-bg-hr)'}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="contain"
            h="75"
          />

          <SimpleGrid mt="4" columns={4}>
            <Box>
              <Text
                fontFamily="Inter"
                fontSize={{ base: '5xl', md: '6xl' }}
                fontWeight="bold"
              >
                {leading0(days)}
              </Text>{' '}
              <Box
                fontSize="2xl"
                color={'var(--hazel-color-primary)'}
                mt="-15px"
              >
                Hari
              </Box>
            </Box>
            <Box>
              <Text
                fontFamily="Inter"
                fontSize={{ base: '5xl', md: '6xl' }}
                fontWeight="bold"
              >
                {leading0(hours)}
              </Text>{' '}
              <Box
                fontSize="2xl"
                color={'var(--hazel-color-primary)'}
                mt="-15px"
              >
                Jam
              </Box>
            </Box>
            <Box>
              <Text
                fontFamily="Inter"
                fontSize={{ base: '5xl', md: '6xl' }}
                fontWeight="bold"
              >
                {leading0(minutes)}
              </Text>{' '}
              <Box
                fontSize="2xl"
                color={'var(--hazel-color-primary)'}
                mt="-15px"
              >
                Menit
              </Box>
            </Box>
            <Box>
              <Text
                fontFamily="Inter"
                fontSize={{ base: '5xl', md: '6xl' }}
                fontWeight="bold"
              >
                {leading0(seconds)}
              </Text>{' '}
              <Box
                fontSize="2xl"
                color={'var(--hazel-color-primary)'}
                mt="-15px"
              >
                Detik
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
}

export default FeatureCountdownTimer;
