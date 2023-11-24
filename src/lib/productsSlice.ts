import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from './hooks';

export enum ViewMode {
  'products',
  'productDetails',
}

type State = {
  searchTerms: string;
  pageSize: number;
  page: number;
  viewMode: ViewMode | null;
  selectedProduct: null | string;
  isProductListLoading: boolean;
};

const initialState: State = {
  searchTerms: '',
  pageSize: 35,
  page: 1,
  selectedProduct: null,
  viewMode: null,
  isProductListLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<State['searchTerms']>) => {
      state.searchTerms = action.payload;
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
    setProductListLoading: (
      state,
      action: PayloadAction<State['isProductListLoading']>
    ) => {
      state.isProductListLoading = action.payload;
    },
  },
});

export const {
  setPageSize,
  setPage,
  setSearchTerm,
  setViewMode,
  setSelectedProduct,
  setProductListLoading,
} = productsSlice.actions;

export default productsSlice.reducer;
export const useSearchTermSelector = () =>
  useAppSelector((state) => state.products.searchTerms);

export const usePageSelector = () =>
  useAppSelector(({ products }) => products.page);

export const usePageSizeSelector = () =>
  useAppSelector(({ products }) => products.pageSize);

export const useViewModeSelector = () =>
  useAppSelector(({ products }) => products.viewMode);

export const useSelectedProductSelector = () =>
  useAppSelector(({ products }) => products.selectedProduct);
