import { PostMeta } from '@/types/post-meta';
import { MDXContent } from 'mdx/types';

export type DbPost = {
  content: MDXContent;
  meta: PostMeta;
};
