import css from './Category.module.scss';
import { FC } from 'react';
import { CategoryTitle } from '@/components/Category/CategoryTitle/CategoryTitle';
import { PostsList } from '@/components/Posts/PostsList/PostsList';
import { PostMeta } from '@/types/post-meta';

type Props = {
  title: string;
  posts: PostMeta[];
};

export const Category: FC<Props> = ({ title, posts }) => {
  return (
    <section className={css.category}>
      <CategoryTitle title={title} />

      <PostsList posts={posts} />
    </section>
  );
};
