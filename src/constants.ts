import { DbCategory } from '@/types/db-category';

export const SITE_NAME = "Rodion'sBlog.tech";
export const SITE_THEME_COLOR = '#181a2a';
export const SITE_DESCRIPTION =
  'Articles by Rodion Abdurakhimov. JavaScript, React, Node.js, CSS, DevOps, Tech project management.';
export const MAIN_PAGE_TITLE = `${SITE_NAME} | Articles by Rodion Abdurakhimov`;

export const categories: DbCategory[] = [
  {
    title: 'Backend',
    slug: 'backend',
    description: 'Articles about backend development, Node.js, Next.js, NestJS, databases, etc.',
  },
  {
    title: 'CSS/Layout',
    slug: 'css',
    description: 'Articles about CSS, SCSS, layout, BEM, etc.',
  },
  {
    title: 'JavaScript/React',
    slug: 'js',
    description: 'Articles about JavaScript, React, TypeScript, etc.',
  },
  {
    title: 'Tech project management',
    slug: 'pm',
    description: 'Articles about tech project management',
  },
  {
    title: 'DevOps',
    slug: 'devops',
    description: 'Articles about DevOps, CI/CD, Docker, etc.',
  },
  {
    title: 'Misc',
    slug: 'misc',
    description: 'Miscellaneous articles',
  },
];

export const SITE_URL = 'https://rodion-blog.tech';
export const GITHUB_URL = 'https://github.com/rodion-arr';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/rodionabdurakhimov/';
export const TWITTER_URL = 'https://twitter.com/rodion_arr';
export const FACEBOOK_URL = 'https://www.facebook.com/rodion.abdurakhimov';
