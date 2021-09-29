import React from 'react';
import { SearchPage } from '../search-page/search-page';
import { screen, render, fireEvent } from '../../../test-utils';
import userEvent from '@testing-library/user-event'

it('renders without crashing', () => {
  render(<SearchPage />)
});

it('shows search dialog on cmd f', () => {
  render(<SearchPage />);
  fireEvent.keyDown(document, { key: 'f', code: 'f', metaKey: true })
  
  expect(screen.queryByTestId('TextSearchDialog')).toBeInTheDocument(); 
});

it('shows search dialog on ctrl f', () => {
  render(<SearchPage />);
  fireEvent.keyDown(document, { key: 'f', code: 'f', ctrlKey: true });

  expect(screen.queryByTestId('TextSearchDialog')).toBeInTheDocument(); 
});

it('hides search dialog on escape', () => {
  render(<SearchPage />);
  fireEvent.keyDown(document, { key: 'f', code: 'f', ctrlKey: true });
  fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
  
  expect(screen.queryByTestId('TextSearchDialog')).not.toBeInTheDocument(); 
});

it('highlights matching text on search', () => {
  const { getByRole, getAllByRole } = render(<SearchPage />, {
    preloadedState: {
      textSearch: {
        text: 'Lorem ipsum sit dolor des amet.',
        textChunks: ['Lorem ipsum sit dolor des amet.'],
        search: null,
        matchingChunksIndices: [],
        activeChunkIndex: -1,
      }
    }
  });

  fireEvent.keyDown(document, { key: 'f', code: 'f', ctrlKey: true });
  const input = getByRole('textbox');
  userEvent.type(input, 'lo');

  expect(getAllByRole('mark')).toHaveLength(2);
});

it('highlights case insensitive matches on search', () => {
  const { getByRole, getAllByRole } = render(<SearchPage />, {
    preloadedState: {
      textSearch: {
        text: 'Lorem ipsum sit dolor des amet.',
        textChunks: ['Lorem ipsum sit dolor des amet.'],
        search: null,
        matchingChunksIndices: [],
        activeChunkIndex: -1,
      }
    }
  });

  fireEvent.keyDown(document, { key: 'f', code: 'f', ctrlKey: true });
  const input = getByRole('textbox');
  userEvent.type(input, 'Lo');

  expect(getAllByRole('mark')).toHaveLength(2);
});