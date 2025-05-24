import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import booksReducer from './books/booksSlice';
import { watchBooksSaga as rootSaga } from './books/booksSaga'; // Import and alias

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  middleware: (getDefault) => getDefault().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;