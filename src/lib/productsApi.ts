import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { API_BASE_URL } from './configs';
import { Product, SearchResults } from '@/components/ProductsPage/types';
import { removeFalsyFromObject } from '@/utils';

export const productsAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    fetchProducts: builder.query<
      SearchResults,
      { page: number; pageSize: number; searchTerms: string }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams(
          removeFalsyFromObject({
            searchSimple: '1',
            action: 'process',
            json: '1',
            page_size: params.pageSize.toString(),
            page: (params.page ?? 1).toString(),
            search_terms: params.searchTerms,
          })
        );
        return `cgi/search.pl?${searchParams.toString()}`;
      },
    }),
    fetchProduct: builder.query<
      {
        code: string;
        product: Product;
      },
      string
    >({
      query: (barcode) => `api/v2/product/${barcode}`,
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  util: { getRunningQueriesThunk },
} = productsAPI;
export const { fetchProduct, fetchProducts } = productsAPI.endpoints;
