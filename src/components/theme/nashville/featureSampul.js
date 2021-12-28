import { useState, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import _ from 'lodash'
import { Container, Box, Flex, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

function FeatureSampul({ ...props }) {
  const { from, date } = props.options
  const [formatDay, setFormatDay] = useState()
  const [formatMonth, setFormatMonth] = useState()
  const [formatYear, setFormatYear] = useState()

  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeGeneral}-colorPrimary`]: generalColorPrimary,
    [`${codeGeneral}-orderGroomBride`]: generalOrderGroomBride,
  } = general

  // Sampul
  const codeSampul = `${props.options.code}-sampul`
  const sampul = props.feature[codeSampul].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeSampul}-bgImage`]: sampulBgImage,
    [`${codeSampul}-bgGradient`]: sampulBgGradient,
    [`${codeSampul}-title`]: sampulTitle,
    [`${codeSampul}-nicknameGroom`]: sampulNicknameGroom,
    [`${codeSampul}-and`]: sampulAnd,
    [`${codeSampul}-nicknameBridge`]: sampulNicknameBride,
    [`${codeSampul}-subTitle`]: sampulSubTitle,
    [`${codeSampul}-date`]: sampulDate,
  } = sampul

  const dateWedding = from === 'theme' ? date : parseISO(sampulDate.value)

  // Function ==================================================================
  useEffect(() => {
    setFormatDay(format(dateWedding, 'd', { locale: id }))
    setFormatMonth(format(dateWedding, 'MMMM', { locale: id }))
    setFormatYear(format(dateWedding, 'yyyy', { locale: id }))
  }, [dateWedding])

  return (
    <>
      <NextSeo
        openGraph={{
          images: [{ url: sampulBgImage.value }],
        }}
      />
      <Box
        bgImage={`url('${sampulBgImage.value}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        h={{ base: '100vh', md: '75vh' }}
        maxH="100vh"
      >
        <Container h="full" maxW="md" centerContent zIndex="350">
          <Box
            h={{ base: '100vh', md: '75vh' }}
            w="full"
            position="absolute"
            bgGradient={`linear-gradient(to-b, ${sampulBgGradient.value} 20%, transparent 100%)`}
          ></Box>

          <Box
            position="relative"
            px="4"
            py="16"
            h="full"
            w="full"
            textAlign="center"
          >
            {/* Sampul Title */}
            {sampulTitle && sampulTitle.is_active && (
              <Text fontWeight="bold" fontStyle="italic">
                {sampulTitle.value}
              </Text>
            )}

            {/* Sampul Nickname Groom & Bride */}
            <Flex py="6" justifyContent="center">
              <Text
                fontFamily="nashvilleTitle"
                fontSize="3xl"
                textTransform="uppercase"
                color={generalColorPrimary.value}
              >
                {generalOrderGroomBride.value === 'bride'
                  ? sampulNicknameBride.value
                  : sampulNicknameGroom.value}
              </Text>
              <Text
                fontFamily="nashvilleHandwriting1"
                fontSize="3xl"
                textTransform="uppercase"
                mx="4"
              >
                {sampulAnd.value}
              </Text>
              <Text
                fontFamily="nashvilleTitle"
                fontSize="3xl"
                textTransform="uppercase"
                color={generalColorPrimary.value}
              >
                {generalOrderGroomBride.value === 'bride'
                  ? sampulNicknameGroom.value
                  : sampulNicknameBride.value}
              </Text>
            </Flex>

            {/* Sampul Sub Title */}
            {sampulSubTitle && sampulSubTitle.is_active && (
              <Text fontWeight="bold" fontStyle="italic">
                {sampulSubTitle.value}
              </Text>
            )}

            {/* Sampul Date */}
            {sampulDate && sampulDate.is_active && (
              <Box mt="6" fontFamily="nashvilleTitle" fontWeight="bold">
                <Text fontSize="xl">{formatMonth}</Text>
                <Flex alignItems="center" justifyContent="center">
                  <Box
                    w="35px"
                    border="1px"
                    borderColor={generalColorPrimary.value}
                  ></Box>
                  <Text mx="6" fontSize="5xl" lineHeight="1.2">
                    {formatDay}
                  </Text>
                  <Box
                    w="35px"
                    border="1px"
                    borderColor={generalColorPrimary.value}
                  ></Box>
                </Flex>
                <Text fontSize="xl" mt="-5px">
                  {formatYear}
                </Text>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default FeatureSampul
