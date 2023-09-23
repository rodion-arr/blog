import React from 'react';
import { DbService } from '@/services/db.service';
import { RouteParams } from '@/types/route-params';
import { Category } from '@/components/Category/Category/Category';
import { Metadata } from 'next';
import { SITE_NAME, SITE_THEME_COLOR } from '@/constants';

export async function generateStaticParams() {
  const tags = await DbService.getAllTags();

  return tags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params: { tag } }: RouteParams): Promise<Metadata> {
  const title = `${SITE_NAME} | Tag: ${tag}`;
  const description = `Articles tagged by ${tag}`;

  return {
    title,
    description: description,
    themeColor: SITE_THEME_COLOR,
    openGraph: {
      title,
      description: description,
    },
  };
}

export default async function Page({ params }: RouteParams) {
  const posts = await DbService.getPostsByTag(params.tag);

  return <Category title={`Tag: ${params.tag}`} posts={posts} />;
}
