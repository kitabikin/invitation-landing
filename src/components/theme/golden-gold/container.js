import { Box } from '@chakra-ui/react'

function Container({ data }) {
  return (
    <>
      <Box>
        Golden Gold
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </>
  )
}

export default Container
