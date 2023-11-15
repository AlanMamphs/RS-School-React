import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, SearchResults } from '../types';
import { API_BASE_URL } from '../app/configs';
import { removeFalsyFromObject } from '../utils';

export const productsApi = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
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

export const { useFetchProductsQuery, useFetchProductQuery } = productsApi;
