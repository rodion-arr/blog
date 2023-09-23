'use client';
import css from './PostsList.module.scss';
import React, { FC } from 'react';
import { Link } from '@/components/Util/Link/Link';
import { Date } from '@/components/Util/Date/Date';
import { PostMeta } from '@/types/post-meta';
import { UrlService } from '@/services/url.service';
import { PostTags } from '@/components/Posts/PostTags/PostTags';

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

          <PostTags tags={post.tags} />
        </div>
      ))}
    </div>
  );
};
