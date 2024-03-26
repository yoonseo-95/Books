import {Action, ThunkAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import bookSlice from '../reducers/bookSlice';
import {saveToLocalStorage,loadFromLocalStorage } from '../localStorageUtils';
import mainBooksSlice from './../reducers/mainBooksSlice';
import rcmdBooksSlice from '../reducers/rcmdBooksSlice';
import bookmarkSlice from '../reducers/bookmarkSlice';

const preloadedState = loadFromLocalStorage();

const rootReducer = combineReducers({
  books: bookSlice,
  mainBooks : mainBooksSlice,
  rcmdBooks: rcmdBooksSlice,
  bookmark: bookmarkSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
})

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
