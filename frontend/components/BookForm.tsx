// frontend/components/BookForm.tsx
import React, { useState, useEffect } from 'react';
import styles from '../styles/BookForm.module.css'; // Import CSS Module
// สมมติ BookFormData คือ type ของข้อมูลใน form
interface BookFormData {
  title: string;
  author: string;
  publishedYear: number; // หรือ string แล้วแปลง
}
interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => void;
  isSubmitting?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ initialData, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    publishedYear: new Date().getFullYear(),
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'publishedYear' ? parseInt(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="publishedYear">Published Year:</label>
        <input type="number" id="publishedYear" name="publishedYear" value={formData.publishedYear} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
        {isSubmitting ? 'Submitting...' : (initialData ? 'Update Book' : 'Add Book')}
      </button>
    </form>
  );
};
export default BookForm;
