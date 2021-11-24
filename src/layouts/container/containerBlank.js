import { Box } from '@chakra-ui/react'

function ContainerBlank({ children }) {
  return (
    <>
      <Box as={'main'}>{children}</Box>
    </>
  )
}

export default ContainerBlank
