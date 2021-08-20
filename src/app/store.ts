import { configureStore } from '@reduxjs/toolkit'
import textSearchReducer from '../features/text-search/text-search-slice';

const store = configureStore({
  reducer: {
    textSearch: textSearchReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;