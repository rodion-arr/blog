export type RouteParams = {
  params: Promise<{
    category: string;
    post: string;
    tag: string;
  }>;
};
