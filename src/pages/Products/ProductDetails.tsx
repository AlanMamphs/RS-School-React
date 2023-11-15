import {
  useNavigate,
  useSearchParams,
  useParams,
  useNavigation,
} from 'react-router-dom';

import { FlexContainer } from '../../components';
import { useFetchProductQuery } from '../../services/products';

import { ProductTable } from './components';

export const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchProductQuery(id as string);

  const navigator = useNavigate();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const loading = isLoading || navigation.state === 'loading';

  return (
    <FlexContainer
      role="product-details"
      header={data?.product?.product_name}
      onClose={() => navigator(`/products?${searchParams.toString()}`)}
    >
      {loading && 'Loading...'}
      {!loading && !data?.product && 'Data is not available'}
      {!loading && data?.product && <ProductTable product={data.product} />}
    </FlexContainer>
  );
};
