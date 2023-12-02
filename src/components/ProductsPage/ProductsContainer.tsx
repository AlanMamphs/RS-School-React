import { SerializedError } from '@reduxjs/toolkit';

import { Product } from './types';
import { Card, GridContainer } from '..';
import {
  ViewMode,
  useSelectedProductSelector,
  useViewModeSelector,
} from '@/lib/productsSlice';

export const ProductsContainer = (props: {
  data: Product[];
  loading?: boolean;
  error?: SerializedError;
  onCardClick: (productId: string) => void;
}) => {
  const selectedProduct = useSelectedProductSelector();
  const viewMode = useViewModeSelector();

  if (props.loading) {
    return <div className="text-gray-900 dark:text-white m-12">Loading...</div>;
  }

  if (props.error) {
    return <div>{props.error.message}</div>;
  }

  return (
    <GridContainer>
      {!props.data.length && <div className="m-8">No results</div>}
      {props.data.map((product) => (
        <Card
          key={product.id}
          onClick={() => props.onCardClick(product.id)}
          active={
            ViewMode.productDetails === viewMode &&
            Boolean(selectedProduct) &&
            String(product.id ?? product.code) === selectedProduct
          }
          header={product.product_name}
          image={product.image_front_url}
          description={product.brands}
        />
      ))}
    </GridContainer>
  );
};
