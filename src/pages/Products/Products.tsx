import {
  Outlet,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Search, Pagination } from '../../components';
import { useFetchProductsQuery } from '../../services/products';

import { ProductsContainer } from './components';

import {
  setSearchTerm,
  useSearchTermSelector,
  setPageSize,
  usePageSizeSelector,
} from './redux/productsSlice';
import { SerializedError } from '@reduxjs/toolkit';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerms = useSearchTermSelector();
  const pageSize = usePageSizeSelector();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, error, isLoading, isFetching } = useFetchProductsQuery({
    searchTerms: searchTerms || (localStorage.getItem('search-term') ?? ''),
    pageSize,
    page: Number(searchParams.get('page') ?? '1'),
  });

  const handleSearchClick = (value: string) => {
    localStorage.setItem('search-term', value);
    dispatch(setSearchTerm(value));

    navigate('/products');
    setSearchParams((params) => {
      params.set('page', '1');
      return params;
    });
  };

  const handlePageSizeChange = (pageSize: number) => {
    dispatch(setPageSize(pageSize));
    setSearchParams((params) => {
      params.set('page', '1');
      return params;
    });
  };

  return (
    <div data-testid="products-page">
      <Search
        initialValue={localStorage.getItem('search-term') ?? ''}
        onSearchClick={handleSearchClick}
      />
      <div className="flex gap-4">
        <div className="grow">
          <ProductsContainer
            data={data?.products ?? []}
            error={error as SerializedError}
            loading={isLoading || isFetching || navigation.state === 'loading'}
          />
        </div>
        <Outlet />
      </div>
      {data?.products && data.count >= pageSize && (
        <Pagination
          onPageSizeChange={handlePageSizeChange}
          totalPages={Math.floor(data.count / pageSize)}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
