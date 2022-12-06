import path from 'path';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const blogsPath = path.join(process.cwd(), 'src/data/blog');

// Blog ========================================================================
export const getBlogSlug = async () => {
  const paths = sync(`${blogsPath}/*.mdx`);

  return paths.map((path) => {
    const pathContent = path.split('/');
    const fileName = pathContent[pathContent.length - 1];
    const [slug, _extension] = fileName.split('.');

    return slug;
  });
};

export const getAllBlog = async () => {
  const blogs = fs.readdirSync(path.join(process.cwd(), 'src/data/blog'));

  return blogs.reduce((allBlogs, blogSlug) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'src/data/blog', blogSlug),
      'utf-8',
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: blogSlug.replace('.mdx', ''),
        readingTime: readingTime(source).text,
      },
      ...allBlogs,
    ];
  }, []);
};

export const getBlog = async (slug) => {
  const articleDir = path.join(blogsPath, `${slug}.mdx`);
  const source = fs.readFileSync(articleDir, 'utf-8');
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: {
      slug,
      excerpt: data.excerpt,
      title: data.title,
      publishedAt: data.publishedAt,
      readingTime: readingTime(source).text,
      ...data,
    },
  };
};
