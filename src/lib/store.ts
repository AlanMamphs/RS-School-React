import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsAPI } from './productsApi';
import { createWrapper } from 'next-redux-wrapper';
import productsReducer from './productsSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      [productsAPI.reducerPath]: productsAPI.reducer,
      products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsAPI.middleware),
  });

export const store = createStore();

setupListeners(store.dispatch);

export const wrapper = createWrapper<ReturnType<typeof createStore>>(
  createStore,
  {}
);
