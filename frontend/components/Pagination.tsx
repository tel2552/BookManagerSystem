import React from 'react';
import styles from '../styles/Pagination.module.css'; // Import CSS Module

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null; // ไม่ต้องแสดง pagination ถ้ามีแค่หน้าเดียวหรือไม่มีเลย
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationContainer}>
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className={`${styles.button} ${styles.prevNextButton}`}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button 
          key={number} 
          onClick={() => onPageChange(number)} 
          className={`${styles.button} ${currentPage === number ? styles.activeButton : ''}`}
        >
          {number}
        </button>
      ))}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className={`${styles.button} ${styles.prevNextButton}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;