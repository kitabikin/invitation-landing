import { Box } from '@chakra-ui/react'

function ContainerBlank({ children }) {
  return (
    <>
      <Box as={'main'} overflowX="hidden">
        {children}
      </Box>
    </>
  )
}

export default ContainerBlank
