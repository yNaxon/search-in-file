import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './file-input.module.scss';

export function FileInput({
  className,
  type,
  placeholder = 'Select File',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className={classNames(styles.fileInput, className)}
    >
      {placeholder}
      <input
        type="file"
        className={styles.input}
        {...props}
      />
    </label>
  )
}