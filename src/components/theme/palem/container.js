import { Box } from '@chakra-ui/react'

function Container({ data }) {
  return (
    <>
      <Box>
        Palem
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </>
  )
}

export default Container
