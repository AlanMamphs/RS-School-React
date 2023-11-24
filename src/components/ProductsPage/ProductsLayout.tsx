import { PropsWithChildren } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';

import { Search, Pagination } from '@/components';
import { ProductsContainer } from '@/components/ProductsPage';

import { useFetchProductsQuery } from '@/lib/productsApi';

import { skipToken } from '@reduxjs/toolkit/query';
import { useAppDispatch } from '@/lib/hooks';
import {
  ViewMode,
  setPage,
  setPageSize,
  setSearchTerm,
  setSelectedProduct,
  setViewMode,
  useSelectedProductSelector,
  useViewModeSelector,
} from '@/lib/productsSlice';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';

export const ProductsLayout = (props: PropsWithChildren) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = router.query;
  const searchTerms = (router.query.searchTerms as string) ?? '';

  const page = Number(router.query.page ?? '1');
  const pageSize = Number(router.query.pageSize ?? DEFAULT_PAGE_SIZE);

  const { data, error } = useFetchProductsQuery(
    router.isFallback
      ? skipToken
      : {
          searchTerms,
          pageSize,
          page,
        },
    { skip: router.isFallback }
  );

  const viewMode = useViewModeSelector();
  const selectedProduct = useSelectedProductSelector();

  const preNavigation = () => {
    if (id) {
      delete router.query.id;
      router.pathname = '/products';
    }
    router.query.page = '1';
    dispatch(setPage(1));
  };
  const handleSearchClick = (value: string) => {
    dispatch(setSearchTerm(value));
    preNavigation();

    router.query.searchTerms = value;
    router.push(router);
  };

  const handlePageSizeChange = (pageSize: number) => {
    preNavigation();

    router.query.pageSize = pageSize.toString();
    dispatch(setPageSize(pageSize));
    router.push(router);
  };

  const handlePageChange = (pageNumber: number) => {
    preNavigation();

    router.query.page = pageNumber.toString();
    dispatch(setPage(pageNumber));
    if (id) {
      router.pathname = '/products';
    }
    router.push(router);
  };

  const handleProductSelected = (productId: string) => {
    if (viewMode === ViewMode.productDetails && selectedProduct === productId) {
      dispatch(setViewMode(ViewMode.products));
      dispatch(setSelectedProduct(null));
      delete router.query.id;
      router.pathname = `/products`;
    } else {
      dispatch(setViewMode(ViewMode.productDetails));
      dispatch(setSelectedProduct(productId));
      router.query.id = productId;

      router.pathname = `/products/${productId}`;
    }
    router.push(router);
  };

  return (
    <div data-testid="products-page">
      <Search
        initialValue={(searchTerms as string) ?? ''}
        onSearchClick={handleSearchClick}
      />
      <div className="flex gap-4">
        <div className="grow">
          <ProductsContainer
            data={data?.products ?? []}
            error={error as SerializedError}
            onCardClick={handleProductSelected}
          />
        </div>
        {viewMode === ViewMode.productDetails && props.children}
      </div>
      {data?.products &&
        data.count >= Number(pageSize ?? DEFAULT_PAGE_SIZE) && (
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
