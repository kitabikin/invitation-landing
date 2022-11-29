import { Card, CardBody, Skeleton, Stack } from '@chakra-ui/react'

const SkeletonList = () => {
  return (
    <Card variant={'outline'} bg={'white'} mb={4}>
      <CardBody>
        <Stack>
          <Skeleton height="20px" w={'20%'} />
          <Skeleton height="20px" w={'75%'} />
          <Skeleton height="20px" w={'50%'} />
        </Stack>
      </CardBody>
    </Card>
  );
}

export default SkeletonList;