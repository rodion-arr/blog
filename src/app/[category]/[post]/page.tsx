import React from 'react';
import { DbService } from '@/services/db.service';
import { RouteParams } from '@/types/route-params';
import { Post } from '@/components/Posts/Post/Post';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_NAME, SITE_THEME_COLOR } from '@/constants';

export async function generateStaticParams() {
  const { posts } = await DbService.getPostsMeta();

  return Object.keys(posts).map((postSlug) => {
    const postMeta = posts[postSlug];
    return {
      category: postMeta.category,
      post: postSlug,
    };
  });
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const post = await DbService.getPost(params.post);

  if (!post) {
    notFound();
  }

  const title = `${SITE_NAME} | ${post.meta.title}`;

  return {
    title,
    description: post.meta.description,
    themeColor: SITE_THEME_COLOR,
    openGraph: {
      title,
      description: post.meta.description,
    },
  };
}

export default async function Page({ params }: RouteParams) {
  const category = DbService.getCategoryBySlug(params.category);
  const post = await DbService.getPost(params.post);

  if (!category || !post) {
    return null;
  }

  return <Post category={category} post={post} />;
}
