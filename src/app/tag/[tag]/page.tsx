import React from 'react';
import { DbService } from '@/services/db.service';
import { RouteParams } from '@/types/route-params';
import { Category } from '@/components/Category/Category/Category';
import { Metadata, Viewport } from 'next';
import { SITE_NAME, SITE_THEME_COLOR } from '@/constants';

export async function generateStaticParams() {
  const tags = await DbService.getAllTags();

  return tags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { tag } = await params;

  const title = `${SITE_NAME} | Tag: ${tag}`;
  const description = `Articles tagged by ${tag}`;

  return {
    title,
    description: description,
    openGraph: {
      title,
      description: description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: SITE_THEME_COLOR,
};

export default async function Page({ params }: RouteParams) {
  const { tag } = await params;

  const posts = await DbService.getPostsByTag(tag);

  return <Category title={`Tag: ${tag}`} posts={posts} />;
}
