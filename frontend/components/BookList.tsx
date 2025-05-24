import React, { useState } from 'react'; // Import useState
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { deleteBookRequest } from '../redux/books/booksSlice';
import ConfirmDialog from './ConfirmDialog'; // Ensure this import is present and correct
import styles from '../styles/BookList.module.css'; // Import CSS Module

// กำหนด Type สำหรับ Book (ควรตรงกับ backend และ Redux state)
export interface Book {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
  createdAt?: string; // Optional, ขึ้นอยู่กับว่าคุณต้องการแสดงหรือไม่
  updatedAt?: string; // Optional
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const openConfirmDialog = (book: Book) => {
    setBookToDelete(book);
    setIsConfirmOpen(true);
  };

  const closeConfirmDialog = () => {
    setBookToDelete(null);
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      dispatch(deleteBookRequest({ id: bookToDelete.id }));
    }
    closeConfirmDialog();
  };

  if (!books || books.length === 0) {
    return <p className={styles.noBooksMessage}>No books available to display.</p>;
  }

  return (
    <>
      <ul className={styles.list}>
        {books.map((book) => (
          <li key={book.id} className={styles.listItem}>
            <h3 className={styles.bookTitle}>{book.title}</h3>
            <p className={styles.bookDetail}>Author: {book.author}</p>
            <p className={styles.bookDetail}>Published Year: {book.publishedYear}</p>
            <div className={styles.actionsContainer}>
              <Link href={`/edit/${book.id}`} passHref>
                <button 
                  className={`${styles.actionButton} ${styles.editButton}`}
                >
                  Edit
                </button>
              </Link>
              <button 
                onClick={() => openConfirmDialog(book)} 
                className={`${styles.actionButton} ${styles.deleteButton}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${bookToDelete?.title || ''}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={closeConfirmDialog}
      />
    </>
  );
};

export default BookList;