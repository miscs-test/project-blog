import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';

async function Home() {
  const blogPosts = await getBlogPostList()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      {
        blogPosts.map((blog) => (
          <BlogSummaryCard
            key={blog.slug}
            slug={blog.slug}
            title={blog.title}
            abstract={blog.abstract}
            publishedOn={blog.publishedOn}
          />
        ))
      }
    </div>
  );
}

export default Home;
