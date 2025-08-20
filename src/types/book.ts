export interface Book {
  rank: string;
  original_title: string;
  title_zh: string;
  author: string;
  rating: string;
  ratings_count: string;
  description_review: string;
  goodreads_link: string;
  goodreads_cover_link: string;
}

export interface BookData {
  last_updated: string;
  total_books: number;
  books: Book[];
}
