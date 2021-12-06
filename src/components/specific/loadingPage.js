import { Flex, Box } from '@chakra-ui/react'

function LoadingPage() {
  return (
    <>
      <Flex
        h="95vh"
        minH="full"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box fontWeight="500" textAlign="center" mt="7">
          Loading...
        </Box>
      </Flex>
    </>
  )
}

export default LoadingPage
