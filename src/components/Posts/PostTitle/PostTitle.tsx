'use client';
import css from './PostTitle.module.scss';
import { FC } from 'react';
import { Link } from '@/components/Util/Link/Link';
import { UrlService } from '@/services/url.service';
import { DbCategory } from '@/types/db-category';
import { BreadcrumbListSD } from '@/components/StructuredData/BreadcrumbListSD/BreadcrumbListSD';

type Props = {
  title: string;
  category: DbCategory;
};

export const PostTitle: FC<Props> = ({ title, category }) => {
  const categoryUrl = UrlService.getCategoryUrl(category.slug);

  return (
    <div className={css.title}>
      <h1>{title}</h1>

      <div className={css.title__breadcrubs}>
        <Link href='/'>Home</Link>
        <div className={css.title__separator} />
        <Link href={categoryUrl}>{category.title}</Link>
      </div>

      <BreadcrumbListSD
        items={[
          {
            name: 'Main',
            relativeUrl: '/',
          },
          {
            name: category.title,
            relativeUrl: categoryUrl,
          },
          {
            name: title,
          },
        ]}
      />
    </div>
  );
};
