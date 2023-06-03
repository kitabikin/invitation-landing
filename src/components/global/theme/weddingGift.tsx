import Image from 'next/image';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { MdLink } from 'react-icons/md';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

const WeddingGift = ({ code, alias, nomor }) => {
  const toast = useToast();
  const [value, copy] = useCopyToClipboard();

  let url;
  switch (code) {
    case 'GIFT':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1670249811/invitation/logo/logo-gift_xs2865.png';
      break;
    case 'BCA':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1670249809/invitation/logo/logo-bca_cwd3dm.png';
      break;
    case 'MANDIRI':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1670249809/invitation/logo/logo-mandiri_ahi8iq.png';
      break;
    case 'BRI':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1670249809/invitation/logo/logo-bri_j7spd5.png';
      break;
    case 'BNI':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1670249809/invitation/logo/logo-bni_gnhk25.png';
      break;
    case 'BJB':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1685791292/invitation/logo/logo-bjb_edipd8.png';
      break;
    case 'EWALLET_OVO':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1670249809/invitation/logo/logo-ovo_uke4hz.png';
      break;
    case 'EWALLET_DANA':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1670249809/invitation/logo/logo-dana_fbsggx.png';
      break;
    case 'EWALLET_GOPAY':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1670249809/invitation/logo/logo-gopay_irfsuk.png';
      break;
    case 'EWALLET_SHOPEEPAY':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1670249809/invitation/logo/logo-shopeepay_o8bcvh.png';
      break;
    case 'EWALLET_LINKAJA':
      url =
        'https://res.cloudinary.com/kitabikin/image/upload/v1670249809/invitation/logo/logo-linkaja_qpymle.png';
      break;
    default:
      break;
  }

  const onCopy = (e) => {
    e.preventDefault();

    copy(nomor);

    toast({
      title: `Tersalin`,
      position: 'top',
    });
  };

  return (
    <Box textAlign={'center'} mb={4}>
      <Flex justifyContent={'center'}>
        <Image src={url} alt={code} width={200} height={100} />
      </Flex>
      <Text mb={3}>a.n. {alias}</Text>
      <Text mb={3} fontSize={'lg'} fontWeight={'bold'}>
        {nomor}
      </Text>
      <Button
        size={'sm'}
        variant={'outline'}
        colorScheme={'pink'}
        leftIcon={<MdLink />}
        onClick={onCopy}
      >
        Salin
      </Button>
    </Box>
  );
};

export default WeddingGift;
