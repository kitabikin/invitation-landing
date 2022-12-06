import site from '@/config/site';
import { Circle } from '@chakra-ui/react';
import { RiWhatsappLine } from 'react-icons/ri';

const FloatingWhatsapp = () => {
  const wa = site.whatsappNumber;
  const txt = encodeURIComponent(
    `Halo kak, saya tertarik ingin membuat undangan. \nMohon bantuannya :)`,
  );

  return (
    <Circle
      as={'a'}
      bg={'#25D366'}
      color={'white'}
      cursor="pointer"
      position="fixed"
      size="60px"
      bottom="30px"
      right="30px"
      zIndex="500"
      aria-label="Whatsapp"
      href={`https://wa.me/${wa}?text=${txt}`}
      target={'_blank'}
    >
      <RiWhatsappLine size={30} />
    </Circle>
  );
};

export default FloatingWhatsapp;
