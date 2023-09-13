import React from 'react';
import { DbService } from '@/services/db.service';
import { RouteParams } from '@/types/route-params';
import { Post } from '@/components/Posts/Post/Post';

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

// todo generateMetadata()

export default async function Page({ params }: RouteParams) {
  const category = DbService.getCategoryBySlug(params.category);
  const post = await DbService.getPost(params.post);

  return <Post category={category} post={post} />;
}
