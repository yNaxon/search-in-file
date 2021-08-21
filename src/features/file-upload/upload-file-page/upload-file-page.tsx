import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { searchInText } from '../../text-search/text-search-slice';
import { FileInput } from '../../../components/file-input/file-input';
import { formatBytes } from '../utils';
import styles from './upload-file-page.module.scss';

const maxFileSizeInBytes = 1024 * 50; // 50kB

export function UploadFilePage() {

  const dispatch = useAppDispatch();
  const [validationError, setValidationError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      setValidationError(null);
      const file = event.target.files ? event.target.files[0] : null;

      if (!file) {
        throw new Error('Please select a file')
      }
      if (file.size > maxFileSizeInBytes) {
        throw new Error(`Maximum file size is ${formatBytes(maxFileSizeInBytes)}. You tried: ${formatBytes(file.size)}`);
      }

      const text = await file.text();
      dispatch(searchInText(text));
    } catch (error) {
      setLoading(false);
      setValidationError(error.message);
    }
  };

  return (
    <div className={styles.uploadFilePage}>
      <main>
        <h1 className={styles.title}>
          SHERLOCK
        </h1>
        <div className={styles.subtitle}>find text in file*</div>
        {
          <FileInput
            className={styles.uploadInput}
            onChange={handleUpload}
            placeholder={loading ? 'Loading...' : 'select file'}
            disabled={loading}
          />
        }
        {validationError ? (
          <div className={styles.error}>
            {validationError}
          </div>
        ) : (
          <div>
            * file size limit – up to 50 KB
          </div>
        )}
      </main>
    </div>
  )
}