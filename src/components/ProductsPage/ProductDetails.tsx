import { FlexContainer } from '..';
import { useFetchProductQuery } from '@/lib/productsApi';

import { useRouter } from 'next/router';

import { ProductTable } from './ProductData';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  ViewMode,
  setViewMode,
  useSelectedProductSelector,
  useViewModeSelector,
} from '@/lib/productsSlice';
import { useAppDispatch } from '@/lib/hooks';
import { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => (
  <div
    role="product-details"
    className="sticky top-0 h-full align-middle flex-1"
  >
    {props.children}
  </div>
);

export const ProductDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = router.query.id;
  const { data } = useFetchProductQuery(
    typeof id === 'string' ? id : skipToken,
    {
      skip: router.isFallback,
    }
  );

  const viewMode = useViewModeSelector();
  const selectedProduct = useSelectedProductSelector();

  const handleOnClose = () => {
    dispatch(setViewMode(ViewMode.products));
    router.pathname = '/products';
    delete router.query.id;
    router.push(router);
  };

  if (viewMode === ViewMode.products) {
    return null;
  }

  if (
    viewMode === ViewMode.productDetails &&
    (!data || data?.code !== selectedProduct)
  ) {
    return (
      <Layout>
        {JSON.stringify(data)}
        {JSON.stringify(selectedProduct)}
        <div className="mt-5">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <FlexContainer
        header={data?.product?.product_name}
        onClose={handleOnClose}
      >
        {!data?.product && 'Data is not available'}
        {data?.product && <ProductTable product={data.product} />}
      </FlexContainer>
    </Layout>
  );
};
