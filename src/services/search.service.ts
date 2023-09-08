import lunr from 'lunr';
import { DbService } from '@/services/db.service';
import { DbCategory } from '@/types/db-category';
import { DbTag } from '@/types/db-tag';
import { DbPostsMeta } from '@/types/db-posts-meta';

export const SearchService = {
  index: null as null | lunr.Index,

  async initSearch() {
    const categories: Record<string, DbCategory> = {};
    const tags: Record<string, DbTag> = {};
    const { posts } = await DbService.getPostsMeta();

    this.index = lunr(function () {
      this.field('title');
      this.field('data');
      this.ref('id');

      Object.keys(categories).forEach((categorySlug) => {
        // Add category to search index
        const category = categories[categorySlug];
        this.add({
          id: `categories|${categorySlug}`,
          title: category.title,
        });
      });

      Object.keys(tags).forEach((tagSlug) => {
        // Add category to search index
        const tag = tags[tagSlug];
        this.add({
          id: `tag|${tagSlug}`,
          title: tag.title,
        });
      });

      Object.keys(posts).forEach((postSlug) => {
        // Add category to search index
        const post = posts[postSlug];
        this.add({
          id: `posts|${postSlug}`,
          title: post.title,
        });
      });
    });
  },

  async search(query: string) {
    if (!this.index) {
      await this.initSearch();
    }

    if (this.index) {
      const searchResults: { categories: DbCategory[]; posts: DbPostsMeta[]; tags: DbTag[] } = {
        categories: [],
        posts: [],
        tags: [],
      };

      const resultsFromIndex = this.index.search(query);

      resultsFromIndex.forEach((result) => {
        const [type, slug] = result.ref.split('|');

        if (type === 'categories') {
          searchResults.categories.push({} as DbCategory);
        } else if (type === 'posts') {
          searchResults.posts.push({} as DbPostsMeta);
        } else if (type === 'tags') {
          searchResults.tags.push({} as DbTag);
        }
      });

      return searchResults;
    }
  },
};
