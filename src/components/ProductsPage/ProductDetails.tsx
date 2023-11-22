import { FlexContainer } from '..';
import { useFetchProductQuery } from '@/lib/productsApi';
import {
  ViewMode,
  setViewMode,
  useSelectedProductSelector,
  useViewModeSelector,
  setSelectedProduct,
} from '@/lib/productsSlice';

import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import { ProductTable } from './ProductData';
import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';

export const ProductDetails = () => {
  const { id } = useParams() ?? {};
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const selectedProduct = useSelectedProductSelector();
  const { data, isLoading, isFetching } = useFetchProductQuery(
    selectedProduct as string
  );

  useEffect(() => {
    dispatch(setViewMode(ViewMode.productDetails));
    dispatch(setSelectedProduct(id as string));
  }, [id]);

  if (!selectedProduct) {
    return null;
  }

  if (isLoading || isFetching) {
    return <div className="sticky top-0 h-full flex-1">Loading...</div>;
  }

  const handleOnClose = () => {
    router.push(`/products?page=${searchParams.get('page') ?? '1'}`);
    dispatch(setViewMode(ViewMode.products));
    dispatch(setSelectedProduct(null));
  };

  return (
    <div className="sticky top-0 h-full flex-1">
      <FlexContainer
        role="product-details"
        header={data?.product?.product_name}
        onClose={handleOnClose}
      >
        {!data?.product && 'Data is not available'}
        {data?.product && <ProductTable product={data.product} />}
      </FlexContainer>
    </div>
  );
};
