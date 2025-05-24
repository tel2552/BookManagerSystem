export interface Book { id: number; title: string; author: string; publishedYear: number; }
export interface BooksState {
    list: Book[];
    selectedBook: Book | null; // To store the book fetched by ID
    loading: boolean;
    error: string | null;
    page: number;
    limit: number;
    total?: number;
    totalPages?: number;
}