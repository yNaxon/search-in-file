import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { indexOfAll, splitText } from './utils';

export interface TextSearchState {
  text: string,
  textChunks: string[];
  search: string | null,
  matchingChunksIndices: number[];
  activeChunkIndex: number;
}

export const initialState: TextSearchState = {
  text: '',
  textChunks: [],
  search: null,
  matchingChunksIndices: [],
  activeChunkIndex: -1,
}

export type SearchInTextPayload = string;
export type SearchActionPayload = string;

export const textSearchSlice = createSlice({
  name: 'textSearch',
  initialState: initialState,
  reducers: {
    searchInText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
      state.textChunks = [action.payload];
    },
    clearSearch: (state) => {
      state.search = null;
      state.textChunks = [state.text];
      state.matchingChunksIndices = [];
      state.activeChunkIndex = -1;
    },
    search: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload;
      const emptySearch = searchValue.length === 0;
      if (emptySearch) {
        state.search = null;
        state.textChunks = [state.text];
        state.matchingChunksIndices = [];
        state.activeChunkIndex = -1;
      }
      else {
        const textChunks = splitText(searchValue, state.text, indexOfAll(searchValue, state.text));
        const matchIndices = textChunks.reduce(((indices, chunk, index) =>
          chunk.toLowerCase() === searchValue.toLowerCase()
            ? [...indices, index]
            : indices),
          [] as number[]
        );
        const activeChunkIndex = matchIndices.length === 0
          ? -1
          : matchIndices[0];

        state.search = searchValue;
        state.textChunks = textChunks;
        state.matchingChunksIndices = matchIndices;
        state.activeChunkIndex = activeChunkIndex;
      }
    },
    goToNextMatch: (state) => {
      const currentMatchIndex = state.matchingChunksIndices.indexOf(state.activeChunkIndex);
      const currentActiveChunkIsLast = currentMatchIndex === state.matchingChunksIndices.length-1;
      const firstMatchIndex = state.matchingChunksIndices[0];
      const nextMatchIndex = state.matchingChunksIndices[currentMatchIndex+1];

      state.activeChunkIndex = currentActiveChunkIsLast
        ? firstMatchIndex
        : nextMatchIndex;
    },
    goToPreviousMatch: (state) => {
      const currentMatchIndex = state.matchingChunksIndices.indexOf(state.activeChunkIndex);
      const currentActiveChunkIsFirst = currentMatchIndex === 0;
      const lastMatchIndex = state.matchingChunksIndices[state.matchingChunksIndices.length-1];
      const previousMatchIndex = state.matchingChunksIndices[currentMatchIndex-1];

      state.activeChunkIndex = currentActiveChunkIsFirst
        ? lastMatchIndex
        : previousMatchIndex;
    },
  },
})

export const { searchInText, search, clearSearch, goToNextMatch, goToPreviousMatch } = textSearchSlice.actions;
export default textSearchSlice.reducer;