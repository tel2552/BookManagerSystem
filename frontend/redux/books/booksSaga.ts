// frontend/redux/sagas/booksSaga.ts
import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as bookActions from './booksSlice'; // Import all actions from booksSlice
import * as api from '../../api/books'; // Assuming your api file is in frontend/api/books.ts
import { RootState } from '../store';
import { Book } from './types'; // Import only Book from types.ts
import { toast } from 'react-toastify';
import { FetchBooksSuccessPayload, AddBookPayload, UpdateBookPayload, DeleteBookPayload, FetchBookByIdPayload } from './booksSlice'; // Import payload types from booksSlice.ts


// Define a type for the API response for fetching books, if not already defined in api/books.ts
// This should align with what your backend returns and what FetchBooksSuccessPayload expects
// interface ApiFetchBooksResponse { // This might not be needed if response.data is directly Book[]
//   data: { 
//     books: Book[];
//     total?: number;
//     totalPages?: number;
//     }
// }

function* handleFetchBooks(action: ReturnType<typeof bookActions.fetchBooksRequest>) {
try {
    const { page, limit } = action.payload;
    // Assuming api.fetchBooks returns an AxiosResponse where response.data is Book[]
    // and total count might be in headers like 'x-total-count'
    const response: { data: Book[]; headers?: { [key: string]: string } } = yield call(api.fetchBooks, page, limit);
    const totalCount = response.headers && response.headers['x-total-count'] ? parseInt(response.headers['x-total-count'], 10) : response.data.length; // Fallback if no header
    yield put(bookActions.fetchBooksSuccess({ books: response.data, total: totalCount }));
} catch (error: any) {
    yield put(bookActions.fetchBooksFailure(error.response?.data?.message || error.message || 'Failed to fetch books'));
}
}

function* handleAddBook(action: ReturnType<typeof bookActions.addBookRequest>) {
    try {
      const response: { data: Book } = yield call(api.createBook, action.payload as AddBookPayload);
      yield put(bookActions.addBookSuccess(response.data)); // อัปเดต state ทันที (optimistic)
      toast.success('Book added successfully!');
  
      // ดึงข้อมูลหนังสือหน้าปัจจุบันอีกครั้งเพื่อให้แน่ใจว่าข้อมูลล่าสุด
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
} catch (error: any) {
    yield put(bookActions.updateBookFailure(error.response?.data?.message || error.message || 'Failed to update book'));
}
}

function* handleDeleteBook(action: ReturnType<typeof bookActions.deleteBookRequest>) {
try {
    yield call(api.deleteBook, action.payload.id);
    yield put(bookActions.deleteBookSuccess({ id: action.payload.id })); // Pass the id for the reducer
} catch (error: any) {
    yield put(bookActions.deleteBookFailure(error.response?.data?.message || error.message || 'Failed to delete book'));
}
}

function* handleFetchBookById(action: ReturnType<typeof bookActions.fetchBookByIdRequest>) {
try {
    // Assuming your api.fetchBookById exists and returns { data: Book }
    // If not, you'll need to add it to frontend/api/books.ts:
    // export const fetchBookById = (id: number) => api.get(`/books/${id}`);
    const response: { data: Book } = yield call(api.fetchBookById, action.payload.id);
    yield put(bookActions.fetchBookByIdSuccess(response.data));
} catch (error: any) {
    yield put(bookActions.fetchBookByIdFailure(error.response?.data?.message || error.message || 'Failed to fetch book by ID'));
}
}

export function* watchBooksSaga() {
    yield takeLatest(bookActions.fetchBooksRequest.type, handleFetchBooks);
    yield takeLatest(bookActions.addBookRequest.type, handleAddBook);
    yield takeLatest(bookActions.updateBookRequest.type, handleUpdateBook);
    yield takeLatest(bookActions.deleteBookRequest.type, handleDeleteBook);
    yield takeLatest(bookActions.fetchBookByIdRequest.type, handleFetchBookById);
}
