import NextLink from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardBody,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';

const BlogPost = ({ slug, image, title, excerpt }) => {
  return (
    <LinkBox
      as={Card}
      variant={'outline'}
      bg={'white'}
      _hover={{ borderColor: 'pink.300' }}
    >
      <CardBody>
        <Image
          src={image}
          alt={title}
          objectFit={'cover'}
          width={600}
          height={300}
        />
        <Stack mt="4" spacing="3">
          <LinkOverlay as={NextLink} href={`/blog/${slug}`}>
            <Heading size="md">{title}</Heading>
          </LinkOverlay>
          <Text>{excerpt}</Text>
        </Stack>
      </CardBody>
    </LinkBox>
  );
};

export default BlogPost;
