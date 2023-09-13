import { categories } from '@/constants';
import { CategoryLink } from '@/types/category-link';

export const UrlService = {
  getCategoryUrl(slug: string) {
    return `/${slug}`;
  },

  getMenuItems(includeHome = true) {
    const menuItems: CategoryLink[] = [];

    if (includeHome) {
      menuItems.push({ title: 'Home', href: '/' });
    }

    for (const category of categories) {
      menuItems.push({
        title: category.title,
        href: UrlService.getCategoryUrl(category.slug),
      });
    }

    return menuItems;
  },
};
