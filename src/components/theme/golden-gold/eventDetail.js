import Image from 'next/image'

import _ from 'lodash'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { Container, Box, Button } from '@chakra-ui/react'

import CountdownTimer from '@/components/theme/golden-gold/countdownTimer'
import Calendar from '@/components/theme/golden-gold/calendar'

function EventDetail({ options, feature }) {
  const code = 'golden-gold'

  // Feature
  const { [`${code}_countdown-timer`]: fCountdownTimer } = feature

  // General
  const codeGeneral = `${code}_general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGeneral}_background`]: gBg,
    [`${codeGeneral}_background-between-quotes-event-detail-before`]: gBgBefore,
    [`${codeGeneral}_background-event-detail-after`]: gBgAfter,
  } = general

  // Event Detail
  const codeEventDetail = `${code}_event-detail`
  const eventDetail = feature[codeEventDetail].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeEventDetail}_title`]: edTitle,
    [`${codeEventDetail}_unduh-mantu-title`]: edUmTitle,
    [`${codeEventDetail}_unduh-mantu-date`]: edUmDate,
    [`${codeEventDetail}_unduh-mantu-time`]: edUmTime,
    [`${codeEventDetail}_unduh-mantu-location`]: edUmLocation,
    [`${codeEventDetail}_unduh-mantu-address`]: edUmAddress,
    [`${codeEventDetail}_contract-title`]: edCTitle,
    [`${codeEventDetail}_contract-date`]: edCDate,
    [`${codeEventDetail}_contract-time`]: edCTime,
    [`${codeEventDetail}_contract-location`]: edCLocation,
    [`${codeEventDetail}_contract-address`]: edCAddress,
    [`${codeEventDetail}_reception-title`]: edRTitle,
    [`${codeEventDetail}_reception-date`]: edRDate,
    [`${codeEventDetail}_reception-time`]: edRTime,
    [`${codeEventDetail}_reception-location`]: edRLocation,
    [`${codeEventDetail}_reception-address`]: edRAddress,
    [`${codeEventDetail}_save-the-date`]: edSaveTheDate,
    [`${codeEventDetail}_closing-sentence`]: edClosingSentence,
    [`${codeEventDetail}_closing-thank-you`]: edClosingThankYou,
    [`${codeEventDetail}_closing-saying`]: edClosingSaying,
  } = eventDetail

  const formatDate = date => {
    return format(date, 'EEEE, d MMMM yyyy', { locale: id })
  }

  // const { column: dG } = general
  // const { column: dED } = eventDetail
  // const { column: dC } = calendar

  // const item = (data, code) => {
  //   return _.find(data, { code: code })
  // }

  // const changeDate = value => {
  //   let data
  //   if (options.from === 'theme') {
  //     data = options.date
  //   } else {
  //     data = parseISO(value)
  //   }

  //   return format(data, 'EEEE, d MMMM yyyy', { locale: id })
  // }

  // // General
  // const cG = 'golden-gold_general_'
  // const bg = item(dG, `${cG}background`)
  // const bgBefore = item(
  //   dG,
  //   `${cG}background-between-quotes-event-detail-before`
  // )
  // const bgAfter = item(dG, `${cG}background-event-detail-after`)

  // // Event Detail
  // const cED = 'golden-gold_event-detail_'
  // const title = item(dED, `${cED}title`)
  // const umTitle = item(dED, `${cED}unduh-mantu-title`)
  // const umDate = item(dED, `${cED}unduh-mantu-date`)
  // const umTime = item(dED, `${cED}unduh-mantu-time`)
  // const umLocation = item(dED, `${cED}unduh-mantu-location`)
  // const umAddress = item(dED, `${cED}unduh-mantu-address`)
  // const cTitle = item(dED, `${cED}contract-title`)
  // const cDate = item(dED, `${cED}contract-date`)
  // const cTime = item(dED, `${cED}contract-time`)
  // const cLocation = item(dED, `${cED}contract-location`)
  // const cAddress = item(dED, `${cED}contract-address`)
  // const rTitle = item(dED, `${cED}reception-title`)
  // const rDate = item(dED, `${cED}reception-date`)
  // const rTime = item(dED, `${cED}reception-time`)
  // const rLocation = item(dED, `${cED}reception-location`)
  // const rAddress = item(dED, `${cED}reception-address`)
  // const saveTheDate = item(dED, `${cED}save-the-date`)
  // const closingSentence = item(dED, `${cED}closing-sentence`)
  // const closingThankYou = item(dED, `${cED}closing-thank-you`)
  // const closingSaying = item(dED, `${cED}closing-saying`)

  // // Calendar
  // const cC = 'golden-gold_calendar_'
  // const cUmButtonLabel = item(dC, `${cC}um-button-label`)
  // const cUmLink = item(dC, `${cC}um-link`)
  // const cCButtonLabel = item(dC, `${cC}c-button-label`)
  // const cCLink = item(dC, `${cC}c-link`)
  // const cRButtonLabel = item(dC, `${cC}r-button-label`)
  // const cRLink = item(dC, `${cC}r-link`)

  return (
    <>
      <Box
        position="relative"
        _before={{
          bgImage: `url('${gBgBefore.value}')`,
          bgPosition: 'top left',
          bgRepeat: 'no-repeat',
          bgSize: 'contain',
          content: "''",
          display: 'block',
          height: '300px',
          width: '100%',
          zIndex: '99',
          position: 'absolute',
          top: '-150px',
          left: '0',
        }}
        _after={{
          bgImage: `url('${gBgAfter.value}')`,
          bgPosition: 'bottom left',
          bgRepeat: 'no-repeat',
          bgSize: 'contain',
          content: "''",
          display: 'block',
          height: '140px',
          width: '100%',
          zIndex: '99',
          position: 'absolute',
          bottom: '-50px',
          right: '0',
        }}
      >
        <Box
          bgImage={`url('${gBg.value}')`}
          bgPosition="center center"
          bgRepeat="repeat"
          bgSize="300px 300px"
          pt="24"
          pb="24"
        >
          <Container h="full" maxW="4xl" centerContent>
            <Box
              position="relative"
              px="4"
              py="8"
              h="full"
              w="full"
              textAlign="center"
            >
              {/* Event Detail Title */}
              {edTitle && edTitle.is_active && (
                <Box fontWeight="bold" fontSize="2xl">
                  {edTitle.value}
                </Box>
              )}

              {/* Unduh Mantu */}
              <Box mt="12">
                {/* Event Detail Unduh Mantu Title */}
                {edUmTitle && edUmTitle.is_active && (
                  <Box fontWeight="bold" fontSize="xl">
                    {edUmTitle.value}
                  </Box>
                )}

                {/* Event Detail Unduh Mantu Date */}
                {edUmDate && edUmDate.is_active && (
                  <Box mt="4">
                    {formatDate(
                      options.from === 'theme'
                        ? options.date
                        : parseISO(edUmDate.value)
                    )}
                  </Box>
                )}

                {/* Event Detail Unduh Mantu Time */}
                {edUmTime && edUmTime.is_active && (
                  <Box mt="2">{edUmTime.value}</Box>
                )}

                {/* <Box mt="2">
                  <Calendar
                    buttonLabel={cUmButtonLabel.value}
                    link={cUmLink.value}
                  />
                </Box> */}

                <Box mt="4">
                  {/* Event Detail Unduh Mantu Location */}
                  {edUmLocation && edUmLocation.is_active && (
                    <Box fontWeight="bold">{edUmLocation.value}</Box>
                  )}

                  {/* Event Detail Unduh Mantu Address */}
                  {edUmAddress && edUmAddress.is_active && (
                    <Box mt="1">{edUmAddress.value}</Box>
                  )}

                  {/* <Box mt="2">
                    <Button
                      bg="yellow.600"
                      color="white"
                      size="sm"
                      borderRadius="20px"
                      _hover={{ bg: 'yellow.700' }}
                    >
                      Lihat Lokasi Unduh Mantu (Belum)
                    </Button>
                  </Box> */}
                </Box>
              </Box>

              {/* Contract */}
              <Box mt="12">
                {/* Event Detail Contract Title */}
                {edCTitle && edCTitle.is_active && (
                  <Box fontWeight="bold" fontSize="xl">
                    {edCTitle.value}
                  </Box>
                )}

                {/* Event Detail Contract Date */}
                {edCDate && edCDate.is_active && (
                  <Box mt="4">
                    {formatDate(
                      options.from === 'theme'
                        ? options.date
                        : parseISO(edCDate.value)
                    )}
                  </Box>
                )}

                {/* Event Detail Contract Time */}
                {edCTime && edCTime.is_active && (
                  <Box mt="2">{edCTime.value}</Box>
                )}

                {/* <Box mt="2">
                  <Calendar
                    buttonLabel={cUmButtonLabel.value}
                    link={cUmLink.value}
                  />
                </Box> */}

                <Box mt="4">
                  {/* Event Detail Contract Location */}
                  {edCLocation && edCLocation.is_active && (
                    <Box fontWeight="bold">{edCLocation.value}</Box>
                  )}

                  {/* Event Detail Contract Address */}
                  {edCAddress && edCAddress.is_active && (
                    <Box mt="1">{edCAddress.value}</Box>
                  )}

                  {/* <Box mt="2">
                    <Button
                      bg="yellow.600"
                      color="white"
                      size="sm"
                      borderRadius="20px"
                      _hover={{ bg: 'yellow.700' }}
                    >
                      Lihat Lokasi Contract (Belum)
                    </Button>
                  </Box> */}
                </Box>
              </Box>

              {/* Reception */}
              <Box mt="12">
                {/* Event Detail Reception Title */}
                {edRTitle && edRTitle.is_active && (
                  <Box fontWeight="bold" fontSize="xl">
                    {edRTitle.value}
                  </Box>
                )}

                {/* Event Detail Reception Date */}
                {edRDate && edRDate.is_active && (
                  <Box mt="4">
                    {formatDate(
                      options.from === 'theme'
                        ? options.date
                        : parseISO(edRDate.value)
                    )}
                  </Box>
                )}

                {/* Event Detail Reception Time */}
                {edRTime && edRTime.is_active && (
                  <Box mt="2">
                    {JSON.parse(edRTime.value).length > 1 ? (
                      JSON.parse(edRTime.value).map((res, i) => (
                        <Box key={i}>
                          <Box as="span" fontWeight="bold">
                            Sesi {i + 1}:
                          </Box>{' '}
                          {res.time}
                        </Box>
                      ))
                    ) : (
                      <Box>{JSON.parse(edRTime.value)[0].time}</Box>
                    )}
                  </Box>
                )}

                {/* <Box mt="2">
                  <Calendar
                    buttonLabel={cUmButtonLabel.value}
                    link={cUmLink.value}
                  />
                </Box> */}

                <Box mt="4">
                  {/* Event Detail Reception Location */}
                  {edRLocation && edRLocation.is_active && (
                    <Box fontWeight="bold">{edRLocation.value}</Box>
                  )}

                  {/* Event Detail Reception Address */}
                  {edRAddress && edRAddress.is_active && (
                    <Box mt="1">{edRAddress.value}</Box>
                  )}

                  {/* <Box mt="2">
                    <Button
                      bg="yellow.600"
                      color="white"
                      size="sm"
                      borderRadius="20px"
                      _hover={{ bg: 'yellow.700' }}
                    >
                      Lihat Lokasi Reception (Belum)
                    </Button>
                  </Box> */}
                </Box>
              </Box>

              <Box mt="16">
                {/* Event Detail Save The Date */}
                {edSaveTheDate && edSaveTheDate.is_active && (
                  <Image
                    src={edSaveTheDate.value}
                    alt={edSaveTheDate.label}
                    width="200"
                    height="200"
                  />
                )}

                {/* Countdown Timer */}
                {fCountdownTimer && fCountdownTimer.is_active && (
                  <CountdownTimer options={options} feature={feature} />
                )}
              </Box>

              <Box mt="16">
                {/* Event Detail Closing Sentence */}
                {edClosingSentence && edClosingSentence.is_active && (
                  <Box>{edClosingSentence.value}</Box>
                )}

                {/* Event Detail Closing Thank You */}
                {edClosingThankYou && edClosingThankYou.is_active && (
                  <Box mt="2">{edClosingThankYou.value}</Box>
                )}

                {/* Event Detail Closing Saying */}
                {edClosingSaying && edClosingSaying.is_active && (
                  <Box mt="5" fontSize="xl">
                    {edClosingSaying.value}
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default EventDetail
