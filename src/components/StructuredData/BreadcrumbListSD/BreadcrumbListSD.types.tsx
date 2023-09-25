export type BreadcrumbListSDItem = {
  name: string;
  relativeUrl?: string;
};

export type BreadcrumbList = {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbListItem[];
};

export type BreadcrumbListItem = {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
};
