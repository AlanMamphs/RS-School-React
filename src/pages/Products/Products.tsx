import { ChangeEventHandler, useState } from 'react';
import {
  LoaderFunction,
  useLoaderData,
  Outlet,
  useParams,
  Link,
  useSearchParams,
} from 'react-router-dom';

import { useData } from './hooks';
import { Search } from '../../components';

import { ProductsContainer } from './components';
import Pagination from '../../components/Pagination';
import ApiClient from '../../app/ApiClient';
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
      <div className="products-section">
        <div className="products-list-wrapper">
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
