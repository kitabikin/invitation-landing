import _ from 'lodash'
import { Container, Box, Flex, Text, Grid } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

import FeatureKalender from '@/components/theme/nashville/featureKalender'
import FeatureMap from '@/components/theme/nashville/featureMap'

function FeatureDetailResepsi({ ...props }) {
  // Get Data ==================================================================
  // Feature
  const {
    [`${props.options.code}-kalenderResepsi`]: fKalenderResepsi,
    [`${props.options.code}-mapResepsi`]: fMapResepsi,
  } = props.feature

  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}-colorPrimary`]: generalColorPrimary } = general

  // Detail Resepsi
  const codeDetailResepsi = `${props.options.code}-detailResepsi`
  const detailResepsi = props.feature[codeDetailResepsi].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeDetailResepsi}-title`]: detailResepsiTitle,
    [`${codeDetailResepsi}-saveTheDate1`]: detailResepsiSaveTheDate1,
    [`${codeDetailResepsi}-saveTheDate2`]: detailResepsiSaveTheDate2,
    [`${codeDetailResepsi}-date`]: detailResepsiDate,
    [`${codeDetailResepsi}-time`]: detailResepsiTime,
    [`${codeDetailResepsi}-location`]: detailResepsiLocation,
    [`${codeDetailResepsi}-address`]: detailResepsiAddress,
  } = detailResepsi

  // Function ==================================================================
  const getDate = () => {
    let date
    if (props.options.from === 'theme') {
      date = props.options.date
    } else {
      date = parseISO(detailResepsiDate.value)
    }
    return date
  }

  const getDay = date => {
    return format(date, 'd', { locale: id })
  }

  const getMonth = date => {
    return format(date, 'MMMM', { locale: id })
  }

  const getYear = date => {
    return format(date, 'yyyy', { locale: id })
  }

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="12" px="6">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Detail Resepsi Title */}
          {detailResepsiTitle && detailResepsiTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {detailResepsiTitle.value}
            </Text>
          )}

          {/* Detail Resepsi Save The Date */}
          <Box
            mt="8"
            mb="4"
            ml="20px"
            transform="rotate(-10deg)"
            fontFamily="nashvilleHandwriting2"
            fontSize={{ base: '5xl', md: '6xl' }}
          >
            {detailResepsiSaveTheDate1 &&
              detailResepsiSaveTheDate1.is_active && (
                <Text>{detailResepsiSaveTheDate1.value}</Text>
              )}
            {detailResepsiSaveTheDate2 && detailResepsiSaveTheDate2.is_active && (
              <Text mt="-30px" ml="55px">
                {detailResepsiSaveTheDate2.value}
              </Text>
            )}
          </Box>

          {/* Detail Resepsi Date */}
          {detailResepsiDate && detailResepsiDate.is_active && (
            <>
              <Grid
                mb="6"
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
                gap={0}
                alignItems="center"
              >
                <Flex justifyContent="center">
                  <Text
                    fontFamily="nashvilleTitle"
                    textTransform="uppercase"
                    fontSize={{ base: 'xl', md: '3xl' }}
                  >
                    {getMonth(getDate())}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Box
                    h={{ base: '0', md: '90px' }}
                    w={{ base: '50px', md: '0' }}
                    border="1px"
                    borderColor={generalColorPrimary.value}
                  ></Box>
                  <Text
                    flexShrink="1"
                    fontFamily="nashvilleTitle"
                    fontSize="6xl"
                    lineHeight="1"
                  >
                    {getDay(getDate())}
                  </Text>
                  <Box
                    h={{ base: '0', md: '90px' }}
                    w={{ base: '50px', md: '0' }}
                    border="1px"
                    borderColor={generalColorPrimary.value}
                  ></Box>
                </Flex>
                <Flex justifyContent="center">
                  <Text
                    fontFamily="nashvilleTitle"
                    fontSize={{ base: '1.75rem', md: '2.5rem' }}
                    mt={{ base: '-10px', md: '0' }}
                  >
                    {getYear(getDate())}
                  </Text>
                </Flex>
              </Grid>
            </>
          )}

          {/* Detail Resepsi Time */}
          {detailResepsiTime && detailResepsiTime.is_active && (
            <Box mt="2">
              {JSON.parse(detailResepsiTime.value).length > 1 ? (
                JSON.parse(detailResepsiTime.value).map((res, i) => (
                  <Box key={i} fontWeight="bold" fontStyle="italic">
                    <Text as="span">Sesi {i + 1}:</Text> {res.time}
                  </Box>
                ))
              ) : (
                <Box>{JSON.parse(detailResepsiTime.value)[0].time}</Box>
              )}
            </Box>
          )}

          {/* Calendar Resepsi */}
          {fKalenderResepsi && fKalenderResepsi.is_active && (
            <Box mt="2">
              <FeatureKalender
                options={props.options}
                feature={props.feature}
                type="Resepsi"
              />
            </Box>
          )}

          <Box mt="4">
            {/* Detail Resepsi Location */}
            {detailResepsiLocation && detailResepsiLocation.is_active && (
              <Text fontWeight="bold" fontStyle="italic" fontSize="xl">
                {detailResepsiLocation.value}
              </Text>
            )}

            {/* Detail Resepsi Address */}
            {detailResepsiAddress && detailResepsiAddress.is_active && (
              <Text mt="2" fontStyle="italic">
                {detailResepsiAddress.value}
              </Text>
            )}

            {/* Map Resepsi */}
            {fMapResepsi && fMapResepsi.is_active && (
              <Box mt="2">
                <FeatureMap
                  options={props.options}
                  feature={props.feature}
                  type="Resepsi"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default FeatureDetailResepsi
