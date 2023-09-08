import React from 'react';
import { DbService } from '@/services/db.service';
import { AuthorBlock } from '@/components/AuthorBlock/AuthorBlock';

export default async function Home() {
  await DbService.getPostsMeta();

  return (
    <div>
      <AuthorBlock />
    </div>
  );
}
