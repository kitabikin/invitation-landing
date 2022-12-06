import { sortBy } from 'lodash';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';

import ContainerDefault from '@/layouts/container/containerDefault';
import HeaderPage from '@/components/global/header/headerPage';
import BlogPost from '@/components/specific/blog/blogPost';
import { getAllBlog } from '@/libs/fetchBlog';

const Blog = ({ posts }) => {
  const sortPosts = sortBy(posts, ['publishedAt']).reverse();

  return (
    <ContainerDefault title="Blog">
      <Container maxW="container.lg" mt={20}>
        <HeaderPage title={'Blog'} />

        <Box mb={24}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {sortPosts.map((frontMatter, index) => (
              <BlogPost
                key={index}
                slug={frontMatter.slug}
                image={frontMatter.image}
                title={frontMatter.title}
                excerpt={frontMatter.excerpt}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </ContainerDefault>
  );
};

export async function getStaticProps() {
  const blogs = await getAllBlog();

  return {
    props: {
      posts: blogs,
    },
  };
}

export default Blog;
