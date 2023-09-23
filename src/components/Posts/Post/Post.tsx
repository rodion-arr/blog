import css from './Post.module.scss';
import { DbCategory } from '@/types/db-category';
import { DbPost } from '@/types/db-post';
import React, { FC } from 'react';
import { PostTitle } from '@/components/Posts/PostTitle/PostTitle';
import { PostTags } from '@/components/Posts/PostTags/PostTags';
import { DisqusComments } from '@/components/DisqusComments/DisqusComments';

type Props = {
  category: DbCategory;
  post: DbPost;
};

export const Post: FC<Props> = ({ category, post }) => {
  const { meta, content: Content } = post;

  return (
    <article className={css.post}>
      <PostTags tags={meta.tags} className={css.tags} />

      <PostTitle title={meta.title} category={category} />

      <Content />

      <DisqusComments title={meta.title} id={meta.slug} />
    </article>
  );
};
