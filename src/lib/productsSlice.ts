import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './storeTypes';
import { useSelector } from 'react-redux';

export enum ViewMode {
  'products',
  'productDetails',
}

type State = {
  searchTerm: string;
  pageSize: number;
  page: number;
  viewMode: ViewMode;
  selectedProduct: null | string;
};

const initialState: State = {
  searchTerm: '',
  pageSize: 35,
  page: 1,
  selectedProduct: null,
  viewMode: ViewMode.products,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<State['searchTerm']>) => {
      state.searchTerm = action.payload;
    },
    setPageSize: (state, action: PayloadAction<State['pageSize']>) => {
      state.pageSize = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setViewMode: (state, action: PayloadAction<State['viewMode']>) => {
      state.viewMode = action.payload;
    },
    setSelectedProduct: (
      state,
      action: PayloadAction<State['selectedProduct']>
    ) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  setPageSize,
  setPage,
  setSearchTerm,
  setViewMode,
  setSelectedProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
export const useSearchTermSelector = () =>
  useSelector((state: RootState) => state.products.searchTerm);

export const usePageSelector = () =>
  useSelector((state: RootState) => state.products.page);

export const usePageSizeSelector = () =>
  useSelector((state: RootState) => state.products.pageSize);

export const useViewModeSelector = () =>
  useSelector((state: RootState) => state.products.viewMode);

export const useSelectedProductSelector = () =>
  useSelector((state: RootState) => state.products.selectedProduct);
