import { Button } from '@chakra-ui/react';

function ButtonSolid(props) {
  return (
    <>
      <Button
        bg={'var(--hazel-color-primary)'}
        color="white"
        size="md"
        borderRadius="20px"
        _hover={{ bg: 'yellow.600' }}
        fontWeight="normal"
        px="6"
        {...props}
      >
        {props.children}
      </Button>
    </>
  );
}

export default ButtonSolid;
