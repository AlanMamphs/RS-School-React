import { ChangeEventHandler } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { Search, Pagination } from '../../components';

import { ProductsContainer } from './components';
import { useProductContext } from './context';

export const ProductsPage = () => {
  const [, setSearchParams] = useSearchParams();
  const {
    searchTerm,
    error,
    loading,
    setSearchTerm,
    products,
    paginationData,
    selectedProduct,
    unselectProduct,
  } = useProductContext();

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (input) => {
    setSearchTerm(input.target.value);
  };

  return (
    <div data-testid="products-page">
      <Search
        value={searchTerm}
        onChange={handleSearchChange}
        onSearchClick={() => {
          localStorage.setItem('search-term', searchTerm);
          unselectProduct();
          setSearchParams((params) => {
            params.set('search_terms', searchTerm);
            params.set('page', '1');
            return params;
          });
        }}
      />
      <div className="flex gap-4">
        <div className="grow">
          <ProductsContainer
            data={products ?? []}
            error={error}
            loading={loading}
          />
        </div>
        {selectedProduct && <Outlet />}
      </div>
      {products &&
        paginationData &&
        paginationData.count > paginationData.pageSize && (
          <Pagination
            totalPages={Math.floor(
              paginationData.count / paginationData.pageSize
            )}
            pageSize={paginationData.pageSize}
          />
        )}
    </div>
  );
};
