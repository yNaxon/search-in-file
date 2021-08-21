import React from 'react';
import { SearchPage } from '../features/text-search/search-page/search-page';
import { UploadFilePage } from '../features/file-upload/upload-file-page/upload-file-page';
import { useAppSelector } from './hooks';
import './app.scss';

function App() {

  const text = useAppSelector(state => state.textSearch.text);

  if (text) {
    return (
      <SearchPage />
    )
  }

  return (
    <UploadFilePage />
  )
}

export default App;