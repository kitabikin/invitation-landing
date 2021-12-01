import _ from 'lodash'
import { Container, Box, UnorderedList, ListItem } from '@chakra-ui/react'

function SpecialGuest({ options, feature }) {
  const code = 'golden-gold'

  // General
  const codeGeneral = `${code}_general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}_background`]: gBg } = general

  // Special Guest
  const codeSpecialGuest = `${code}_special-guest`
  const specialGuest = feature[codeSpecialGuest].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeSpecialGuest}_title`]: sgTitle,
    [`${codeSpecialGuest}_guest`]: sgGuest,
  } = specialGuest

  return (
    <>
      <Box position="relative">
        <Box
          bgImage={`url('${gBg.value}')`}
          bgPosition="center center"
          bgRepeat="repeat"
          bgSize="300px 300px"
          pt="24"
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
              {/* Special Guest Title */}
              {sgTitle && sgTitle.is_active && (
                <Box fontWeight="bold" fontSize="2xl">
                  {sgTitle.value}
                </Box>
              )}

              {/* Special Guest Data */}
              {sgGuest && sgGuest.is_active && (
                <UnorderedList textAlign="center" listStyleType="none" mt="2">
                  {JSON.parse(sgGuest.value).map((data, i) => (
                    <ListItem key={i}>{data.guest}</ListItem>
                  ))}
                </UnorderedList>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default SpecialGuest
