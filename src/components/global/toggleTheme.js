import { Button, useColorMode } from '@chakra-ui/react'
import { FiSun, FiMoon } from 'react-icons/fi'

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Button variant="ghost" onClick={toggleColorMode}>
        {colorMode === 'light' ? <FiMoon /> : <FiSun />}
      </Button>
    </>
  )
}

export default ToggleTheme
