import React from 'react';
import { DbService } from '@/services/db.service';
import { AuthorBlock } from '@/components/AuthorBlock/AuthorBlock';
import { LatestPosts } from '@/components/Posts/LatestPosts/LatestPosts';
import { Metadata } from 'next';
import { MAIN_PAGE_TITLE, SITE_DESCRIPTION, SITE_THEME_COLOR } from '@/constants';
import logo from '@/images/logo.png';

export const metadata: Metadata = {
  title: MAIN_PAGE_TITLE,
  description: SITE_DESCRIPTION,
  themeColor: SITE_THEME_COLOR,
  openGraph: {
    title: MAIN_PAGE_TITLE,
    description: SITE_DESCRIPTION,
    images: logo.src,
  },
};

export default async function Home() {
  const latestPosts = await DbService.getLatestPostsByCategory();

  return (
    <div>
      <AuthorBlock />

      <LatestPosts categories={latestPosts} />
    </div>
  );
}
