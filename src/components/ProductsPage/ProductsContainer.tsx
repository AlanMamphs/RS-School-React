import { useEffect } from 'react';
import { Card, GridContainer } from '..';
import { Product } from './types';
import { SerializedError } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  setSelectedProduct,
  useSelectedProductSelector,
} from '@/lib/productsSlice';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const ProductsContainer = (props: {
  data: Product[];
  loading?: boolean;
  error?: SerializedError;
}) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelectedProductSelector();

  if (props.loading) {
    return <div className="text-gray-900 dark:text-white m-12">Loading...</div>;
  }

  if (props.error) {
    return <div>{props.error.message}</div>;
  }

  const getNextUrl = (productId: string) => {
    return `${
      productId === selectedProduct ? `/products` : `/products/${productId}`
    }?${searchParams.toString()}`;
  };

  const handleCardSelected = (id: string) => {
    if (id === selectedProduct) {
      dispatch(setSelectedProduct(null));
    } else {
      dispatch(setSelectedProduct(id));
    }
  };

  return (
    <GridContainer>
      {!props.data.length && <div className="m-8">No results</div>}
      {props.data.map((product) => (
        <Link
          href={getNextUrl(product.id ?? product.code)}
          key={product.id}
          onClick={() => handleCardSelected(product.id)}
        >
          <Card
            active={String(product.id ?? product.code) === selectedProduct}
            header={product.product_name}
            image={product.image_front_url}
            description={product.brands}
          />
        </Link>
      ))}
    </GridContainer>
  );
};
