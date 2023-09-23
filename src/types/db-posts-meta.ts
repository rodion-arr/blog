import { PostMeta } from '@/types/post-meta';

export type DbPostsMeta = {
  tags: string[];
  posts: Record<string, PostMeta>;
};
