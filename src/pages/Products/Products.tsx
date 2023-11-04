import { ChangeEventHandler } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { Search, Pagination } from '../../components';

import { ProductsContainer } from './components';
import { useProductContext } from './context';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    searchTerm,
    error,
    loading,
    setSearchTerm,
    products,
    paginationData,
    selectedProduct,
    fetchProducts,
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
          if (!searchParams.get('page') || searchParams.get('page') === '1') {
            fetchProducts();
          } else {
            setSearchParams({
              page: '1',
            });
          }
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
          />
        )}
    </div>
  );
};
