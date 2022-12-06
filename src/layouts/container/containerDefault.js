import { Box } from '@chakra-ui/react';

import site from '@/config/site';
import NavbarDefault from '@/layouts/navbar/navbarDefaultV2';
import FooterDefault from '@/layouts/footer/footerDefault';
import BaseHead from '@/components/global/baseHead';
import FloatingWhatsapp from '@/components/global/floatingWhatsapp';

function ContainerDefault({ children, title, description = null }) {
  return (
    <>
      <BaseHead
        title={title}
        description={description ? description : site.description}
      />
      <NavbarDefault />
      <Box as={'main'}>{children}</Box>
      <FooterDefault />
      <FloatingWhatsapp />
    </>
  );
}

export default ContainerDefault;
