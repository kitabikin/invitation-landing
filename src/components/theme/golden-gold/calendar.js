import _ from 'lodash'
import { Button } from '@chakra-ui/react'

function Calendar({ options, feature, type }) {
  const code = 'golden-gold'

  // Calendar
  const codeCalendar = `${code}_calendar-${type}`
  const calendar = feature[codeCalendar].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeCalendar}_button-label`]: cButtonLabel,
    [`${codeCalendar}_link`]: cLink,
  } = calendar

  return (
    <>
      <Button
        bg="yellow.600"
        color="white"
        size="sm"
        borderRadius="20px"
        _hover={{ bg: 'yellow.700' }}
        as="a"
        target="_blank"
        href={cLink.value}
      >
        {cButtonLabel.value}
      </Button>
    </>
  )
}

export default Calendar
