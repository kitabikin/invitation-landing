import Head from 'next/head';
import site from '@/config/site';
import { Box } from '@chakra-ui/react';
import NavbarClient from '@/layouts/navbar/navbarClient';
import NavbarInvitation from '@/layouts/navbar/navbarInvitation';

const ContainerClient = ({ children, type = 'global', title }) => {
  return (
    <>
      <Head>
        <title>{`${title} | ${site.title}`}</title>
      </Head>
      {type === 'global' ? <NavbarClient /> : <NavbarInvitation />}
      <Box as={'main'} pt={'65px'}>
        {children}
      </Box>
    </>
  );
};

export default ContainerClient;
