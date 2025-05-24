import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchBooksRequest, setPage } from '../redux/books/booksSlice'; // เพิ่ม setPage
import BookList from '../components/BookList';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination'; // Component ใหม่สำหรับ Pagination
import Link from 'next/link'; // สำหรับ Navigation

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  // Provide default values in case state.books is undefined initially
  const {
    list = [], // Default to an empty array
    loading = false,
    error = null,
    page = 1,
    limit = 10,
    totalPages = 0
  } = useSelector(
    (state: RootState) => state.books || {} // Fallback to an empty object if state.books is undefined
  );

  useEffect(() => { 
    dispatch(fetchBooksRequest({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage: number) => {
    if (totalPages && newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage)); // Action นี้จะ trigger useEffect ด้านบนให้ fetch ข้อมูลใหม่
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Book List</h1>
        <Link href="/add" passHref>
          <button style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add New Book
          </button>
        </Link>
      </div>

      {loading && list.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Loader />
        </div>
      )}
      {error && (
        <p style={{ color: 'red', textAlign: 'center', padding: '20px', border: '1px solid red', borderRadius: '4px' }}>
          Error: {error}
        </p>
      )}
      {!loading && list.length === 0 && !error && (
        <p style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>
          No books found.
        </p>
      )}
      {list.length > 0 && <BookList books={list} />}
      
      {typeof totalPages === 'number' && totalPages > 1 && (
        <div style={{ marginTop: '30px' }}>
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