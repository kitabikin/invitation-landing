import site from '@/config/site';
import { Box } from '@chakra-ui/react';
import NavbarClient from '@/layouts/navbar/navbarClient';
import NavbarInvitation from '@/layouts/navbar/navbarInvitation';
import BaseHead from '@/components/global/baseHead';

const ContainerClient = ({ children, type = 'global', title }) => {
  return (
    <>
      <BaseHead title={title} description={site.description} />
      {type === 'global' ? <NavbarClient /> : <NavbarInvitation />}
      <Box as={'main'} pt={'65px'}>
        {children}
      </Box>
    </>
  );
};

export default ContainerClient;
