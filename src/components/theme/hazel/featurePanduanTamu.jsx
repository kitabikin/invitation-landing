import _ from 'lodash';
import { Container, Box, Text, OrderedList, ListItem } from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

function FeaturePanduanTamu({ ...props }) {
  // Get Data ==================================================================
  // Panduan Tamu
  const codePanduanTamu = `${props.options.code}-panduanTamu`;
  const panduanTamu = reduceFeature(props.feature[codePanduanTamu].column);
  const {
    [`${codePanduanTamu}-title`]: panduanTamuTitle,
    [`${codePanduanTamu}-guide`]: panduanTamuGuide,
  } = panduanTamu;

  return (
    <>
      <Container h="full" maxW="4xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Panduan Tamu Title */}
          {panduanTamuTitle && panduanTamuTitle.is_active && (
            <Text fontFamily="hazelHeading" fontSize="3xl">
              {panduanTamuTitle.value}
            </Text>
          )}

          {/* Panduan Tamu Guide */}
          {panduanTamuGuide && panduanTamuGuide.is_active && (
            <OrderedList textAlign="center" listStylePos="inside" mt="6">
              {JSON.parse(panduanTamuGuide.value).map((data, i) => (
                <ListItem key={i} mb="2" fontSize="lg" fontStyle="italic">
                  {data.guide}
                </ListItem>
              ))}
            </OrderedList>
          )}
        </Box>
      </Container>
    </>
  );
}

export default FeaturePanduanTamu;
