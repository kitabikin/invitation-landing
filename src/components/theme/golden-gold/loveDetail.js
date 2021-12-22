import _ from 'lodash'
import { Container, Box } from '@chakra-ui/react'

function LoveDetail({ options, feature }) {
  const code = 'golden-gold'

  // General
  const codeGeneral = `${code}_general`
  const general = feature[codeGeneral].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const { [`${codeGeneral}_background`]: gBg } = general

  return (
    <>
      <Box position="relative">
        <Box
          bgImage={`url('${gBg.value}')`}
          bgPosition="center center"
          bgRepeat="repeat"
          bgSize="300px 300px"
          py="24"
        >
          <Container h="full" maxW="4xl" centerContent>
            asd
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default LoveDetail
