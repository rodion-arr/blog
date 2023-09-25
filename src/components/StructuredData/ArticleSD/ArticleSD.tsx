import { FC } from 'react';
import { SITE_URL } from '@/constants';
import { Article } from './ArticleSD.types';

type Props = Omit<Article, '@context' | '@type' | 'author' | 'dateModified'>;

export const ArticleSD: FC<Props> = ({ headline, datePublished }) => {
  const logoSd: Article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    datePublished,
    dateModified: datePublished,
    author: [
      {
        '@type': 'Person',
        name: 'Rodion Abdurakhimov',
        url: SITE_URL,
      },
    ],
  };

  const tag = `<script type='application/ld+json'>${JSON.stringify(logoSd)}</script>`;

  return <div className='structured-data' dangerouslySetInnerHTML={{ __html: tag }} />;
};
