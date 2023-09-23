'use client';
import css from './PostTags.module.scss';
import { FC } from 'react';
import { Link } from '@/components/Util/Link/Link';
import { UrlService } from '@/services/url.service';

type Props = {
  className?: string;
  tags: string[];
};

export const PostTags: FC<Props> = ({ tags, className }) => {
  return (
    <div className={`${css.tags} ${className}`}>
      {tags.map((tag, index) => (
        <Link className={css.tags__tag} href={UrlService.getTagUrl(tag)} key={index}>
          {tag}
        </Link>
      ))}
    </div>
  );
};
