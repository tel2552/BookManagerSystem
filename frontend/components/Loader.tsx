import React from 'react';
import styles from '../styles/Loader.module.css'; // Import CSS Module

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default Loader;