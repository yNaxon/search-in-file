import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { Highlighter } from '../highlighter/highlighter';
import { TextSearchDialog } from '../text-search-dialog/text-search-dialog';
import styles from './search-page.module.scss'

export function SearchPage() {

  const searchState = useAppSelector(state => state.textSearch);
  const hasResults = searchState.matchingChunksIndices.length > 0;
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'f') {
        event.preventDefault();
        setShowSearch(true);
      }
      if(event.key === 'Escape') {
        setShowSearch(false);
      }
    }
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    }
  }, []);

  return (
    <div className={styles.searchPage} data-testid="SearchTextPage">
      <aside className={styles.aside}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            SHERLOCK
          </h1>
          {showSearch && (
            <TextSearchDialog
              initialFocus={true}
              onClear={() => setShowSearch(false)}
            />
          )}
        </div>
      </aside>
      <main className={styles.main}>
        {
          searchState.search && hasResults ? (
            <Highlighter />
          ) : searchState.text
        }
      </main>
    </div>
  );
}