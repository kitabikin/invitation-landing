import _ from 'lodash'
import { Container, Box, OrderedList, ListItem } from '@chakra-ui/react'

function GuestGuide({ options, feature }) {
  const code = 'golden-gold'

  // General
  const codeGeneral = `${code}_general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}_background`]: gBg } = general

  // Guest Guide
  const codeGuestGuide = `${code}_guest-guide`
  const guestGuide = feature[codeGuestGuide].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGuestGuide}_title`]: ggTitle,
    [`${codeGuestGuide}_guide`]: ggGuide,
  } = guestGuide

  return (
    <>
      <Box position="relative">
        <Box
          bgImage={`url('${gBg.value}')`}
          bgPosition="center center"
          bgRepeat="repeat"
          bgSize="300px 300px"
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
              {/* Guest Guide Title */}
              {ggTitle && ggTitle.is_active && (
                <Box fontWeight="bold" fontSize="2xl">
                  {ggTitle.value}
                </Box>
              )}

              {/* Guest Guide Data */}
              {ggGuide && ggGuide.is_active && (
                <OrderedList textAlign="center" listStylePos="inside" mt="2">
                  {JSON.parse(ggGuide.value).map((data, i) => (
                    <ListItem key={i}>{data.guide}</ListItem>
                  ))}
                </OrderedList>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default GuestGuide
