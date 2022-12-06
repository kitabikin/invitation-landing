import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

import ContainerBlog from '@/layouts/container/containerBlog';
import { getBlogSlug, getBlog } from '@/libs/fetchBlog';
import { Box, Container, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';

const BlogPage = ({ post: { source, frontmatter } }) => {
  return (
    <ContainerBlog
      title={frontmatter.title}
      description={frontmatter.excerpt}
      image={frontmatter.image}
      date={new Date(frontmatter.publishedAt).toISOString()}
    >
      <Container maxW="container.md" mt={20}>
        <Box mb={12}>
          <Spacer w={{ base: 4, md: 8 }} h={{ base: 4, md: 8 }} />

          <Heading as={'h1'} fontSize={'4xl'} fontWeight={700} mb={4}>
            {frontmatter.title}
          </Heading>

          <Flex justifyContent={'space-between'}>
            <Box>
              {`Kitabikin / `}
              {format(parseISO(frontmatter.publishedAt), 'd MMMM yyyy', {
                locale: id,
              })}
            </Box>
            <Box>{frontmatter.readingTime}</Box>
          </Flex>
        </Box>

        <Box mb={24}>
          <Prose>
            <MDXRemote {...source} components={{ Image, Text }} />
          </Prose>
        </Box>
      </Container>
    </ContainerBlog>
  );
};

export async function getStaticPaths() {
  const paths = (await getBlogSlug()).map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { content, frontmatter } = await getBlog(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ['anchor'] },
          },
          { behaviour: 'wrap' },
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  });

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter,
      },
    },
  };
}

export default BlogPage;
