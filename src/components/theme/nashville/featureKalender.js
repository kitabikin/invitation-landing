import _ from 'lodash'
import { Button } from '@chakra-ui/react'

function FeatureKalender({ ...props }) {
  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGeneral}-colorPrimary`]: generalColorPrimary,
    [`${codeGeneral}-colorSecondary`]: generalColorSecondary,
  } = general

  // Kalender
  const codeKalender = `${props.options.code}-kalender${props.type}`
  const calendar = props.feature[codeKalender].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeKalender}-buttonLabel`]: kalenderButtonLabel,
    [`${codeKalender}-link`]: kalenderLink,
  } = calendar

  return (
    <>
      <Button
        bg={generalColorPrimary.value}
        color="white"
        size="sm"
        borderRadius="20px"
        _hover={{ bg: generalColorSecondary.value }}
        as="a"
        target="_blank"
        href={kalenderLink.value}
        fontWeight="normal"
        px="6"
      >
        {kalenderButtonLabel.value}
      </Button>
    </>
  )
}

export default FeatureKalender
