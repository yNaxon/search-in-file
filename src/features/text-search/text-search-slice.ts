import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { indexOfAll } from './utils';

export interface TextSearchState {
  text: string,
  search: string | null,
  matchIndices: number[];
  activeMatchIndex: number;
}

export const initialState: TextSearchState = {
  text: '',
  search: null,
  matchIndices: [],
  activeMatchIndex: 0,
}

export type SearchInTextPayload = string;
export type SearchActionPayload = string;

export const textSearchSlice = createSlice({
  name: 'textSearch',
  initialState: initialState,
  reducers: {
    searchInText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    clearSearch: (state) => {
      state.search = null;
      state.matchIndices = [];
      state.activeMatchIndex = 0;
    },
    search: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload;
      const emptySearch = searchValue.length === 0;

      if (!emptySearch) {
        state.search = action.payload;
        const matchIndices = indexOfAll(searchValue, state.text);
        state.matchIndices = matchIndices;
        state.activeMatchIndex = 0;
      }
    },
    goToNextMatch: (state) => {
      const currentActiveMatchIndexIsLast = state.activeMatchIndex === state.matchIndices.length - 1;
      state.activeMatchIndex = currentActiveMatchIndexIsLast
        ? 0
        : state.activeMatchIndex + 1
    },
    goToPreviousMatch: (state) => {
      const currentActiveMatchIndexIsFirst = state.activeMatchIndex === 0;
      state.activeMatchIndex = currentActiveMatchIndexIsFirst
        ? state.matchIndices.length - 1
        : state.activeMatchIndex - 1;
    },
  },
})

export const { searchInText, search, clearSearch, goToNextMatch, goToPreviousMatch } = textSearchSlice.actions;
export default textSearchSlice.reducer;