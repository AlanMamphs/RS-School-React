import { useNavigation, useNavigate, useSearchParams } from 'react-router-dom';
import { FlexContainer } from '../../components';

import { ProductTable } from './components';
import { useProductContext } from './context';

export const ProductDetails = () => {
  const { selectedProduct } = useProductContext();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  if ((isLoading && selectedProduct) || !selectedProduct) {
    return;
  }

  return (
    <FlexContainer
      header={selectedProduct.product_name}
      onClose={() => navigator(`/products?${searchParams.toString()}`)}
    >
      {isLoading && !selectedProduct && 'Loading...'}
      {!isLoading && !selectedProduct && 'Data is not available'}
      {!isLoading && selectedProduct && (
        <ProductTable product={selectedProduct} />
      )}
    </FlexContainer>
  );
};
