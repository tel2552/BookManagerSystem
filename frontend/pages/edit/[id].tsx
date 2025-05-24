import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import BookForm from '../../components/BookForm';
import {
    updateBookRequest,
    UpdateBookPayload,
    fetchBookByIdRequest,
} from '../../redux/books/booksSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Link from 'next/link';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify'; // Removed ToastContainer as it's in _app.tsx
import styles from '../../styles/EditBook.module.css'; // Import CSS Module

const EditBookPage: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const router = useRouter();
const { id } = router.query; // Get the book ID from the URL

const {
    selectedBook,
    loading: booksLoading, // Renaming to avoid conflict if page has its own loading
    error: booksError,
} = useSelector((state: RootState) => state.books);

// Local state to track if an update submission is in progress
const [isSubmitting, setIsSubmitting] = useState(false);
// Local state to track if the initial fetch has been attempted
const [initialFetchAttempted, setInitialFetchAttempted] = useState(false);

// Fetch book data
useEffect(() => {
    if (id && typeof id === 'string') {
        const numericId = parseInt(id, 10);
        // ถ้ามี selectedBook อยู่แล้ว และ ID ตรงกัน ให้ถือว่า fetch สำเร็จแล้ว
        if (selectedBook && selectedBook.id === numericId) {
            if (!initialFetchAttempted) setInitialFetchAttempted(true);
        }
        // ถ้ายังไม่มี selectedBook หรือ ID ไม่ตรง และไม่ได้กำลัง submit และไม่ได้กำลัง loading
        else if ((!selectedBook || selectedBook.id !== numericId) && !isSubmitting && !booksLoading) {
            dispatch(fetchBookByIdRequest({ id: numericId }));
            if (!initialFetchAttempted) setInitialFetchAttempted(true);
        }
    } else if (!id && !initialFetchAttempted) {
        // กรณีไม่มี id ใน query (เช่น URL ผิด) ให้ mark ว่าพยายาม fetch แล้ว
        setInitialFetchAttempted(true);
    }
}, [id, dispatch, selectedBook, booksLoading, isSubmitting, initialFetchAttempted]);

const handleSubmit = (data: Omit<UpdateBookPayload, 'id'>) => {
    if (id && typeof id === 'string') {
        const bookDataToUpdate: UpdateBookPayload = {
            ...data,
            id: parseInt(id, 10),
        };
        setIsSubmitting(true);
        dispatch(updateBookRequest(bookDataToUpdate));
    }
};

// Effect to handle results of API calls (update and fetch errors)
useEffect(() => {
    // Handle update result
    if (isSubmitting && !booksLoading) { // Update operation has finished
        if (!booksError) {
            toast.success('Book updated successfully!');
            router.push('/');
        } else {
            toast.error(`Failed to update book: ${booksError}`);
        }
        setIsSubmitting(false); // Reset submission state
    }
    // Handle initial fetch error (only if not submitting and fetch was attempted)
    else if (!isSubmitting && initialFetchAttempted && !booksLoading && booksError && !selectedBook) {
        toast.error(`Error loading book details: ${booksError}`);
    }
}, [isSubmitting, booksLoading, booksError, router, selectedBook, initialFetchAttempted]);


    // --- Conditional Rendering Logic ---

    // 1. Router is resolving or initial data is being fetched
    if (router.isFallback || (booksLoading && !selectedBook && initialFetchAttempted && !isSubmitting)) {
        return (
            <div className={styles.pageContainer}>
                {/* ToastContainer is now in _app.tsx */}
                <div className={styles.loaderWrapper}>
                    <Loader />
                    <p className={styles.loaderText}>Loading book details...</p>
                </div>
            </div>
        );
    }

    // 2. After fetch attempt: Book not found (no error from backend, selectedBook is null)
    if (initialFetchAttempted && !selectedBook && !booksLoading && !booksError && !isSubmitting) {
        return (
            <div className={styles.pageContainer}>
                <Link href="/">
                    <button className={styles.backButton}>Back to List</button>
                </Link>
                <h1 className={styles.pageHeading}>Edit Book</h1>
                <p className={styles.statusMessage}>Book not found. It might have been deleted or the ID is incorrect.</p>
            </div>
        );
    }

    // 3. After fetch attempt: Error loading book (and not currently trying to submit an update)
    // The toast handles the notification. This provides a UI state.
    if (initialFetchAttempted && !selectedBook && !booksLoading && booksError && !isSubmitting) {
         return (
            <div className={styles.pageContainer}>
                 <Link href="/">
                    <button className={styles.backButton}>Back to List</button>
                </Link>
                <h1 className={styles.pageHeading}>Edit Book</h1>
                <p className={styles.errorMessage}>Failed to load book details. Please try again later.</p>
            </div>
        );
    }

    // 4. If selectedBook is available, show the form
    if (selectedBook) {
        return (
            <div className={styles.pageContainer}>
                <Link href="/">
                    <button className={styles.backButton}>Back to List</button>
                </Link>
                <h1 className={styles.pageHeading}>Edit Book: {selectedBook.title}</h1>
                <BookForm
                    initialData={selectedBook}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting && booksLoading} // Pass submitting state to form
                />
                {isSubmitting && booksLoading && (
                    <div className={styles.loaderWrapper}>
                        <Loader />
                        <p className={styles.loaderText}>Updating book...</p>
                    </div>
                )}
            </div>
        );
    }

    // Fallback: Should ideally not be reached if logic above is comprehensive
    return (
        <div className={styles.pageContainer}>
            <Link href="/">
                <button className={styles.backButton}>Back to List</button>
            </Link>
            <h1 className={styles.pageHeading}>Edit Book</h1>
            <p className={styles.statusMessage}>Unable to display book information. Please check the URL or go back to the list.</p>
        </div>
    );
};

export default EditBookPage;