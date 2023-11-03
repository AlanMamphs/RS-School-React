import { ChangeEventHandler, useState } from 'react';
import {
  LoaderFunction,
  useLoaderData,
  Outlet,
  useParams,
  Link,
  useSearchParams,
} from 'react-router-dom';

import { Search, Pagination } from '../../components';
import ApiClient from '../../app/ApiClient';

import { ProductsContainer } from './components';
import { useData } from './hooks';
import { SearchResults } from './types';

export const ProductsPage = () => {
  const onLoadData = useLoaderData() as SearchResults;
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search-term') ?? ''
  );
  const { id } = useParams();
  const { handleSearch, data, loading } = useData({
    onLoadData,
  });

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (input) => {
    setSearchTerm(input.target.value);
    localStorage.setItem('search-term', input.target.value);
  };

  return (
    <div className="products-page">
      <Search
        value={searchTerm}
        onChange={handleSearchChange}
        onSearchClick={handleSearch}
      />
      <div className="flex gap-4">
        <div className="grow">
          {id && (
            <Link to={`/products?${searchParams.toString()}`}>
              <div className="overlay active" />
            </Link>
          )}
          <ProductsContainer data={data?.products ?? []} loading={loading} />
        </div>
        <Outlet />
      </div>
      {data?.products && data.count > data.page_size && (
        <Pagination totalPages={Math.floor(data.count / data.page_size)} />
      )}
    </div>
  );
};

export const productsLoader: LoaderFunction = async ({ request }) => {
  const searchTerm = localStorage.getItem('search-term');
  const url = new URL(request.url);

  return ApiClient.fetchProducts({
    search_terms: searchTerm ?? '',
    page: url.searchParams.get('page'),
  });
};
