import React from 'react';

const Loader: React.FC = () => {
  // Basic styling for the loader - you can customize this extensively
  const loaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontSize: '1.2em',
    color: '#555',
  };

  return (
    <div style={loaderStyle}>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;