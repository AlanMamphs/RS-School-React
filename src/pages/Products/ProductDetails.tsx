import {
  useLoaderData,
  LoaderFunction,
  useNavigation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import ApiClient from '../../app/ApiClient';
import { FlexContainer } from '../../components';

import { ProductTable } from './components';
import { Product } from './types';

export const ProductDetails = () => {
  const { product } = useLoaderData() as { product: Product };
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  if (isLoading && product) {
    return;
  }
  return (
    <FlexContainer
      header={product.product_name}
      onClose={() => navigator(`/products?${searchParams.toString()}`)}
    >
      {isLoading && !product && 'Loading...'}
      {!isLoading && !product && 'Data is not available'}
      {!isLoading && product && <ProductTable product={product} />}
    </FlexContainer>
  );
};

export const productDetailsLoader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (!id) return;

  return ApiClient.fetchProduct(id);
};
