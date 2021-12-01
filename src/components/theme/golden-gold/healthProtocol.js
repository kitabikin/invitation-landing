import Image from 'next/image'

import _ from 'lodash'
import { Container, Box, SimpleGrid } from '@chakra-ui/react'

function HealthProtocol({ options, feature }) {
  const code = 'golden-gold'

  // General
  const codeGeneral = `${code}_general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}_background`]: gBg } = general

  // Health Protocol
  const codeHealthProtocol = `${code}_health-protocol`
  const healthProtocol = feature[codeHealthProtocol].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeHealthProtocol}_title`]: hpTitle,
    [`${codeHealthProtocol}_title-sub`]: hpTitleSub,
    [`${codeHealthProtocol}_data`]: hpData,
  } = healthProtocol

  return (
    <>
      <Box position="relative">
        <Box
          bgImage={`url('${gBg.value}')`}
          bgPosition="center center"
          bgRepeat="repeat"
          bgSize="300px 300px"
          pb="24"
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
              {/* Health Protocol Title */}
              {hpTitle && hpTitle.is_active && (
                <Box fontWeight="bold" fontSize="2xl">
                  {hpTitle.value}
                </Box>
              )}

              {/* Health Protocol Title Sub */}
              {hpTitleSub && hpTitleSub.is_active && (
                <Box mt="2">{hpTitleSub.value}</Box>
              )}

              {/* Health Protocol Data */}
              {hpData && hpData.is_active && (
                <SimpleGrid mt="4" columns={[2, null, 4]} spacing="20px">
                  {JSON.parse(hpData.value).map((data, i) => (
                    <Box key={i}>
                      <Box p="6">
                        <Image
                          src={data.image}
                          alt={data.title}
                          height={200}
                          width={200}
                        />
                      </Box>
                      <Box>{data.title}</Box>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default HealthProtocol
