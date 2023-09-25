import { MetadataRoute } from 'next';
import { DbService } from '@/services/db.service';
import { SITE_URL } from '@/constants';
import { UrlService } from '@/services/url.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
  ];

  // categories
  const categoriesSlugs = DbService.getCategorySlugs();
  for (const categorySlug of categoriesSlugs) {
    sitemap.push({
      url: `${SITE_URL}${UrlService.getCategoryUrl(categorySlug)}`,
      lastModified: new Date(),
    });
  }

  // posts
  const posts = await DbService.getPostsMeta();
  for (const postSlug of Object.keys(posts.posts)) {
    const post = posts.posts[postSlug];

    sitemap.push({
      url: `${SITE_URL}${UrlService.getPostUrl(post.category, postSlug)}`,
      lastModified: new Date(),
    });
  }

  // tags
  for (const tagSlug of posts.tags) {
    sitemap.push({
      url: `${SITE_URL}${UrlService.getTagUrl(tagSlug)}`,
      lastModified: new Date(),
    });
  }

  return sitemap;
}
