import css from './Category.module.scss';
import { FC } from 'react';
import { CategoryTitle } from '@/components/Category/CategoryTitle/CategoryTitle';
import { PostsList } from '@/components/Posts/PostsList/PostsList';
import { PostMeta } from '@/types/post-meta';
import { BreadcrumbListSD } from '@/components/StructuredData/BreadcrumbListSD/BreadcrumbListSD';

type Props = {
  title: string;
  posts: PostMeta[];
};

export const Category: FC<Props> = ({ title, posts }) => {
  return (
    <section className={css.category}>
      <CategoryTitle title={title} />

      <PostsList posts={posts} />

      <BreadcrumbListSD
        items={[
          {
            name: 'Main',
            relativeUrl: '/',
          },
          {
            name: title,
          },
        ]}
      />
    </section>
  );
};
