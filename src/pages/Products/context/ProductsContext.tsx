import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Product, SearchResults } from '../../../types';
import ApiClient from '../../../app/ApiClient';
import { useParams, useSearchParams } from 'react-router-dom';

type ProductsContext = {
  products: Product[];
  paginationData?: {
    count: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
  selectedProduct: Product | null;
  searchTerm: string;
  loading: boolean;
  setSearchTerm: (searchTerm: string) => void;
  error: Error | null;
  fetchProducts: () => void;
  unselectProduct: () => void;
};

export const ProductsContext = createContext<ProductsContext>({
  products: [],
  selectedProduct: null,
  searchTerm: '',
  setSearchTerm: () => {
    throw new Error('not implemented');
  },
  loading: false,
  error: null,
  fetchProducts: () => {
    throw new Error('not implemented');
  },
  unselectProduct: () => {},
});

export const ProductsProvider = (props: PropsWithChildren<object>) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search-term') ?? ''
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paginationData, setPaginationData] =
    useState<ProductsContext['paginationData']>();

  const productsCache = useRef<{
    productsFetchCache: Map<string, SearchResults>;
    productFetchCache: Map<string, { code: string; product: Product }>;
  }>({
    productFetchCache: new Map(),
    productsFetchCache: new Map(),
  });

  const handleFetchProducts = useCallback(async () => {
    setLoading(true);
    const key = `${searchTerm}-${searchParams.get('page')}`;
    const cache = productsCache.current.productsFetchCache;
    const fetch = async () => {
      const data = await ApiClient.fetchProducts({
        search_terms: searchTerm,
        page: searchParams.get('page'),
      });
      cache.set(key, data);
      return data;
    };
    const data = cache.get(key) ?? (await fetch());

    setProducts(data.products);
    setPaginationData({
      count: data.count,
      page: data.page,
      pageSize: data.page_size,
      pageCount: data.page_count,
    });
    setLoading(false);
  }, [searchTerm, searchParams]);

  const handleFetchProduct = useCallback(async () => {
    if (!id) return;
    const cache = productsCache.current.productFetchCache;

    const fetch = async () => {
      const data = await ApiClient.fetchProduct(id);
      cache.set(id, data);
      return data;
    };
    const data = cache.get(id) ?? (await fetch());
    setSelectedProduct(data.product);
  }, [id]);

  useEffect(() => {
    setSelectedProduct(null);
    setProducts([]);
    try {
      Promise.all([handleFetchProducts(), handleFetchProduct()])
        .then(() => setLoading(false))
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, id]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        selectedProduct,
        fetchProducts: handleFetchProducts,
        searchTerm,
        setSearchTerm,
        error,
        loading,
        paginationData,
        unselectProduct: () => setSelectedProduct(null),
      }}
    >
      {loading ? <p>Loading...</p> : props.children}
    </ProductsContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductsContext);
