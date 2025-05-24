import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchBooksRequest, setPage } from '../redux/books/booksSlice';
import BookList from '../components/BookList';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    list = [],
    loading = false,
    error = null,
    page = 1,        // ค่า default จาก Redux state หรือ initial state ของ slice
    limit = 10,       // ค่า default จาก Redux state หรือ initial state ของ slice
    totalPages = 0  // ค่า default จาก Redux state หรือ initial state ของ slice
  } = useSelector(
    (state: RootState) => state.books || { // Fallback เผื่อ state.books ยังไม่มี
      list: [],
      loading: false,
      error: null,
      page: 1,
      limit: 10,
      totalPages: 0,
    }
  );

  useEffect(() => {
    // เรียก fetchBooksRequest เมื่อ page หรือ limit เปลี่ยนแปลง
    dispatch(fetchBooksRequest({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage: number) => {
    // ตรวจสอบว่า newPage อยู่ในขอบเขตของ totalPages
    // totalPages ต้องมีค่าและมากกว่า 0 จึงจะสมเหตุสมผล
    if (totalPages && newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage)); // dispatch action เพื่อเปลี่ยนหน้า
                                  // ซึ่งจะ trigger useEffect ด้านบนให้ fetch ข้อมูลใหม่
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Book List</h1>
        <Link href="/add" passHref>
          <button className={styles.addButton}>
            Add New Book
          </button>
        </Link>
      </div>

      {/* แสดง Loader เมื่อกำลังโหลดและยังไม่มีข้อมูลใน list */}
      {loading && list.length === 0 && (
        <div className={styles.centeredStatus}>
          <Loader />
        </div>
      )}

      {/* แสดงข้อความ Error ถ้ามี */}
      {error && (
        <p className={`${styles.centeredStatus} ${styles.errorText}`}>
          Error: {error}
        </p>
      )}

      {/* แสดงข้อความ "No books found" เมื่อไม่กำลังโหลด, ไม่มี error, และ list ว่าง */}
      {!loading && list.length === 0 && !error && (
        <p className={`${styles.centeredStatus} ${styles.noBooksText}`}>
          No books found.
        </p>
      )}

      {/* แสดง BookList ถ้ามีข้อมูลใน list */}
      {list.length > 0 && <BookList books={list} />}
      
      {/* แสดง Pagination ถ้า totalPages เป็นตัวเลข และมีมากกว่า 1 หน้า */}
      {typeof totalPages === 'number' && totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
