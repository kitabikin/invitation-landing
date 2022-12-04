import { Box } from '@chakra-ui/react';
import BaseHead from '@/components/global/baseHead';

function ContainerBlank({ children, title, description }) {
  return (
    <>
      <BaseHead title={title} description={description} />
      <Box as={'main'} overflowX="hidden">
        {children}
      </Box>
    </>
  );
}

export default ContainerBlank;
