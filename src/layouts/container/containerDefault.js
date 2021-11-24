import { Box } from '@chakra-ui/react'

import NavbarDefault from '@/layouts/navbar/navbarDefault'
import FooterDefault from '@/layouts/footer/footerDefault'

function ContainerDefault({ children }) {
  return (
    <>
      <NavbarDefault />
      <Box as={'main'}>{children}</Box>
      <FooterDefault />
    </>
  )
}

export default ContainerDefault
