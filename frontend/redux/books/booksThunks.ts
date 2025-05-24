import { AppDispatch, RootState } from '../store';
import {
    fetchBooksRequest,
    fetchBooksSuccess,
    fetchBooksFailure,
    addBookRequest,
    addBookSuccess,
    addBookFailure,
    updateBookRequest,
    updateBookSuccess,
    updateBookFailure,
    deleteBookRequest,
    deleteBookSuccess,
    deleteBookFailure,
    fetchBookByIdRequest,
    fetchBookByIdSuccess,
    fetchBookByIdFailure,
    AddBookPayload,
    UpdateBookPayload,
} from './booksSlice';
import * as api from '../../api/books'; // Your API service

export const fetchBooksThunk = (page: number, limit: number) => async (dispatch: AppDispatch) => {
try {
    // You might dispatch fetchBooksRequest here if you want to set loading state from the slice
    // dispatch(fetchBooksRequest({ page, limit }));
    const response = await api.fetchBooks(page, limit);
    // Assuming response.data structure matches FetchBooksSuccessPayload
    dispatch(fetchBooksSuccess(response.data));
} catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch books';
    dispatch(fetchBooksFailure(errorMessage));
}
};

export const addBookThunk = (bookData: AddBookPayload) => async (dispatch: AppDispatch) => {
try {
    // dispatch(addBookRequest(bookData)); // Optional: for loading state
    const response = await api.createBook(bookData);
    dispatch(addBookSuccess(response.data)); // Assuming API returns the created book
    // You could add navigation or toast notifications here or in the component after success
} catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to add book';
    dispatch(addBookFailure(errorMessage));
}
};

export const updateBookThunk = (bookData: UpdateBookPayload) => async (dispatch: AppDispatch) => {
try {
    // dispatch(updateBookRequest(bookData)); // Optional: for loading state
    const { id, ...dataToUpdate } = bookData;
    const response = await api.updateBook(id, dataToUpdate);
    dispatch(updateBookSuccess(response.data)); // Assuming API returns the updated book
} catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update book';
    dispatch(updateBookFailure(errorMessage));
}
};

export const deleteBookThunk = (bookId: number) => async (dispatch: AppDispatch) => {
try {
    // dispatch(deleteBookRequest({ id: bookId })); // Optional: for loading state
    await api.deleteBook(bookId);
    dispatch(deleteBookSuccess({ id: bookId }));
} catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete book';
    dispatch(deleteBookFailure(errorMessage));
}
};

export const fetchBookByIdThunk = (bookId: number) => async (dispatch: AppDispatch) => {
try {
    // dispatch(fetchBookByIdRequest({ id: bookId })); // Optional: for loading state
    const response = await api.fetchBookById(bookId);
    dispatch(fetchBookByIdSuccess(response.data));
} catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch book details';
    dispatch(fetchBookByIdFailure(errorMessage));
}
};