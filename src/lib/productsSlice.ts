import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from './hooks';

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
  useAppSelector((state) => state.products.searchTerm);

export const usePageSelector = () =>
  useAppSelector(({ products }) => products.page);

export const usePageSizeSelector = () =>
  useAppSelector(({ products }) => products.pageSize);

export const useViewModeSelector = () =>
  useAppSelector(({ products }) => products.viewMode);

export const useSelectedProductSelector = () =>
  useAppSelector(({ products }) => products.selectedProduct);
