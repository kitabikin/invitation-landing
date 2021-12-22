import { Flex, Box } from '@chakra-ui/react'

function Custom404() {
  return (
    <>
      <Flex
        h="95vh"
        minH="full"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          fontWeight="bold"
          fontSize={{ base: '5xl', md: '7xl' }}
          textAlign="center"
          mt="4"
        >
          <Box lineHeight="1.25">4 0 4</Box>
        </Box>

        <Box fontWeight="500" textAlign="center" mt="7">
          Page Not Found
        </Box>
      </Flex>
    </>
  )
}

export default Custom404
