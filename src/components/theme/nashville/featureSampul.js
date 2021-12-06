import _ from 'lodash'
import { Container, Box, Flex, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

function FeatureSampul({ ...props }) {
  // Get Data ==================================================================
  // General
  const codeGeneral = `${props.options.code}-general`
  const general = props.feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}-colorPrimary`]: generalColorPrimary } = general

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
    [`${codeSampul}-nicknameBridge`]: sampulNicknameBridge,
    [`${codeSampul}-subTitle`]: sampulSubTitle,
    [`${codeSampul}-date`]: sampulDate,
  } = sampul

  console.log(sampulDate)

  // Function ==================================================================
  const getDate = () => {
    let date
    if (props.options.from === 'theme') {
      date = props.options.date
    } else {
      date = parseISO(sampulDate.value)
    }
    return date
  }

  const getDay = date => {
    return format(date, 'd', { locale: id })
  }

  const getMonth = date => {
    return format(date, 'MMMM', { locale: id })
  }

  const getYear = date => {
    return format(date, 'yyyy', { locale: id })
  }

  return (
    <>
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
                {sampulNicknameGroom.value}
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
                {sampulNicknameBridge.value}
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
                <Text fontSize="xl">{getMonth(getDate())}</Text>
                <Flex alignItems="center" justifyContent="center">
                  <Box
                    w="35px"
                    border="1px"
                    borderColor={generalColorPrimary.value}
                  ></Box>
                  <Text mx="6" fontSize="5xl" lineHeight="1.2">
                    {getDay(getDate())}
                  </Text>
                  <Box
                    w="35px"
                    border="1px"
                    borderColor={generalColorPrimary.value}
                  ></Box>
                </Flex>
                <Text fontSize="xl" mt="-5px">
                  {getYear(getDate())}
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
