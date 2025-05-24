import booksReducer, {
    fetchBooksRequest,
    fetchBooksSuccess,
    fetchBooksFailure,
    setPage,
  // Import other actions you want to test
} from '../redux/books/booksSlice'; // Adjust the import path as necessary
import { BooksState, Book } from '../redux/books/types';

describe('booksReducer', () => {
let initialState: BooksState;

beforeEach(() => {
    // Define a consistent initial state for each test
    initialState = {
    list: [],
    selectedBook: null,
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    };
});

it('should handle fetchBooksRequest', () => {
    const action = fetchBooksRequest({ page: 1, limit: 10 });
    const state = booksReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
});

it('should handle fetchBooksSuccess and set book list correctly', () => {
    const books: Book[] = [{ id: 1, title: 'Test Book 1', author: 'Author 1', publishedYear: 2020 }];
    const payload = { books, total: 1 }; // Assuming total is part of the payload
    const action = fetchBooksSuccess(payload);
    const state = booksReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.list).toEqual(books);
    expect(state.total).toEqual(1);
    expect(state.totalPages).toEqual(1); // Assuming limit is 10, Math.ceil(1/10) if calculated
});

it('should handle fetchBooksFailure', () => {
    const errorMessage = 'Failed to fetch';
    const action = fetchBooksFailure(errorMessage);
    const state = booksReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage);
    expect(state.list).toEqual([]); // List should likely be empty or unchanged on failure
});

it('should handle setPage', () => {
    const newPage = 2;
    const action = setPage(newPage);
    const state = booksReducer(initialState, action);
    expect(state.page).toEqual(newPage);
});

  // Add more tests for other actions like addBookSuccess, deleteBookSuccess, etc.
});


describe('booksSlice in __tests__', () => {
it('should have a placeholder test', () => {
    expect(true).toBe(true); // Replace with actual assertions or remove this file
    });
});