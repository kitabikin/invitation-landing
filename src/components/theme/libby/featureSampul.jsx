import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Container, Box, Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { reduceFeature } from '@/libs/utils';

const Nickname = ({ nickname, mx = 0 }) => {
  return (
    <>
      <Text
        fontFamily={'libbyTitle'}
        fontSize={'5xl'}
        color={'var(--libby-color-body)'}
        mx={mx}
      >
        {nickname}
      </Text>
    </>
  );
};

const NicknameHorizontal = ({ order, groom, and, bride }) => {
  return (
    <>
      <Nickname nickname={order === 'bride' ? bride : groom} />
      <Box mx={4}>
        <Nickname nickname={and} />
      </Box>
      <Nickname nickname={order === 'bride' ? groom : bride} />
    </>
  );
};

const NicknameVertical = ({ order, groom, and, bride }) => {
  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={4}>
          <Nickname nickname={order === 'bride' ? bride : groom} />
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(5, 1fr)" mt={'-50px'}>
        <GridItem colStart={3} colEnd={4}>
          <Nickname nickname={and} />
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(5, 1fr)" mt={'-50px'}>
        <GridItem colStart={2} colEnd={6}>
          <Nickname nickname={order === 'bride' ? groom : bride} />
        </GridItem>
      </Grid>
    </>
  );
};

