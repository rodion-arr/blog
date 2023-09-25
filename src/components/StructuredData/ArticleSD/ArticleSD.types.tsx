export type Article = {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  datePublished: string;
  dateModified: string;
  author: Author[];
};

export type Author = {
  '@type': 'Person';
  name: string;
  url: string;
};
