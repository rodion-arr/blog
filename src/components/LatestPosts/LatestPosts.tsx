'use client';
import css from './LatestPosts.module.scss';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { FC, Fragment } from 'react';
import { CategoryPosts } from '@/types/category-posts';
import { Link } from '@/components/Util/Link/Link';
import { Date } from '@/components/Util/Date/Date';

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

            <div className={css['latest-posts__list']}>
              {category.posts.map((post) => (
                <div className={css['latest-posts__item']} key={post.slug}>
                  <Link className={css['latest-posts__title']} href={post.slug}>
                    {post.title}
                  </Link>

                  <div className={css['latest-posts__date']}>
                    <Date date={post.datePublished} />
                  </div>

                  <div className={css['latest-posts__tags']}>
                    {post.tags.map((tag, index) => (
                      <Link className={css['latest-posts__tag']} href={'/'} key={index}>
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        );
      })}
    </section>
  );
};
