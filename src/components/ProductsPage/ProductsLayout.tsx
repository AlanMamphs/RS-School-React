import { PropsWithChildren, useEffect } from 'react';
import { Search, Pagination } from '@/components';
import { ProductsContainer } from '@/components/ProductsPage';

import { useFetchProductsQuery } from '@/lib/productsApi';
import {
  useSearchTermSelector,
  usePageSizeSelector,
  setSearchTerm,
  setPageSize,
  setPage,
  useSelectedProductSelector,
  usePageSelector,
} from '@/lib/productsSlice';

import { useAppDispatch, useLocalStorage } from '@/lib/hooks';
import { SerializedError } from '@reduxjs/toolkit';

import { useRouter } from 'next/router';

export const ProductsLayout = (props: PropsWithChildren) => {
  const [lSSearchTerm, setLSSearchTerm] = useLocalStorage('search-term', '');

  useEffect(() => {
    dispatch(setSearchTerm(lSSearchTerm as string));
  }, []);

  const searchTerms = useSearchTermSelector();
  const pageSize = usePageSizeSelector();
  const selectedProduct = useSelectedProductSelector();
  const page = usePageSelector();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, error, isLoading, isFetching } = useFetchProductsQuery({
    searchTerms: searchTerms || lSSearchTerm,
    pageSize,
    page,
  });

  const handleSearchClick = (value: string) => {
    setLSSearchTerm(value);
    dispatch(setSearchTerm(value));
    router.push(`/products?page=1`);
  };

  const handlePageSizeChange = (pageSize: number) => {
    dispatch(setPageSize(pageSize));
    dispatch(setPage(1));

    router.query.page = '1';
    router.push(router);
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));

    if (selectedProduct) {
      router.push(`/products`);
    }
  };

  return (
    <div data-testid="products-page">
      <Search initialValue={lSSearchTerm} onSearchClick={handleSearchClick} />
      <div className="flex gap-4">
        <div className="grow">
          <ProductsContainer
            data={data?.products ?? []}
            error={error as SerializedError}
            loading={isLoading || isFetching}
          />
        </div>
        {props.children}
      </div>
      {data?.products && data.count >= pageSize && (
        <Pagination
          onPageChange={handlePageChange}
          currentPage={page}
          onPageSizeChange={handlePageSizeChange}
          totalPages={Math.floor(data.count / pageSize)}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
