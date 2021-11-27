import Image from 'next/image'

import _ from 'lodash'
import { Button } from '@chakra-ui/react'

function Quotes({ buttonLabel, link }) {
  return (
    <>
      <Button
        bg="yellow.600"
        color="white"
        size="sm"
        borderRadius="20px"
        _hover={{ bg: 'yellow.700' }}
        as="a"
        target="_blank"
        href={link}
      >
        {buttonLabel}
      </Button>
    </>
  )
}

export default Quotes
