import _ from 'lodash'
import { Container, Box, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

import FeatureKalender from '@/components/theme/nashville/featureKalender'
import FeatureMap from '@/components/theme/nashville/featureMap'

function FeatureDetailUnduh({ ...props }) {
  // Get Data ==================================================================
  // Feature
  const {
    [`${props.options.code}-kalenderUnduh`]: fKalenderUnduh,
    [`${props.options.code}-mapUnduh`]: fMapUnduh,
  } = props.feature

  // Detail Unduh
  const codeDetailUnduh = `${props.options.code}-detailUnduh`
  const detailUnduh = props.feature[codeDetailUnduh].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeDetailUnduh}-title`]: detailUnduhTitle,
    [`${codeDetailUnduh}-date`]: detailUnduhDate,
    [`${codeDetailUnduh}-time`]: detailUnduhTime,
    [`${codeDetailUnduh}-location`]: detailUnduhLocation,
    [`${codeDetailUnduh}-address`]: detailUnduhAddress,
  } = detailUnduh

  // Function ==================================================================
  const getDate = () => {
    let date
    if (props.options.from === 'theme') {
      date = props.options.date
    } else {
      date = parseISO(detailUnduhDate.value)
    }

    return format(date, 'EEEE, d MMMM yyyy', { locale: id })
  }

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="12" px="6">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Detail Unduh Title */}
          {detailUnduhTitle && detailUnduhTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {detailUnduhTitle.value}
            </Text>
          )}

          {/* Detail Unduh Date */}
          {detailUnduhDate && detailUnduhDate.is_active && (
            <Text mt="4" fontWeight="bold" fontStyle="italic">
              {getDate()}
            </Text>
          )}

          {/* Detail Unduh Time */}
          {detailUnduhTime && detailUnduhTime.is_active && (
            <Text mt="2" fontWeight="bold" fontStyle="italic">
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

          <Box mt="4">
            {/* Detail Unduh Location */}
            {detailUnduhLocation && detailUnduhLocation.is_active && (
              <Text fontWeight="bold" fontStyle="italic" fontSize="xl">
                {detailUnduhLocation.value}
              </Text>
            )}

            {/* Detail Unduh Address */}
            {detailUnduhAddress && detailUnduhAddress.is_active && (
              <Text mt="2" fontStyle="italic">
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
  )
}

export default FeatureDetailUnduh
