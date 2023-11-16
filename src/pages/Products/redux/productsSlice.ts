import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { useSelector } from 'react-redux';

export enum ViewMode {
  'products',
  'productDetails',
}

type State = {
  searchTerm: string;
  pageSize: number;
  viewMode: ViewMode;
};

const initialState: State = {
  searchTerm: localStorage.getItem('search-term') ?? '',
  pageSize: 35,
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

    setViewMode: (state, action: PayloadAction<State['viewMode']>) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setPageSize, setSearchTerm, setViewMode } =
  productsSlice.actions;

export default productsSlice.reducer;
export const useSearchTermSelector = () =>
  useSelector((state: RootState) => state.products.searchTerm);

export const usePageSizeSelector = () =>
  useSelector((state: RootState) => state.products.pageSize);

export const useViewModeSelector = () =>
  useSelector((state: RootState) => state.products.viewMode);
