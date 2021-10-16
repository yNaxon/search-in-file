import { Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import textSearchReducer from '../features/text-search/text-search-slice';


const logger: Middleware= store => next => action => {
  console.group(action.type);
  console.info('dispatching', action)

  const result = next(action);
  
  console.info('next state', store.getState());
  console.groupEnd();

  return result
}

const store = configureStore({
  reducer: {
    textSearch: textSearchReducer,
  },
  middleware: [logger]
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;