import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import BookForm from '../../components/BookForm';
import {
    updateBookRequest,
    UpdateBookPayload,
    fetchBookByIdRequest, // Assuming you have this action
} from '../../redux/books/booksSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Link from 'next/link';
import Loader from '../../components/Loader';

const EditBookPage: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const router = useRouter();
const { id } = router.query; // Get the book ID from the URL

const {
    selectedBook,
    loading: booksLoading, // Renaming to avoid conflict if page has its own loading
    error: booksError,
} = useSelector((state: RootState) => state.books);

// Local state to track if the update was successful for redirection
const [updateSuccess, setUpdateSuccess] = useState(false);

useEffect(() => {
    if (id && typeof id === 'string' && !booksLoading) {
        const numericId = parseInt(id, 10);
        // Fetch if:
        // 1. No book is currently selected OR
        // 2. A book is selected, but its ID doesn't match the ID from the route
        if (!selectedBook || selectedBook.id !== numericId) {
            dispatch(fetchBookByIdRequest({ id: numericId }));
        }
    }
}, [id, dispatch, selectedBook, booksLoading]);

const handleSubmit = (data: Omit<UpdateBookPayload, 'id'>) => {
    if (id && typeof id === 'string') {
    const bookDataToUpdate: UpdateBookPayload = {
        ...data,
        id: parseInt(id, 10),
    };
        dispatch(updateBookRequest(bookDataToUpdate));
        setUpdateSuccess(true); // Assume success for now, saga will handle actual success/failure
    }
};

useEffect(() => {
    // Redirect after successful update
    // A more robust way would be to listen to a specific success flag from the updateBookSuccess action
    if (updateSuccess && !booksLoading && !booksError) {
      alert('Book updated successfully!'); // Replace with a toast notification
        router.push('/');
    }
}, [updateSuccess, booksLoading, booksError, router]);

if (router.isFallback || (booksLoading && !selectedBook)) {
    return <Loader />;
}

if (booksError && !selectedBook) {
    return <p style={{ color: 'red' }}>Error loading book: {booksError}</p>;
}

if (!selectedBook && !booksLoading) {
    return <p>Book not found. <Link href="/">Go back to list</Link></p>;
}

return (
    <div>
        <Link href="/">
        <button style={{ marginBottom: '20px' }}>Back to List</button>
        </Link>
        <h1>Edit Book</h1>
        {booksError && <p style={{ color: 'red' }}>Error: {booksError}</p>}
        {selectedBook && (
        <BookForm initialData={selectedBook} onSubmit={handleSubmit} isSubmitting={booksLoading} />
        )}
        {booksLoading && <Loader />}
    </div>
    );
};

export default EditBookPage;