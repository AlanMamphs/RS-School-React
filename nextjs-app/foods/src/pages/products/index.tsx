import { useDispatch } from 'react-redux';

import { Search, Pagination } from '@/components';
import { ProductsContainer } from '@/components/ProductsPage';

import { useFetchProductsQuery } from '@/lib/productsApi';
import { useAppDispatch, useLocalStorage } from '@/lib/hooks';

// import {
//   setSearchTerm,
//   useSearchTermSelector,
//   setPageSize,
//   usePageSizeSelector,
// } from './redux/productsSlice';
// import { SerializedError } from '@reduxjs/toolkit';

export const ProductsPage = () => {
  const [lSSearchTerm, setLSSearchTerm] = useLocalStorage('search-term', '');
  // const [searchParams, setSearchParams] = useSearchParams();
  // const searchTerms = useSearchTermSelector();
  // const pageSize = usePageSizeSelector();
  // const navigation = useNavigation();
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, error, isLoading, isFetching } = useFetchProductsQuery({
    searchTerms: searchTerms || (localStorage.getItem('search-term') ?? ''),
    pageSize,
    page: Number(searchParams.get('page') ?? '1'),
  });

  // const handleSearchClick = (value: string) => {
  //   localStorage.setItem('search-term', value);
  //   dispatch(setSearchTerm(value));

  //   navigate('/products');
  //   setSearchParams((params) => {
  //     params.set('page', '1');
  //     return params;
  //   });
  // };

  // const handlePageSizeChange = (pageSize: number) => {
  //   dispatch(setPageSize(pageSize));
  //   setSearchParams((params) => {
  //     params.set('page', '1');
  //     return params;
  //   });
  // };

  return (
    <div data-testid="products-page">
      <Search
        // initialValue={localStorage.getItem('search-term') ?? ''}
        initialValue=""
        // onSearchClick={handleSearchClick}
        onSearchClick={() => {}}
      />
      <div className="flex gap-4">
        <div className="grow">
          <ProductsContainer
            data={data?.products ?? []}
            error={error as SerializedError}
            loading={isLoading || isFetching || navigation.state === 'loading'}
          />
        </div>
        {/* <Outlet /> */}
      </div>
      {/* {data?.products && data.count >= pageSize && (
          <Pagination
            onPageSizeChange={handlePageSizeChange}
            totalPages={Math.floor(data.count / pageSize)}
            pageSize={pageSize}
          />
        )} */}
    </div>
  );
};

export default ProductsPage;
