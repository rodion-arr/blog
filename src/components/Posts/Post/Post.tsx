import css from './Post.module.scss';
import { DbCategory } from '@/types/db-category';
import { DbPost } from '@/types/db-post';
import { FC } from 'react';

type Props = {
  category: DbCategory;
  post: DbPost;
};

export const Post: FC<Props> = ({ category, post }) => {
  const { meta, content: Content } = post;

  return (
    <article className={css.post}>
      <Content />
    </article>
  );
};
