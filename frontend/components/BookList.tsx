import React, { useState } from 'react'; // Import useState
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { deleteBookRequest } from '../redux/books/booksSlice';
import ConfirmDialog from './ConfirmDialog'; // Ensure this import is present and correct

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
    return <p>No books available.</p>;
  }

  return (
    <>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {books.map((book) => (
          <li 
            key={book.id} 
            style={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: '8px',
              margin: '15px 0', 
              padding: '15px 20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              backgroundColor: '#fff'
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '8px', color: '#333' }}>{book.title}</h3>
            <p style={{ margin: '4px 0', color: '#555' }}>Author: {book.author}</p>
            <p style={{ margin: '4px 0', color: '#555' }}>Published Year: {book.publishedYear}</p>
            <div style={{ marginTop: '15px', textAlign: 'right' }}>
              <Link href={`/edit/${book.id}`} passHref>
                <button 
                  style={{ 
                    marginRight: '10px', 
                    padding: '8px 12px', 
                    backgroundColor: '#ffc107', 
                    color: '#212529', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                  }}>Edit</button>
              </Link>
              <button 
                onClick={() => openConfirmDialog(book)} 
                style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}>Delete</button>
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