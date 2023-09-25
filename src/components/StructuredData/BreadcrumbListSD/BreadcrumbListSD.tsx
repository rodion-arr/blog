import { FC } from 'react';
import { SITE_URL } from '@/constants';
import { BreadcrumbList, BreadcrumbListItem, BreadcrumbListSDItem } from './BreadcrumbListSD.types';

interface Props {
  items: BreadcrumbListSDItem[];
}

export const BreadcrumbListSD: FC<Props> = ({ items }) => {
  const logoSd: BreadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [],
  };

  items.forEach((item, index) => {
    const jsonItem: BreadcrumbListItem = {
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
    };

    if (item.relativeUrl) {
      jsonItem.item = `${SITE_URL}${item.relativeUrl}`;
    }

    logoSd.itemListElement.push(jsonItem);
  });

  const tag = `<script type='application/ld+json'>${JSON.stringify(logoSd)}</script>`;

  return <div className='structured-data' dangerouslySetInnerHTML={{ __html: tag }} />;
};
