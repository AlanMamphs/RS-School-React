import { Link, useSearchParams, useParams } from 'react-router-dom';
import { Card, GridContainer } from '../../../components';
import { Product } from '../types';

export const ProductsContainer = (props: {
  data: Product[];
  loading: boolean;
  error?: string | null;
}) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  if (props.loading) {
    return <div className="text-gray-900 dark:text-white m-12">Loading...</div>;
  }

  if (props.error) {
    return <div>{props.error}</div>;
  }

  const getNextUrl = (productId: string) => {
    return `${
      productId === id ? `/products` : `/products/${productId}`
    }?${searchParams.toString()}`;
  };

  return (
    <GridContainer>
      {!props.data.length && <div className="m-8">No results</div>}
      {props.data.map((product) => (
        <Link to={getNextUrl(product.id ?? product.code)} key={product.id}>
          <Card
            active={String(product.id ?? product.code) === id}
            header={product.product_name}
            image={product.image_front_url}
            description={product.brands}
          />
        </Link>
      ))}
    </GridContainer>
  );
};
