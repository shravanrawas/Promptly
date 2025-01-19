import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