function FeatureSampul({ ...props }) {
  const { from, date } = props.options;
  const [formatDay, setFormatDay] = useState();
  const [formatMonth, setFormatMonth] = useState();
  const [formatYear, setFormatYear] = useState();

  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`;
  const general = reduceFeature(props.feature[codeGeneral].column);
  const { [`${codeGeneral}-orderGroomBride`]: generalOrderGroomBride } =
    general;

  // Sampul
  const codeSampul = `${props.options.code}-sampul`;
  const sampul = reduceFeature(props.feature[codeSampul].column);
  const {
    [`${codeSampul}-bgImage`]: sampulBgImage,
    [`${codeSampul}-bgGradient`]: sampulBgGradient,
    [`${codeSampul}-bgGradientPercentage`]: sampulBgGradientPercentage,
    [`${codeSampul}-title`]: sampulTitle,
    [`${codeSampul}-nicknameLine`]: sampulNicknameLine,
    [`${codeSampul}-nicknameGroom`]: sampulNicknameGroom,
    [`${codeSampul}-and`]: sampulAnd,
    [`${codeSampul}-nicknameBridge`]: sampulNicknameBride,
    [`${codeSampul}-subTitle`]: sampulSubTitle,
    [`${codeSampul}-dateLine`]: sampulDateLine,
    [`${codeSampul}-date`]: sampulDate,
  } = sampul;

  const dateWedding = from === 'theme' ? date : parseISO(sampulDate.value);

  // Section
  const bgImageAnimation = (sampulBgImage) => {
    const sec = JSON.parse(sampulBgImage.value).length * 10 + 's';

    return `libby-slideshow ${sec} infinite, zoom-in ${sec} infinite`;
  };

  // Function ==================================================================
  useEffect(() => {
    setFormatDay(format(dateWedding, 'd', { locale: id }));
    setFormatMonth(format(dateWedding, 'MMMM', { locale: id }));
    setFormatYear(format(dateWedding, 'yyyy', { locale: id }));
  }, [dateWedding]);

  return (
    <>
      {sampulBgImage && sampulBgImage.is_active && (
        <Box className="libby-slideshow">
          {JSON.parse(sampulBgImage.value).map((res, index, row) => (
            <img
              key={index}
              src={res.image}
              alt={index}
              width={1080}
              height={1620}
              style={{
                animation: bgImageAnimation(sampulBgImage),
                animationDelay: `${
                  (JSON.parse(sampulBgImage.value).length - 1 - index) * 10
                }s`,
              }}
            />
          ))}
        </Box>
      )}

      <Box position={'relative'} h={'100vh'} maxH={'100vh'}>
        <Container h={'full'} maxW={'md'} centerContent zIndex={350}>
          <Box
            h={{ base: '100vh', md: '75vh' }}
            w={'full'}
            position={'absolute'}
            bgGradient={`linear-gradient(to-b, ${sampulBgGradient.value} ${sampulBgGradientPercentage.value}%, transparent 100%)`}
          />

          <Box
            position={'relative'}
            px={4}
            py={16}
            h={'full'}
            w={'full'}
            textAlign={'center'}
          >
            {/* Sampul Title */}
            {sampulTitle && sampulTitle.is_active && (
              <Text fontWeight={'bold'} fontStyle={'italic'}>
                {sampulTitle.value}
              </Text>
            )}

            {/* Sampul Nickname Groom & Bride */}
            <Box
              display={{ base: 'none', md: 'flex' }}
              mt={2}
              justifyContent={'center'}
            >
              <NicknameHorizontal
                order={generalOrderGroomBride.value}
                groom={sampulNicknameGroom.value}
                and={sampulAnd.value}
                bride={sampulNicknameBride.value}
              />
            </Box>

            <Box
              display={{
                base:
                  sampulNicknameLine.value === 'horizontal' ? 'flex' : 'block',
                md: 'none',
              }}
              mt={2}
              justifyContent={'center'}
            >
              {sampulNicknameLine.value === 'horizontal' ? (
                <NicknameHorizontal
                  order={generalOrderGroomBride.value}
                  groom={sampulNicknameGroom.value}
                  and={sampulAnd.value}
                  bride={sampulNicknameBride.value}
                />
              ) : (
                <NicknameVertical
                  order={generalOrderGroomBride.value}
                  groom={sampulNicknameGroom.value}
                  and={sampulAnd.value}
                  bride={sampulNicknameBride.value}
                />
              )}
            </Box>

            {/* Sampul Sub Title */}
            {sampulSubTitle && sampulSubTitle.is_active && (
              <Text fontWeight={'bold'} fontStyle={'italic'}>
                {sampulSubTitle.value}
              </Text>
            )}

            {/* Sampul Date */}
            {sampulDate &&
            sampulDate.is_active &&
            sampulDateLine.value === 'horizontal' ? (
              <Flex
                mt={6}
                fontFamily={'libbyTitle'}
                fontWeight={'bold'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Text fontSize={'2xl'} w={'70px'} align={'right'}>
                  {formatMonth}
                </Text>
                <Flex
                  alignItems={'center'}
                  justifyContent={'center'}
                  flexDir={'column'}
                >
                  <Box
                    w={'70px'}
                    border={'1px'}
                    borderColor={'var(--libby-color-primary)'}
                  ></Box>
                  <Text mt={1} mx={8} fontSize={'5xl'}>
                    {formatDay}
                  </Text>
                  <Box
                    w={'70px'}
                    border={'1px'}
                    borderColor={'var(--libby-color-primary)'}
                  ></Box>
                </Flex>
                <Text fontSize={'2xl'} w={'70px'} align={'left'}>
                  {formatYear}
                </Text>
              </Flex>
            ) : (
              <Box mt={6} fontFamily={'libbyTitle'} fontWeight={'bold'}>
                <Text fontSize={'2xl'}>{formatMonth}</Text>
                <Flex alignItems="center" justifyContent="center">
                  <Box
                    w={'70px'}
                    border={'1px'}
                    borderColor={'var(--libby-color-primary)'}
                  ></Box>
                  <Text mx={6} fontSize={'5xl'} lineHeight={'1.5'}>
                    {formatDay}
                  </Text>
                  <Box
                    w={'70px'}
                    border={'1px'}
                    borderColor={'var(--libby-color-primary)'}
                  ></Box>
                </Flex>
                <Text fontSize={'2xl'} mt={'-5px'}>
                  {formatYear}
                </Text>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default FeatureSampul;
