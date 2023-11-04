import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { Product, SearchResults } from '../types';
import { Request } from 'node-fetch';

import '@testing-library/jest-dom/vitest';

// @ts-expect-error Fix issue with missing Request in node environment
global.Request = Request;

const products = (page: number = 1) =>
  Array.from(Array(24).keys()).map((idx) => ({
    product_name: `Product ${idx + 1 + (page - 1) * 24}`,
    code: idx.toString(),
    id: idx.toString(),
    image_front_url: '../assets/react.svg',
    brands: 'Brands for ' + (idx + 1 + (page - 1) * 24),
    categories: 'Categories for ' + (idx + 1 + (page - 1) * 24),
  }));

vi.mock('../app/ApiClient.ts', () => {
  return {
    default: {
      async fetchProducts(
        searchParams: Record<string, string | number>
      ): Promise<SearchResults> {
        const page = Number(searchParams['page'] ?? 1);
        const search = (searchParams['search_terms'] as string) ?? '';

        if (search.startsWith('number_of_products-')) {
          return {
            products: products().slice(0, Number(search.split('-')[1])),
            page: 1,
            page_count: Number(search.split('-')[1]),
            count: Number(search.split('-')[1]),
            page_size: 24,
          };
        }
        return {
          products: products(page),
          page: page,
          page_count: 24,
          count: 100,
          page_size: 24,
        };
      },
      async fetchProduct(code: string): Promise<{
        code: string;
        product: Product | null;
      } | null> {
        return {
          code,
          product: products(1).find((product) => product.code === code) ?? null,
        };
      },
    },
  };
});

beforeEach(() => {
  cleanup();
});
