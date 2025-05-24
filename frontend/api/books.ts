import axios from 'axios';
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' });

export const fetchBooks = (page: number, limit: number) => api.get('/books', { params: { page, limit } });
export const createBook = (data: { title: string; author: string; publishedYear: number }) => api.post('/books', data);
export const updateBook = (id: number, data: { title?: string; author?: string; publishedYear?: number }) => api.put(`/books/${id}`, data);
export const deleteBook = (id: number) => api.delete(`/books/${id}`);
export const fetchBookById = (id: number) => api.get(`/books/${id}`);