import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Container, Box, Flex, Text, Grid } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { reduceFeature } from '@/libs/utils';

import FeatureKalender from '@/components/theme/hazel/featureKalender';
import FeatureMap from '@/components/theme/hazel/featureMap';

function FeatureDetailResepsi({ ...props }) {
  const { from, date } = props.options;
  const [formatDay, setFormatDay] = useState();
  const [formatMonth, setFormatMonth] = useState();
  const [formatYear, setFormatYear] = useState();

  // Get Data ==================================================================
  // Feature
  const {
    [`${props.options.code}-kalenderResepsi`]: fKalenderResepsi,
    [`${props.options.code}-mapResepsi`]: fMapResepsi,
  } = props.feature;

  // Detail Resepsi
  const codeDetailResepsi = `${props.options.code}-detailResepsi`;
  const detailResepsi = reduceFeature(props.feature[codeDetailResepsi].column);
  const {
    [`${codeDetailResepsi}-title`]: detailResepsiTitle,
    [`${codeDetailResepsi}-saveTheDate1`]: detailResepsiSaveTheDate1,
    [`${codeDetailResepsi}-saveTheDate2`]: detailResepsiSaveTheDate2,
    [`${codeDetailResepsi}-date`]: detailResepsiDate,
    [`${codeDetailResepsi}-time`]: detailResepsiTime,
    [`${codeDetailResepsi}-location`]: detailResepsiLocation,
    [`${codeDetailResepsi}-address`]: detailResepsiAddress,
  } = detailResepsi;

  const dateWedding =
    from === 'theme' ? date : parseISO(detailResepsiDate.value);

  // Function ==================================================================
  useEffect(() => {
    setFormatDay(format(dateWedding, 'd', { locale: id }));
    setFormatMonth(format(dateWedding, 'MMMM', { locale: id }));
    setFormatYear(format(dateWedding, 'yyyy', { locale: id }));
  }, [dateWedding]);

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="12" px="6">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Detail Resepsi Title */}
          {detailResepsiTitle && detailResepsiTitle.is_active && (
            <Text fontFamily="hazelHeading" fontSize="3xl">
              {detailResepsiTitle.value}
            </Text>
          )}

          {/* Detail Resepsi Save The Date */}
          <Box
            mt="6"
            ml="20px"
            transform="rotate(-10deg)"
            fontFamily="hazelHandwriting"
            fontSize={{ base: '8xl', md: '9xl' }}
            color={'var(--hazel-color-primary)'}
          >
            {detailResepsiSaveTheDate1 &&
              detailResepsiSaveTheDate1.is_active && (
                <Text>{detailResepsiSaveTheDate1.value}</Text>
              )}
            {detailResepsiSaveTheDate2 && detailResepsiSaveTheDate2.is_active && (
              <Text mt={{ base: '-70px', md: '-90px' }} ml="20px">
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
                    fontFamily="hazelTitle"
                    textTransform="uppercase"
                    fontSize={{ base: 'xl', md: '3xl' }}
                    mb={{ base: 2, md: 0 }}
                  >
                    {formatMonth}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Box
                    h={{ base: '0', md: '90px' }}
                    w={{ base: '90px', md: '0' }}
                    border="1px"
                    borderColor={'var(--hazel-color-primary)'}
                  ></Box>
                  <Text
                    flexShrink="1"
                    fontFamily="hazelTitle"
                    fontSize="6xl"
                    lineHeight="1"
                  >
                    {formatDay}
                  </Text>
                  <Box
                    h={{ base: '0', md: '90px' }}
                    w={{ base: '90px', md: '0' }}
                    border="1px"
                    borderColor={'var(--hazel-color-primary)'}
                  ></Box>
                </Flex>
                <Flex justifyContent="center">
                  <Text
                    fontFamily="hazelTitle"
                    fontSize={{ base: '1.75rem', md: '2.5rem' }}
                  >
                    {formatYear}
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
                <Box fontWeight="bold" fontStyle="italic">
                  {JSON.parse(detailResepsiTime.value)[0].time}
                </Box>
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
  );
}

export default FeatureDetailResepsi;
