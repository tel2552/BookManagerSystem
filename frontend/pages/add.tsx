import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import BookForm from '../components/BookForm';
import { addBookRequest, AddBookPayload } from '../redux/books/booksSlice';
import { AppDispatch, RootState } from '../redux/store';
import Link from 'next/link';
import Loader from '../components/Loader';
import styles from '../styles/AddBook.module.css';

const AddBookPage: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const router = useRouter();
const {
    loading = false,
    error = null,
    list = []
  } = useSelector((state: RootState) => state.books || {});
  const initialBookCount = React.useRef(list.length); //list to be an array

const handleSubmit = (data: AddBookPayload) => {
    dispatch(addBookRequest(data));
};

useEffect(() => {
    // Check if a book was successfully added by comparing list length
    if (!loading && !error && list.length > initialBookCount.current) {
      console.log('AddBookPage: Detected list length increase, redirecting...'); // For debugging
      router.push('/');
    }
    initialBookCount.current = list.length;
}, [loading, error, list, router]);

return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h1 className={styles.pageHeading}>Add New Book</h1>
          <Link href="/" passHref>
            <button className={styles.backButton}>Back to List</button>
          </Link>
        </div>
        {error && <p className={styles.errorMessage}>Error: {error}</p>}
        <BookForm onSubmit={handleSubmit} isSubmitting={loading && !error} /> {/* Pass isSubmitting based on loading and no error */}
      </div>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loaderWrapperInOverlay}> {/*for styling the loader box */}
            <Loader />
          </div>
        </div>
      )}
    </>
    );
};
export default AddBookPage;