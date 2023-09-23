'use client';
import css from './PostTitle.module.scss';
import { FC } from 'react';
import { Link } from '@/components/Util/Link/Link';
import { UrlService } from '@/services/url.service';
import { DbCategory } from '@/types/db-category';

type Props = {
  title: string;
  category: DbCategory;
};

export const PostTitle: FC<Props> = ({ title, category }) => {
  return (
    <div className={css.title}>
      <h1>{title}</h1>

      <div className={css.title__breadcrubs}>
        <Link href='/'>Home</Link>
        <div className={css.title__separator} />
        <Link href={UrlService.getCategoryUrl(category.slug)}>{category.title}</Link>
      </div>
    </div>
  );
};
