import { vi, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { Product, SearchResults } from '../types';
import { Request } from 'node-fetch';

import '@testing-library/jest-dom/vitest';

// @ts-expect-error Fix issue with missing Request in node environment
global.Request = Request;

const products = ({
  page = 1,
  pageSize = 24,
}: {
  page: number;
  pageSize?: number;
}) =>
  Array.from(Array(pageSize).keys()).map((idx) => ({
    product_name: `Product ${idx + 1 + (page - 1) * pageSize}`,
    code: idx.toString(),
    id: idx.toString(),
    image_front_url: '../assets/react.svg',
    brands: 'Brands for ' + (idx + 1 + (page - 1) * pageSize),
    categories: 'Categories for ' + (idx + 1 + (page - 1) * pageSize),
    countries: 'USA,Ukraine,Israel,Kyrgyzstan',
    nutriments: {
      carbohydrates_100g: '100',
      fat_100g: '100',
      proteins_100g: '100',
      'energy-kcal_100g': '100',
    },
  }));

vi.mock('../app/ApiClient.ts', () => {
  return {
    default: {
      async fetchProducts(
        searchParams: Record<string, string | number>
      ): Promise<SearchResults> {
        const page = Number(searchParams['page'] ?? 1);
        const pageSize = Number(searchParams['page_size'] ?? 24);

        const search = (searchParams['search_terms'] as string) ?? '';

        if (search.startsWith('number_of_products-')) {
          const numberOfProducts = Number(search.split('-')[1]);
          return {
            products: products({ page, pageSize }).slice(0, numberOfProducts),
            page: 1,
            page_count: Math.min(numberOfProducts, 24),
            count: numberOfProducts,
            page_size: pageSize,
          };
        }
        return {
          products: products({ page, pageSize }),
          page: page,
          page_count: pageSize,
          count: 150,
          page_size: pageSize,
        };
      },
      async fetchProduct(code: string): Promise<{
        code: string;
        product: Product | null;
      } | null> {
        return {
          code,
          product:
            products({ page: 1 }).find((product) => product.code === code) ??
            null,
        };
      },
    },
  };
});

beforeEach(() => {
  cleanup();
});
