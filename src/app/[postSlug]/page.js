import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeSnippet from '@/components/CodeSnippet';
import Spinner from '@/components/Spinner';
import dynamic from 'next/dynamic';

// import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';

const DivisionGroupsDemo = dynamic(
  () => import('@/components/DivisionGroupsDemo'),
  { loading: Spinner }
);

const getBlogPost = React.cache(
  async (slug) => await loadBlogPost(slug)
)

export async function generateMetadata({ params }) {
  const blogContent = await getBlogPost(params.postSlug)

  return {
    title: blogContent.frontmatter.title,
    description: blogContent.frontmatter.abstract,
  }
}

async function BlogPost({ params }) {
  const { postSlug } = params
  const blogContent = await getBlogPost(postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogContent.frontmatter.title}
        publishedOn={blogContent.frontmatter.publishedOn}
      />

      <div className={styles.page}>
        <MDXRemote source={blogContent.content} components={{
          pre: CodeSnippet,
          DivisionGroupsDemo
        }} />
      </div>
    </article>
  );
}

export default BlogPost;
