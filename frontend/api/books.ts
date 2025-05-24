import axios from 'axios';
import { Book } from '../redux/books/types';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' });

interface FetchBooksApiResponse {
  books: Book[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

// Define payload types for create and update for better type safety
interface CreateBookPayload { title: string; author: string; publishedYear: number; }
interface UpdateBookPayload { title?: string; author?: string; publishedYear?: number; }

export const fetchBooks = async (page: number, limit: number): Promise<FetchBooksApiResponse> => {
  const response = await api.get<FetchBooksApiResponse>('/books', { params: { page, limit } });
  return response.data; // Return only the data part of the response
};
export const createBook = async (data: CreateBookPayload): Promise<Book> => { // Assuming backend returns the created book directly
  const response = await api.post<Book>('/books', data);
  return response.data;
};
export const updateBook = async (id: number, data: UpdateBookPayload): Promise<Book> => { // Assuming backend returns the updated book directly
  const response = await api.put<Book>(`/books/${id}`, data);
  return response.data;
};
export const deleteBook = async (id: number): Promise<void> => { // Delete usually doesn't return content
  await api.delete(`/books/${id}`);
};
export const fetchBookById = async (id: number): Promise<Book> => { // Assuming backend returns the book directly
  const response = await api.get<Book>(`/books/${id}`);
  return response.data;
};