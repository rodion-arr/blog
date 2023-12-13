import React from 'react';
import { DbService } from '@/services/db.service';
import { AuthorBlock } from '@/components/AuthorBlock/AuthorBlock';
import { LatestPosts } from '@/components/Posts/LatestPosts/LatestPosts';
import { Metadata, Viewport } from 'next';
import { MAIN_PAGE_TITLE, SITE_DESCRIPTION, SITE_THEME_COLOR } from '@/constants';
import logo from '@/images/logo.png';
import { LogoSD } from '@/components/StructuredData/LogoSD/LogoSD';

export const metadata: Metadata = {
  title: MAIN_PAGE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: MAIN_PAGE_TITLE,
    description: SITE_DESCRIPTION,
    images: logo.src,
  },
};

export const viewport: Viewport = {
  themeColor: SITE_THEME_COLOR,
};

export default async function Home() {
  const latestPosts = await DbService.getLatestPostsByCategory();

  return (
    <div>
      <AuthorBlock />

      <LatestPosts categories={latestPosts} />

      <LogoSD />
    </div>
  );
}
