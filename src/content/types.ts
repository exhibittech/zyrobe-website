/** A content page listed in the sitemap, llms.txt and the footer. */
export type PageEntry = {
  slug: string;
  title: string;
  description: string;
  /** Last real content change, YYYY-MM-DD. */
  updated: string;
};
