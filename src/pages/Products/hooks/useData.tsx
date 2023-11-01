import { useEffect, useState } from 'react';
import { useSearchParams, useNavigation } from 'react-router-dom';

import { SearchResults } from '../types';

export const useData = ({ onLoadData }: { onLoadData: SearchResults }) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResults>(onLoadData);
  const navigation = useNavigation();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setSearchResult(onLoadData);
    setLoading(false);
  }, [searchParams, onLoadData]);

  return {
    handleSearch: () => setSearchParams({ page: '1' }),
    data: searchResult,
    loading: navigation.state === 'loading' || loading,
  };
};
