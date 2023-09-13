import React from 'react';
import { DbService } from '@/services/db.service';
import { AuthorBlock } from '@/components/AuthorBlock/AuthorBlock';
import { LatestPosts } from '@/components/LatestPosts/LatestPosts';

export default async function Home() {
  const latestPosts = await DbService.getLatestPostsByCategory();

  return (
    <div>
      <AuthorBlock />

      <LatestPosts categories={latestPosts} />
    </div>
  );
}
