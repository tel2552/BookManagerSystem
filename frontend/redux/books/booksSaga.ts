// frontend/redux/sagas/booksSaga.ts
import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as bookActions from './booksSlice'; // Import all actions from booksSlice
import * as api from '../../api/books'; // Assuming your api file is in frontend/api/books.ts
import { RootState } from '../store';
import { Book } from './types'; // Import only Book from types.ts
import { toast } from 'react-toastify';
import { FetchBooksSuccessPayload, AddBookPayload, UpdateBookPayload, DeleteBookPayload, FetchBookByIdPayload } from './booksSlice'; // Import payload types from booksSlice.ts


// Define a type for the API response for fetching books, if not already defined in api/books.ts
// This should align with what your backend now returns.
interface ApiFetchBooksResponse {
  books: Book[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

function* handleFetchBooks(action: ReturnType<typeof bookActions.fetchBooksRequest>) {
    try {
        const { page, limit } = action.payload;
        const response: ApiFetchBooksResponse = yield call(api.fetchBooks, page, limit);
        console.log('Saga received response:', response); // <--- เพิ่มบรรทัดนี้
    
        yield put(bookActions.fetchBooksSuccess({
            books: response.books,
            total: response.totalItems,
            totalPages: response.totalPages,
        }));
    } catch (error: any) {
        console.error('Saga fetchBooks error:', error); // <--- เพิ่มบรรทัดนี้
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch books';
        yield put(bookActions.fetchBooksFailure(errorMessage));
        toast.error(errorMessage);
    }
    }
    

function* handleAddBook(action: ReturnType<typeof bookActions.addBookRequest>) {
    try {
        const response: { data: Book } = yield call(api.createBook, action.payload as AddBookPayload);
        yield put(bookActions.addBookSuccess(response.data)); // อัปเดต state ทันที (optimistic)
        toast.success('Book added successfully!');

        // Fetch the current page again to ensure the list is up-to-date
        // This also helps if the new book should appear on the current page
        // or if pagination needs to adjust (e.g., new page created).
        const currentPage: number = yield select((state: RootState) => state.books.page);
        const currentLimit: number = yield select((state: RootState) => state.books.limit);
        yield put(bookActions.fetchBooksRequest({ page: currentPage, limit: currentLimit }));

    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to add book';
        yield put(bookActions.addBookFailure(errorMessage));
        toast.error(errorMessage);
    }
}

function* handleUpdateBook(action: ReturnType<typeof bookActions.updateBookRequest>) {
try {
    const { id, ...data } = action.payload;
    const response: { data: Book } = yield call(api.updateBook, id, data);
    yield put(bookActions.updateBookSuccess(response.data));
    toast.success('Book updated successfully!'); // Add toast for update success
} catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update book';
    yield put(bookActions.updateBookFailure(errorMessage));
    toast.error(errorMessage); // Add toast for update failure
}
}

function* handleDeleteBook(action: ReturnType<typeof bookActions.deleteBookRequest>) {
try {
    yield call(api.deleteBook, action.payload.id);
    yield put(bookActions.deleteBookSuccess({ id: action.payload.id })); // Pass the id for the reducer
    toast.success('Book deleted successfully!'); // Add toast for delete success

    // After deleting, re-fetch the current page to update the list and pagination
    const currentPage: number = yield select((state: RootState) => state.books.page);
    const currentLimit: number = yield select((state: RootState) => state.books.limit);
    yield put(bookActions.fetchBooksRequest({ page: currentPage, limit: currentLimit }));

} catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete book';
    yield put(bookActions.deleteBookFailure(errorMessage));
    toast.error(errorMessage); // Add toast for delete failure
}
}

function* handleFetchBookById(action: ReturnType<typeof bookActions.fetchBookByIdRequest>) {
try {
    // Assuming your api.fetchBookById exists and returns { data: Book }
    const response: { data: Book } = yield call(api.fetchBookById, action.payload.id);
    yield put(bookActions.fetchBookByIdSuccess(response.data));
} catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch book by ID';
    yield put(bookActions.fetchBookByIdFailure(errorMessage));
    toast.error(errorMessage); // Add toast for fetch by ID failure
}
}

export function* watchBooksSaga() {
    yield takeLatest(bookActions.fetchBooksRequest.type, handleFetchBooks);
    yield takeLatest(bookActions.addBookRequest.type, handleAddBook);
    yield takeLatest(bookActions.updateBookRequest.type, handleUpdateBook);
    yield takeLatest(bookActions.deleteBookRequest.type, handleDeleteBook);
    yield takeLatest(bookActions.fetchBookByIdRequest.type, handleFetchBookById);
}
