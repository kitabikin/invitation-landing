import Image from 'next/legacy/image';
import _ from 'lodash';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { reduceFeature } from '@/libs/utils';

const BrideGroom = (data) => {
  return (
    <>
      <Box position="relative" mx={'-1.5rem'}>
        <Image src={data.image} width={1080} height={915} alt={data.fullName} />
      </Box>

      <Text
        mt={5}
        fontFamily={'var(--libby-font-title)'}
        fontSize={'4xl'}
        lineHeight={1}
      >
        {data.fullName}
      </Text>

      <Text mt={5} fontStyle={'italic'}>
        <Text as="span">{data.son} </Text>
        <Text as="span">{data.sonTo} </Text>
        <Text as="span">{data.fromCouple}</Text>
      </Text>

      <Flex
        as={Text}
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent={'center'}
        gridGap={{ base: 0, md: 2 }}
        mt={1}
        fontWeight={'bold'}
        fontStyle={'italic'}
      >
        <Text as="span">{data.fatherName} </Text>
        <Text as="span">{data.coupleAnd} </Text>
        <Text as="span">{data.motherName}</Text>
      </Flex>
    </>
  );
};

function FeaturePembukaan({ ...props }) {
  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`;
  const general = reduceFeature(props.feature[codeGeneral].column);
  const { [`${codeGeneral}-orderGroomBride`]: generalOrderGroomBride } =
    general;

  // Pembukaan
  const codePembukaan = `${props.options.code}-pembukaan`;
  const pembukaan = reduceFeature(props.feature[codePembukaan].column);
  const {
    [`${codePembukaan}-saying`]: pembukaanSaying,
    [`${codePembukaan}-greeting`]: pembukaanGreeting,
    [`${codePembukaan}-sentence`]: pembukaanSentence,
    [`${codePembukaan}-groomImage`]: pembukaanGroomImage,
    [`${codePembukaan}-groomFullname`]: pembukaanGroomFullname,
    [`${codePembukaan}-groomSon`]: pembukaanGroomSon,
    [`${codePembukaan}-groomSonTo`]: pembukaanGroomSonTo,
    [`${codePembukaan}-groomFromCouple`]: pembukaanGroomFromCouple,
    [`${codePembukaan}-groomFatherName`]: pembukaanGroomFatherName,
    [`${codePembukaan}-groomCoupleAnd`]: pembukaanGroomCoupleAnd,
    [`${codePembukaan}-groomMotherName`]: pembukaanGroomMotherName,
    [`${codePembukaan}-coupleAnd`]: pembukaanCoupleAnd,
    [`${codePembukaan}-brideImage`]: pembukaanBrideImage,
    [`${codePembukaan}-brideFullname`]: pembukaanBrideFullname,
    [`${codePembukaan}-brideSon`]: pembukaanBrideSon,
    [`${codePembukaan}-brideSonTo`]: pembukaanBrideSonTo,
    [`${codePembukaan}-brideFromCouple`]: pembukaanBrideFromCouple,
    [`${codePembukaan}-brideFatherName`]: pembukaanBrideFatherName,
    [`${codePembukaan}-brideCoupleAnd`]: pembukaanBrideCoupleAnd,
    [`${codePembukaan}-brideMotherName`]: pembukaanBrideMotherName,
  } = pembukaan;

  return (
    <>
      <Container h={'full'} maxW={'4xl'} centerContent px={6}>
        <Box position={'relative'} h={'full'} w={'full'} textAlign={'center'}>
          {/* Pembukaan Saying */}
          {pembukaanSaying && pembukaanSaying.is_active && (
            <Image
              src={pembukaanSaying.value}
              alt={pembukaanSaying.label}
              width={250}
              height={88}
            />
          )}

          {/* Pembukaan Saying */}
          {pembukaanGreeting && pembukaanGreeting.is_active && (
            <Text
              mt={8}
              fontFamily={'var(--libby-font-title)'}
              fontSize={{ base: '2xl', md: '3xl' }}
            >
              {pembukaanGreeting.value}
            </Text>
          )}

          {/* Pembukaan Saying */}
          {pembukaanSentence && pembukaanSentence.is_active && (
            <Text mt={6} fontStyle={'italic'}>
              {pembukaanSentence.value}
            </Text>
          )}

          {/* Bride */}
          <Box mt="16">
            <BrideGroom
              image={
                generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideImage.value
                  : pembukaanGroomImage.value
              }
              fullName={
                generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideFullname.value
                  : pembukaanGroomFullname.value
              }
              son={
                generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideSon.value
                  : pembukaanGroomSon.value
              }
              sonTo={
                generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideSonTo.value
                  : pembukaanGroomSonTo.value
              }
              fromCouple={
                generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideFromCouple.value
                  : pembukaanGroomFromCouple.value
              }
              fatherName={
                generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideFatherName.value
                  : pembukaanGroomFatherName.value
              }
              coupleAnd={
                generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideCoupleAnd.value
                  : pembukaanGroomCoupleAnd.value
              }
              motherName={
                generalOrderGroomBride.value === 'bride'
                  ? pembukaanBrideMotherName.value
                  : pembukaanGroomMotherName.value
              }
            />
          </Box>

          {pembukaanCoupleAnd && pembukaanCoupleAnd.is_active && (
            <Text
              mt={16}
              fontFamily={'var(--libby-font-title)'}
              fontSize={'2xl'}
              fontWeight={'bold'}
            >
              {pembukaanCoupleAnd.value}
            </Text>
          )}

          {/* Groom */}
          <Box mt="16">
            <BrideGroom
              image={
                generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideImage.value
                  : pembukaanGroomImage.value
              }
              fullName={
                generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideFullname.value
                  : pembukaanGroomFullname.value
              }
              son={
                generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideSon.value
                  : pembukaanGroomSon.value
              }
              sonTo={
                generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideSonTo.value
                  : pembukaanGroomSonTo.value
              }
              fromCouple={
                generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideFromCouple.value
                  : pembukaanGroomFromCouple.value
              }
              fatherName={
                generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideFatherName.value
                  : pembukaanGroomFatherName.value
              }
              coupleAnd={
                generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideCoupleAnd.value
                  : pembukaanGroomCoupleAnd.value
              }
              motherName={
                generalOrderGroomBride.value !== 'bride'
                  ? pembukaanBrideMotherName.value
                  : pembukaanGroomMotherName.value
              }
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default FeaturePembukaan;
