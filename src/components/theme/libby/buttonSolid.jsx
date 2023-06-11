import { Button } from '@chakra-ui/react';

function ButtonSolid(props) {
  return (
    <>
      <Button
        bg={'var(--libby-color-primary)'}
        color={'white'}
        size="md"
        _hover={{
          bg: 'gray.200',
          color: 'var(--libby-color-body)',
        }}
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
