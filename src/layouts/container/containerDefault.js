import { Box } from '@chakra-ui/react';
import FloatingWhatsApp from 'react-floating-whatsapp';

import site from '@/config/site';
import NavbarDefault from '@/layouts/navbar/navbarDefaultV2';
import FooterDefault from '@/layouts/footer/footerDefault';

function ContainerDefault({ children }) {
  return (
    <>
      <NavbarDefault />
      <Box as={'main'}>{children}</Box>
      <FooterDefault />
      <FloatingWhatsApp
        phoneNumber={site.whatsappNumber}
        accountName={'Zayn'}
        avatar={'/images/illustration/avatar-whatsapp.png'}
        statusMessage={'Active'}
        chatMessage={'Halo 👋 \nAda yang bisa kita bantu?'}
        allowClickAway
        notification
        notificationDelay={60000}
        notificationSound
      />
    </>
  );
}

export default ContainerDefault;
