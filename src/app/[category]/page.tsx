import React from 'react';
import { DbService } from '@/services/db.service';
import { RouteParams } from '@/types/route-params';
import { Category } from '@/components/Category/Category/Category';

export async function generateStaticParams() {
  const categoriesSlugs = DbService.getCategorySlugs();

  return categoriesSlugs.map((categorySlug) => ({
    category: categorySlug,
  }));
}

// todo generateMetadata()

export default async function Page({ params }: RouteParams) {
  const category = DbService.getCategoryBySlug(params.category);
  const posts = await DbService.getCategoryPosts(category.slug);

  return <Category title={category.title} posts={posts} />;
}
