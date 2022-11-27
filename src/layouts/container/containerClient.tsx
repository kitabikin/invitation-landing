import Head from 'next/head';
import site from '@/config/site';
import { Box } from '@chakra-ui/react';
import NavbarClient from '@/layouts/navbar/navbarClient';

const ContainerClient = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{`${title} | ${site.title}`}</title>
      </Head>
      <NavbarClient />
      <Box as={'main'}>{children}</Box>
    </>
  );
};

export default ContainerClient;
