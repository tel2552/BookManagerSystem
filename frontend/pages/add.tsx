import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import BookForm from '../components/BookForm';
import { addBookRequest, AddBookPayload } from '../redux/books/booksSlice';
import { AppDispatch, RootState } from '../redux/store';
import Link from 'next/link';
import Loader from '../components/Loader';
// Toast will be handled by the saga

const AddBookPage: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const router = useRouter();
const {
    loading = false,
    error = null,
    list = [] // Default to an empty array
  } = useSelector((state: RootState) => state.books || {}); // Fallback if state.books is undefined
  const initialBookCount = React.useRef(list.length); // Now list is guaranteed to be an array

const handleSubmit = (data: AddBookPayload) => {
    dispatch(addBookRequest(data));
};

useEffect(() => {
    // Check if a book was successfully added by comparing list length
    // The success toast is now handled by the saga. This effect focuses on redirection.
    if (!loading && !error && list.length > initialBookCount.current) {
      console.log('AddBookPage: Detected list length increase, redirecting...'); // For debugging
      router.push('/'); // Redirect to the book list page
    }
    // Update the ref if the component re-renders for other reasons before success
    initialBookCount.current = list.length;
}, [loading, error, list, router]);

return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Add New Book</h1>
        <Link href="/" passHref>
          <button 
            style={{ 
              padding: '8px 12px', 
              backgroundColor: '#6c757d', // A more neutral color for "back"
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}>Back to List</button>
        </Link>
      </div>
      {error && <p style={{ color: 'white', backgroundColor: '#dc3545', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>Error: {error}</p>}
      <BookForm onSubmit={handleSubmit} isSubmitting={loading} />
      {loading && <div style={{ marginTop: '20px' }}><Loader /></div>}
    </div>
    );
};

export default AddBookPage;