import React, { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clearSearch, goToNextMatch, goToPreviousMatch, search } from '../text-search-slice';
import { CloseIcon, ExpandLessIcon, ExpandMoreIcon } from '../../../components/icons/icons';
import styles from './text-search-dialog.module.scss';

export function TextSearchDialog({
  initialFocus = false,
  onClear,
  onNext,
  onPrevious,
  onSearch,
}: TextSearchProps) {

  const textSearchState = useAppSelector(state => state.textSearch);
  const dispatch = useAppDispatch();
  const currentResult = textSearchState.matchingChunksIndices.indexOf(textSearchState.activeChunkIndex)+1;
  const totalResults = textSearchState.matchingChunksIndices.length;
  const searchValue = textSearchState.search || '';
  const displayMeta = textSearchState.search && textSearchState.search.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(search(value))
    if(onSearch) onSearch(value)
  };
  const handleClear = () => {
    dispatch(clearSearch());
    if(onClear) onClear();
  }
  const handleNext = () => {
    dispatch(goToNextMatch());
    if(onNext) onNext();
  }
  const handlePrevious = () => {
    dispatch(goToPreviousMatch());
    if(onPrevious) onPrevious();
  }
  const handleGoToNextOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter" && searchValue.length > 0) {
      handleNext();
    }
  }

  useEffect(() => {
    if(initialFocus) {
      inputRef.current?.focus();
    }
  }, [initialFocus]);

  return (
    <div data-testid="TextSearchDialog" className={styles.textSearchDialog}>
      <div className={styles.inputContainer} onClick={() => inputRef.current?.focus()}>
        <input
          className={styles.input}
          value={searchValue}
          onChange={handleSearch}
          onKeyDown={handleGoToNextOnEnter}
          ref={inputRef}
        />
        {displayMeta && <span className={styles.meta}>{currentResult}/{totalResults}</span>}
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleNext}
          className={styles.iconButton}
          disabled={totalResults === 0}
        >
          <ExpandLessIcon size={16} />
        </button>
        <button
          type="button"
          onClick={handlePrevious}
          className={styles.iconButton}
          disabled={totalResults === 0}
        >
          <ExpandMoreIcon size={16} />
        </button>
        <button
          type="button"
          onClick={handleClear}
          className={styles.iconButton}
        >
          <CloseIcon size={16} />
        </button>
      </div>
    </div>
  )
}

export interface TextSearchProps {
  initialFocus?: boolean;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

