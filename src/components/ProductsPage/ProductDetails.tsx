import { FlexContainer } from '..';
import { useFetchProductQuery } from '@/lib/productsApi';
import {
  ViewMode,
  setViewMode,
  useViewModeSelector,
} from '@/lib/productsSlice';

import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import { ProductTable } from './ProductData';

export const ProductDetails = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params ?? {};
  const { data, isLoading } = useFetchProductQuery(id as string);

  const viewMode = useViewModeSelector();

  if (viewMode === ViewMode.products) {
    return null;
  }
  const handleOnClose = () => {
    router.push(`/products?page=${searchParams.get('page') ?? '1'}`);
    setViewMode(ViewMode.products);
  };

  return (
    <div className="sticky top-0 h-full flex-1">
      <FlexContainer
        role="product-details"
        header={data?.product?.product_name}
        onClose={handleOnClose}
      >
        {isLoading && 'Loading...'}
        {!isLoading && !data?.product && 'Data is not available'}
        {!isLoading && data?.product && <ProductTable product={data.product} />}
      </FlexContainer>
    </div>
  );
};
