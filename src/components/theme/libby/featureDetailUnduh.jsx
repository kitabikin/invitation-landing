import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Container, Box, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { reduceFeature } from '@/libs/utils';

import FeatureKalender from '@/components/theme/libby/featureKalender';
import FeatureMap from '@/components/theme/libby/featureMap';

function FeatureDetailUnduh({ ...props }) {
  const { from, date } = props.options;
  const [formatDate, setFormatDate] = useState();

  // Get Data ==================================================================
  // Feature
  const {
    [`${props.options.code}-kalenderUnduh`]: fKalenderUnduh,
    [`${props.options.code}-mapUnduh`]: fMapUnduh,
  } = props.feature;

  // Detail Unduh
  const codeDetailUnduh = `${props.options.code}-detailUnduh`;
  const detailUnduh = reduceFeature(props.feature[codeDetailUnduh].column);
  const {
    [`${codeDetailUnduh}-title`]: detailUnduhTitle,
    [`${codeDetailUnduh}-date`]: detailUnduhDate,
    [`${codeDetailUnduh}-time`]: detailUnduhTime,
    [`${codeDetailUnduh}-location`]: detailUnduhLocation,
    [`${codeDetailUnduh}-address`]: detailUnduhAddress,
  } = detailUnduh;

  const dateWedding = from === 'theme' ? date : parseISO(detailUnduhDate.value);

  // Function ==================================================================
  useEffect(() => {
    setFormatDate(format(dateWedding, 'EEEE, d MMMM yyyy', { locale: id }));
  }, [dateWedding]);

  return (
    <>
      <Container h={'full'} maxW={'4xl'} centerContent py={12} px={6}>
        <Box position={'relative'} h={'full'} w={'full'} textAlign={'center'}>
          {/* Detail Unduh Title */}
          {detailUnduhTitle && detailUnduhTitle.is_active && (
            <Text fontFamily={'var(--libby-font-title)'} fontSize={'3xl'}>
              {detailUnduhTitle.value}
            </Text>
          )}

          {/* Detail Unduh Date */}
          {detailUnduhDate && detailUnduhDate.is_active && (
            <Text mt={4} fontWeight={'bold'} fontStyle={'italic'}>
              {formatDate}
            </Text>
          )}

          {/* Detail Unduh Time */}
          {detailUnduhTime && detailUnduhTime.is_active && (
            <Text mt="2" fontWeight={'bold'} fontStyle={'italic'}>
              {detailUnduhTime.value}
            </Text>
          )}

          {/* Calendar Unduh */}
          {fKalenderUnduh && fKalenderUnduh.is_active && (
            <Box mt="2">
              <FeatureKalender
                options={props.options}
                feature={props.feature}
                type="Unduh"
              />
            </Box>
          )}

          <Box mt={4}>
            {/* Detail Unduh Location */}
            {detailUnduhLocation && detailUnduhLocation.is_active && (
              <Text fontWeight={'bold'} fontStyle={'italic'} fontSize={'xl'}>
                {detailUnduhLocation.value}
              </Text>
            )}

            {/* Detail Unduh Address */}
            {detailUnduhAddress && detailUnduhAddress.is_active && (
              <Text mt="2" fontStyle={'italic'}>
                {detailUnduhAddress.value}
              </Text>
            )}

            {/* Map Unduh */}
            {fMapUnduh && fMapUnduh.is_active && (
              <Box mt="2">
                <FeatureMap
                  options={props.options}
                  feature={props.feature}
                  type="Unduh"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default FeatureDetailUnduh;
