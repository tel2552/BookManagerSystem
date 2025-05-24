import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BooksState, Book } from './types';

// เพิ่ม type สำหรับ payload ของ action ต่างๆ เพื่อความชัดเจน
export interface FetchBooksPayload { page: number; limit: number; }
export interface FetchBooksSuccessPayload { books: Book[]; total?: number; totalPages?: number; } // total หรือ totalPages อาจจะถูกส่งมาจาก API
export interface AddBookPayload extends Omit<Book, 'id'> {} // ข้อมูลสำหรับสร้างหนังสือใหม่ (ไม่ต้องมี id)
export interface UpdateBookPayload extends Book {} // ข้อมูลสำหรับอัปเดตหนังสือ (ต้องมี id)
export interface DeleteBookPayload { id: number; } // id ของหนังสือที่จะลบ
export interface FetchBookByIdPayload { id: number; } // Payload for fetching a single book

const initialState: BooksState = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  selectedBook: null, // Initialize selectedBook
};
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksRequest(state, action: PayloadAction<{ page: number; limit: number }>) {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess(state, action: PayloadAction<FetchBooksSuccessPayload>) {
      state.loading = false;
      state.list = action.payload.books;
      if (action.payload.total !== undefined) {
        state.total = action.payload.total;
        state.totalPages = Math.ceil(action.payload.total / state.limit);
      } else if (action.payload.totalPages !== undefined) {
        state.totalPages = action.payload.totalPages;
      }
    },
    fetchBooksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add Book
    addBookRequest(state, action: PayloadAction<AddBookPayload>) {
      state.loading = true;
      state.error = null;
    },
    addBookSuccess(state, action: PayloadAction<Book>) {
      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      state.loading = false;
      // การ unshift เหมาะสำหรับการแสดงผลทันที แต่การ re-fetch จาก saga จะทำให้ข้อมูลตรงกับ server
      // คุณอาจจะเลือกที่จะ unshift หรือรอ re-fetch อย่างเดียวก็ได้
      // ถ้า unshift แล้ว re-fetch อาจจะเห็นการกระพริบเล็กน้อยถ้าข้อมูลไม่ตรงกัน
      // เพื่อความง่าย อาจจะให้ re-fetch เป็นตัวหลักในการอัปเดต list หลัง add
      // state.list.unshift(action.payload); // <--- พิจารณาว่าจะยังคง unshift หรือไม่

      if (typeof state.total === 'number') {
        state.total += 1;
      } else {
        state.total = 1;
      }
      if (typeof state.limit === 'number' && state.limit > 0 && typeof state.total === 'number') {
        state.totalPages = Math.ceil(state.total / state.limit);
      } else {
        state.totalPages = state.total > 0 ? 1 : 0;
      }
    },

    addBookFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Book
    updateBookRequest(state, action: PayloadAction<UpdateBookPayload>) {
      state.loading = true;
      state.error = null;
    },
    updateBookSuccess(state, action: PayloadAction<Book>) { // สมมติว่า API คืน book ที่อัปเดตแล้ว
      state.loading = false;
      const index = state.list.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    updateBookFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Book
    deleteBookRequest(state, action: PayloadAction<DeleteBookPayload>) { // รับ id ของหนังสือที่จะลบ
      state.loading = true;
      state.error = null;
    },
    deleteBookSuccess(state, action: PayloadAction<DeleteBookPayload>) { // รับ id ของหนังสือที่ถูกลบสำเร็จ
      state.loading = false;
      state.list = state.list.filter(book => book.id !== action.payload.id);
      if (state.total !== undefined) {
        state.total -= 1;
      }
    },
    deleteBookFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch Book By ID
    fetchBookByIdRequest(state, action: PayloadAction<FetchBookByIdPayload>) {
      state.loading = true;
      state.error = null;
      state.selectedBook = null; // Clear previous selection or ensure it's reset
    },
    fetchBookByIdSuccess(state, action: PayloadAction<Book>) {
      state.loading = false;
      state.selectedBook = action.payload;
    },
    fetchBookByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.selectedBook = null; // Clear selected book on failure
    },

    // Pagination
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    }
  },
});

export const { fetchBooksRequest, fetchBooksSuccess, fetchBooksFailure, addBookRequest, addBookSuccess, addBookFailure, updateBookRequest, updateBookSuccess, updateBookFailure, deleteBookRequest, deleteBookSuccess, deleteBookFailure, fetchBookByIdRequest, fetchBookByIdSuccess, fetchBookByIdFailure, setPage, setLimit } = booksSlice.actions;
export default booksSlice.reducer;