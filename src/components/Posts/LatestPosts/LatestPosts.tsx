'use client';
import css from './LatestPosts.module.scss';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { FC, Fragment } from 'react';
import { CategoryPosts } from '@/types/category-posts';
import { Link } from '@/components/Util/Link/Link';
import { PostsList } from '@/components/Posts/PostsList/PostsList';

type Props = {
  categories: CategoryPosts[];
};

export const LatestPosts: FC<Props> = ({ categories }) => {
  return (
    <section className={css['latest-posts']}>
      {categories.map((category, categoryIndex) => {
        return (
          <Fragment key={categoryIndex}>
            <SectionTitle>
              <Link href={category.href}>{category.title}</Link>
            </SectionTitle>

            <PostsList posts={category.posts} />
          </Fragment>
        );
      })}
    </section>
  );
};
