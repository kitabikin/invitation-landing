import _ from 'lodash'
import { Box } from '@chakra-ui/react'

import To from '@/components/theme/golden-gold/to'
import Cover from '@/components/theme/golden-gold/cover'
import Opening from '@/components/theme/golden-gold/opening'
import EventDetail from '@/components/theme/golden-gold/eventDetail'
import HealthProtocol from '@/components/theme/golden-gold/healthProtocol'

function Container({ options, data }) {
  const code = 'golden-gold'
  const feature = data.feature.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${code}_to`]: fTo,
    [`${code}_cover`]: fCover,
    [`${code}_opening`]: fOpening,
    [`${code}_event-detail`]: fEventDetail,
    [`${code}_health-protocol`]: fHealthProtocol,
  } = feature

  return (
    <>
      {/* To */}
      {/* {fTo && fTo.is_active && (
        <To options={options} feature={feature} />
      )} */}

      {/* Cover */}
      {fCover && fCover.is_active && (
        <Cover options={options} feature={feature} />
      )}

      {/* Opening */}
      {fOpening && fOpening.is_active && (
        <Opening options={options} feature={feature} />
      )}

      {/* Event Detail */}
      {fEventDetail && fEventDetail.is_active && (
        <EventDetail options={options} feature={feature} />
      )}

      {/* Health Protocol */}
      {fHealthProtocol && fHealthProtocol.is_active && (
        <HealthProtocol options={options} feature={feature} />
      )}

      <Box bg="red">Countdown Timer</Box>
    </>
  )
}

export default Container
