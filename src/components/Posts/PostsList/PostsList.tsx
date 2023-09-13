'use client';
import css from './PostsList.module.scss';
import { FC } from 'react';
import { Link } from '@/components/Util/Link/Link';
import { Date } from '@/components/Util/Date/Date';
import { PostMeta } from '@/types/post-meta';
import { UrlService } from '@/services/url.service';

type Props = {
  posts: PostMeta[];
};

export const PostsList: FC<Props> = ({ posts }) => {
  return (
    <div className={css['posts-list']}>
      {posts.map((post) => (
        <div className={css['posts-list__item']} key={post.slug}>
          <Link
            className={css['posts-list__title']}
            href={UrlService.getPostUrl(post.category, post.slug)}
          >
            {post.title}
          </Link>

          <div className={css['posts-list__date']}>
            <Date date={post.datePublished} />
          </div>

          <div className={css['posts-list__tags']}>
            {post.tags.map((tag, index) => (
              <Link className={css['posts-list__tag']} href={UrlService.getTagUrl(tag)} key={index}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
