import { useEffect, useState } from 'react';
import {
  useSearchParams,
  useNavigation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { SearchResults } from '../types';

export const useData = ({ onLoadData }: { onLoadData: SearchResults }) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResults>(onLoadData);
  const { id } = useParams();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setSearchResult(onLoadData);
    setLoading(false);
  }, [searchParams, onLoadData]);

  const handleSearch = () => {
    if (id) {
      navigate(`/products?page=${1}`);
    } else {
      setSearchParams({
        page: '1',
      });
    }
  };
  return {
    handleSearch,
    data: searchResult,
    loading: navigation.state === 'loading' || loading,
  };
};
