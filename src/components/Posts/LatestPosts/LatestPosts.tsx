'use client';
import css from './LatestPosts.module.scss';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import React, { FC, Fragment } from 'react';
import { CategoryPosts } from '@/types/category-posts';
import { Link } from '@/components/Util/Link/Link';
import { PostsList } from '@/components/Posts/PostsList/PostsList';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink';

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

            <div className={css.more}>
              <ButtonLink className={css.button} href={category.href} anchor='View more' />
            </div>
          </Fragment>
        );
      })}
    </section>
  );
};
