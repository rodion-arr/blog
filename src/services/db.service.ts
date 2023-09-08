import { readFile, readdir } from 'fs/promises';
import { join } from 'node:path';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeHighlight from 'rehype-highlight';
import yaml from 'js-yaml';
import { PostMeta } from '@/types/post-meta';
import { DbPostsMeta } from '@/types/db-posts-meta';

export const DbService = {
  postsMetaMemo: null as DbPostsMeta | null,

  async getPostsMeta(): Promise<DbPostsMeta> {
    if (this.postsMetaMemo) {
      return this.postsMetaMemo;
    }

    const allTags = new Set<string>();
    const postsMeta: Record<string, PostMeta> = {};

    // TODO change to content/posts
    const posts = await this.walk(`${process.cwd()}/content/drafts`);

    for (const postPath of posts) {
      const meta = this.parseFrontMatter(await readFile(postPath, { encoding: 'utf-8' }));

      if (meta) {
        meta.tags.forEach((tag: string) => allTags.add(tag));

        postsMeta[meta.slug] = {
          ...meta,
          datePublished: new Date(meta.datePublished),
        };
      }
    }

    const result = {
      posts: postsMeta,
      tags: Array.from(allTags),
    };

    // memoize
    this.postsMetaMemo = result;

    return result;
  },

  async getPostContent(postPath: string) {
    const mdx = await readFile(`${process.cwd()}${postPath}`, 'utf-8');

    // TODO TOC
    return (
      await evaluate(mdx, {
        ...(runtime as any),
        remarkPlugins: [remarkFrontmatter],
        rehypePlugins: [rehypeHighlight],
        development: false,
      })
    ).default;
  },

  async walk(dirPath: string): Promise<string[]> {
    return (
      await Promise.all(
        await readdir(dirPath, { withFileTypes: true }).then((entries) =>
          entries.map((entry) => {
            const childPath = join(dirPath, entry.name);
            return entry.isDirectory() ? this.walk(childPath) : childPath;
          }),
        ),
      )
    ).flat();
  },

  parseFrontMatter(mdContent: string): PostMeta | null {
    const fm = mdContent.match(/---\n([\s\S]+?)\n---/);

    if (fm) {
      return yaml.load(fm[1]) as PostMeta;
    }

    return null;
  },
};
