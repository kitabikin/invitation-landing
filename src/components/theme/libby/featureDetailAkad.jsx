import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Container, Box, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { reduceFeature } from '@/libs/utils';

import FeatureKalender from '@/components/theme/libby/featureKalender';
import FeatureMap from '@/components/theme/libby/featureMap';

function FeatureDetailAkad({ ...props }) {
  const { from, date } = props.options;
  const [formatDate, setFormatDate] = useState();

  // Get Data ==================================================================
  // Feature
  const {
    [`${props.options.code}-kalenderAkad`]: fKalenderAkad,
    [`${props.options.code}-mapAkad`]: fMapAkad,
  } = props.feature;

  // Detail Akad
  const codeDetailAkad = `${props.options.code}-detailAkad`;
  const detailAkad = reduceFeature(props.feature[codeDetailAkad].column);
  const {
    [`${codeDetailAkad}-title`]: detailAkadTitle,
    [`${codeDetailAkad}-date`]: detailAkadDate,
    [`${codeDetailAkad}-time`]: detailAkadTime,
    [`${codeDetailAkad}-location`]: detailAkadLocation,
    [`${codeDetailAkad}-address`]: detailAkadAddress,
  } = detailAkad;

  const dateWedding = from === 'theme' ? date : parseISO(detailAkadDate.value);

  // Function ==================================================================
  useEffect(() => {
    setFormatDate(format(dateWedding, 'EEEE, d MMMM yyyy', { locale: id }));
  }, [dateWedding]);

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="12" px="6">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Detail Akad Title */}
          {detailAkadTitle && detailAkadTitle.is_active && (
            <Text fontFamily="var(--libby-font-title)" fontSize="3xl">
              {detailAkadTitle.value}
            </Text>
          )}

          {/* Detail Akad Date */}
          {detailAkadDate && detailAkadDate.is_active && (
            <Text mt="4" fontWeight="bold" fontStyle="italic">
              {formatDate}
            </Text>
          )}

          {/* Detail Akad Time */}
          {detailAkadTime && detailAkadTime.is_active && (
            <Text mt="2" fontWeight="bold" fontStyle="italic">
              {detailAkadTime.value}
            </Text>
          )}

          {/* Calendar Akad */}
          {fKalenderAkad && fKalenderAkad.is_active && (
            <Box mt="2">
              <FeatureKalender
                options={props.options}
                feature={props.feature}
                type="Akad"
              />
            </Box>
          )}

          <Box mt="4">
            {/* Detail Akad Location */}
            {detailAkadLocation && detailAkadLocation.is_active && (
              <Text fontWeight="bold" fontStyle="italic" fontSize="xl">
                {detailAkadLocation.value}
              </Text>
            )}

            {/* Detail Akad Address */}
            {detailAkadAddress && detailAkadAddress.is_active && (
              <Text mt="2" fontStyle="italic">
                {detailAkadAddress.value}
              </Text>
            )}

            {/* Map Akad */}
            {fMapAkad && fMapAkad.is_active && (
              <Box mt="2">
                <FeatureMap
                  options={props.options}
                  feature={props.feature}
                  type="Akad"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default FeatureDetailAkad;
