import React from 'react';

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

  // Basic styling - you'll want to improve this
  const paginationStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    margin: '0 5px',
    padding: '8px 12px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    backgroundColor: '#fff',
  };

  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff',
  };

  return (
    <div style={paginationStyle}>
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        style={{
          ...buttonStyle, 
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.6 : 1
        }}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button 
          key={number} 
          onClick={() => onPageChange(number)} 
          style={currentPage === number ? activeButtonStyle : buttonStyle}
        >
          {number}
        </button>
      ))}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        style={{
          ...buttonStyle, 
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.6 : 1
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;