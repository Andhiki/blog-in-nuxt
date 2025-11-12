export type BlogPost = {
  path?: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  slug: string;
  tags?: string[];
  body?: unknown;
};
