import { FC } from 'react';
import { SITE_URL } from '@/constants';
import logo from '@/images/logo.png';

export const LogoSD: FC = () => {
  const logoSd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: SITE_URL,
    logo: `${SITE_URL}${logo.src}`,
  };

  const tag = `<script type='application/ld+json'>${JSON.stringify(logoSd)}</script>`;

  return <div className='structured-data' dangerouslySetInnerHTML={{ __html: tag }} />;
};
