import _ from 'lodash';
import {
  Container,
  Box,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

function FeatureTurutMengundang({ ...props }) {
  // Get Data ==================================================================
  // Turut Mengundang
  const codeTurutMengundang = `${props.options.code}-turutMengundang`;
  const turutMengundang = reduceFeature(
    props.feature[codeTurutMengundang].column,
  );
  const {
    [`${codeTurutMengundang}-title`]: turutMengundangTitle,
    [`${codeTurutMengundang}-specialGuest`]: turutMengundangSpecialGuest,
  } = turutMengundang;

  return (
    <>
      <Container h="full" maxW="4xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Turut Mengundang Title */}
          {turutMengundangTitle && turutMengundangTitle.is_active && (
            <Text fontFamily="var(--libby-font-title)" fontSize="3xl">
              {turutMengundangTitle.value}
            </Text>
          )}

          {/* Turut Mengundang Special Guest */}
          {turutMengundangSpecialGuest &&
            turutMengundangSpecialGuest.is_active && (
              <UnorderedList textAlign="center" listStyleType="none" mt="6">
                {JSON.parse(turutMengundangSpecialGuest.value).map(
                  (data, i) => (
                    <ListItem key={i} mb="2" fontSize="xl" fontStyle="italic">
                      {data.guest}
                    </ListItem>
                  ),
                )}
              </UnorderedList>
            )}
        </Box>
      </Container>
    </>
  );
}

export default FeatureTurutMengundang;
