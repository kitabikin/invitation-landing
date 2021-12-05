import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

import FeatureKalender from '@/components/theme/nashville/featureKalender'
import FeatureMap from '@/components/theme/nashville/featureMap'

function FeatureDetailAkad({ ...props }) {
  // Get Data ==================================================================
  // Feature
  const {
    [`${props.options.code}-kalenderAkad`]: fKalenderAkad,
    [`${props.options.code}-mapAkad`]: fMapAkad,
  } = props.feature

  // Detail Akad
  const codeDetailAkad = `${props.options.code}-detailAkad`
  const detailAkad = props.feature[codeDetailAkad].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeDetailAkad}-title`]: detailAkadTitle,
    [`${codeDetailAkad}-date`]: detailAkadDate,
    [`${codeDetailAkad}-time`]: detailAkadTime,
    [`${codeDetailAkad}-location`]: detailAkadLocation,
    [`${codeDetailAkad}-address`]: detailAkadAddress,
  } = detailAkad

  // Function ==================================================================
  const getDate = () => {
    let date
    if (props.options.from === 'theme') {
      date = props.options.date
    } else {
      date = parseISO(detailAkadDate.value)
    }

    return format(date, 'EEEE, d MMMM yyyy', { locale: id })
  }

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="12" px="6">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Detail Akad Title */}
          {detailAkadTitle && detailAkadTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {detailAkadTitle.value}
            </Text>
          )}

          {/* Detail Akad Date */}
          {detailAkadDate && detailAkadDate.is_active && (
            <Text mt="4" fontWeight="bold" fontStyle="italic">
              {getDate()}
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
  )
}

export default FeatureDetailAkad
