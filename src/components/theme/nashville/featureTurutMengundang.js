import _ from 'lodash'
import { Container, Box, Text, UnorderedList, ListItem } from '@chakra-ui/react'

function FeatureTurutMengundang({ ...props }) {
  // Get Data ==================================================================
  // Turut Mengundang
  const codeTurutMengundang = `${props.options.code}-turutMengundang`
  const turutMengundang = props.feature[codeTurutMengundang].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeTurutMengundang}-title`]: turutMengundangTitle,
    [`${codeTurutMengundang}-specialGuest`]: turutMengundangSpecialGuest,
  } = turutMengundang

  return (
    <>
      <Container h="full" maxW="4xl" centerContent py="14" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Turut Mengundang Title */}
          {turutMengundangTitle && turutMengundangTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {turutMengundangTitle.value}
            </Text>
          )}

          {/* Turut Mengundang Special Guest */}
          {turutMengundangSpecialGuest &&
            turutMengundangSpecialGuest.is_active && (
              <UnorderedList textAlign="center" listStyleType="none" mt="6">
                {JSON.parse(turutMengundangSpecialGuest.value).map(
                  (data, i) => (
                    <ListItem key={i} mb="2" fontSize="lg" fontStyle="italic">
                      {data.guest}
                    </ListItem>
                  )
                )}
              </UnorderedList>
            )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureTurutMengundang
