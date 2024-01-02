import { readFile, readdir } from 'fs/promises';
import { join } from 'node:path';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeHighlight from 'rehype-highlight';
import yaml from 'js-yaml';
import { PostMeta } from '@/types/post-meta';
import { DbPostsMeta } from '@/types/db-posts-meta';
import { CategoryPosts } from '@/types/category-posts';
import { UrlService } from '@/services/url.service';
import { categories } from '@/constants';
import { DbCategory } from '@/types/db-category';
import { DbPost } from '@/types/db-post';

export const DbService = {
  postsMetaMemo: null as DbPostsMeta | null,

  async getPostsMeta(): Promise<DbPostsMeta> {
    if (this.postsMetaMemo) {
      return this.postsMetaMemo;
    }

    const allTags = new Set<string>();
    const postsMeta: Record<string, PostMeta> = {};

    const posts = await this.walk(`${process.cwd()}/content/posts`);

    for (const postPath of posts) {
      const meta = this.parseFrontMatter(await readFile(postPath, { encoding: 'utf-8' }));

      if (meta) {
        meta.tags.forEach((tag: string) => allTags.add(tag));

        postsMeta[meta.slug] = {
          ...meta,
          datePublished: new Date(meta.datePublished),
          path: postPath,
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

  async getLatestPostsByCategory() {
    const posts = await this.getPostsMeta();
    const postsByCategory: Record<string, CategoryPosts> = {};

    for (const postMeta in posts.posts) {
      const post = posts.posts[postMeta];

      if (!postsByCategory[post.category]) {
        postsByCategory[post.category] = {
          title: categories.find((category) => category.slug === post.category)?.title || '',
          href: UrlService.getCategoryUrl(post.category),
          posts: [],
        };
      }

      postsByCategory[post.category].posts.push(post);
    }

    // sort posts by date DESC
    return Object.values(postsByCategory).map((category) => {
      return {
        ...category,
        posts: this.sortPostsByDate(category.posts).slice(0, 3),
      };
    });
  },

  async getPostContent(postPath: string) {
    const mdx = await readFile(postPath, 'utf-8');

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

  async getPost(slug: string): Promise<DbPost | null> {
    const posts = await this.getPostsMeta();

    const post = posts.posts[slug];

    if (!post) {
      return null;
    }

    return {
      meta: post,
      content: await this.getPostContent(post.path),
    };
  },

  getCategoriesRaw() {
    return categories;
  },

  getCategorySlugs(): string[] {
    return DbService.getCategoriesRaw().map((category) => category.slug);
  },

  getCategoryBySlug(slug: string): DbCategory {
    return DbService.getCategoriesRaw().find((category) => category.slug === slug) as DbCategory;
  },

  async getCategoryPosts(slug: string): Promise<PostMeta[]> {
    const posts = await this.getPostsMeta();
    const categoryPosts: PostMeta[] = [];

    for (const postMeta in posts.posts) {
      const post = posts.posts[postMeta];

      if (post.category === slug) {
        categoryPosts.push(post);
      }
    }

    return this.sortPostsByDate(categoryPosts);
  },

  async getAllTags(): Promise<string[]> {
    const posts = await this.getPostsMeta();

    return posts.tags;
  },

  async getPostsByTag(tag: string) {
    const posts = await this.getPostsMeta();
    const postsWithTag: PostMeta[] = [];

    for (const postMeta in posts.posts) {
      const post = posts.posts[postMeta];

      if (post.tags.includes(tag)) {
        postsWithTag.push(post);
      }
    }

    return postsWithTag;
  },

  sortPostsByDate(posts: PostMeta[]) {
    return posts.sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
  },
};
