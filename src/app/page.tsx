import React from 'react';
import { DbService } from '@/services/db.service';

export default async function Home() {
  await DbService.getPostsMeta();

  return <div></div>;
}
