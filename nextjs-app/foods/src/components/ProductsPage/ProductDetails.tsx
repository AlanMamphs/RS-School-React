import {
  useNavigate,
  useSearchParams,
  useParams,
  useNavigation,
} from 'react-router-dom';

import { FlexContainer } from '..';
import { useFetchProductQuery } from '@/lib/productsApi';
import { ViewMode, useViewModeSelector } from '@/lib/productsSlice';

import { ProductTable } from './ProductData';

export const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchProductQuery(id as string);

  const navigator = useNavigate();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const loading = isLoading || navigation.state === 'loading';
  const viewMode = useViewModeSelector();

  if (viewMode === ViewMode.products) {
    return null;
  }
  const handleOnClose = () => {
    navigator(`/products?${searchParams.toString()}`);
  };

  return (
    <FlexContainer
      role="product-details"
      header={data?.product?.product_name}
      onClose={handleOnClose}
    >
      {loading && 'Loading...'}
      {!loading && !data?.product && 'Data is not available'}
      {!loading && data?.product && <ProductTable product={data.product} />}
    </FlexContainer>
  );
};
