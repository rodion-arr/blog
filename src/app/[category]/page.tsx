import React from 'react';
import { DbService } from '@/services/db.service';
import { RouteParams } from '@/types/route-params';
import { Category } from '@/components/Category/Category/Category';
import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { SITE_NAME, SITE_THEME_COLOR } from '@/constants';

export async function generateStaticParams() {
  const categoriesSlugs = DbService.getCategorySlugs();

  return categoriesSlugs.map((categorySlug) => ({
    category: categorySlug,
  }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = DbService.getCategoryBySlug(categoryParam);

  if (!category) {
    notFound();
  }

  const title = `${SITE_NAME} | ${category.title}`;

  return {
    title,
    description: category.description,
    openGraph: {
      title,
      description: category.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: SITE_THEME_COLOR,
};

export default async function Page({ params }: RouteParams) {
  const { category: categoryParam } = await params;
  const category = DbService.getCategoryBySlug(categoryParam);

  if (!category) {
    return null;
  }

  const posts = await DbService.getCategoryPosts(category.slug);

  return <Category title={category.title} posts={posts} />;
}
