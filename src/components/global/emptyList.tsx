import { Card, CardBody, Flex, Heading } from '@chakra-ui/react';

const EmptyList = ({ icon, label }) => {
  return (
    <Card variant={'outline'} bg={'white'} mb={4}>
      <CardBody py={8}>
        <Flex
          flexDir={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          textAlign={'center'}
          gap={2}
        >
          {icon}
          <Heading size="xs">
            Maaf, Anda belum memiliki {label} yang dapat diakses.
          </Heading>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default EmptyList;
