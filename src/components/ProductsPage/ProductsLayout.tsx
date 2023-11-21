import { PropsWithChildren, useEffect } from 'react';
import { Search, Pagination } from '@/components';
import { ProductsContainer } from '@/components/ProductsPage';

import { useFetchProductsQuery } from '@/lib/productsApi';
import {
  useSearchTermSelector,
  usePageSizeSelector,
  setSearchTerm,
  setPageSize,
} from '@/lib/productsSlice';

import { useAppDispatch, useLocalStorage } from '@/lib/hooks';
import { SerializedError } from '@reduxjs/toolkit';

import { useSearchParams, useParams } from 'next/navigation';
import { useRouter } from 'next/router';

export const ProductsLayout = (props: PropsWithChildren) => {
  const { id } = useParams() ?? {};
  const [lSSearchTerm, setLSSearchTerm] = useLocalStorage('search-term', '');

  useEffect(() => {
    dispatch(setSearchTerm(lSSearchTerm));
  }, []);

  const searchParams = useSearchParams();
  const searchTerms = useSearchTermSelector();
  const pageSize = usePageSizeSelector();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, error, isLoading, isFetching } = useFetchProductsQuery({
    searchTerms: searchTerms || lSSearchTerm,
    pageSize,
    page: Number(searchParams.get('page') ?? '1'),
  });

  const handleSearchClick = (value: string) => {
    setLSSearchTerm(value);
    dispatch(setSearchTerm(value));
    router.push(`/products?page=1`);
  };

  const handlePageSizeChange = (pageSize: number) => {
    dispatch(setPageSize(pageSize));
    router.query.page = '1';
    router.push(router);
  };

  const handlePageChange = (page: number) => {
    if (!id) {
      router.query.page = page.toString();
      router.push(router);
    } else {
      router.push(`/products?page=${page.toString()}`);
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
          currentPage={Number(searchParams.get('page') ?? '1')}
          onPageSizeChange={handlePageSizeChange}
          totalPages={Math.floor(data.count / pageSize)}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
