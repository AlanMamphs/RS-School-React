import { Link, useSearchParams, useParams } from 'react-router-dom';
import { Card, Container } from '../../../components';
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

  return (
    <Container>
      {!props.data.length && <div className="m-8">No results</div>}
      {props.data.map((product) =>
        String(product.id) !== id ? (
          <Link
            to={`${product.id ?? product.code}?${searchParams.toString()}`}
            key={product.id}
          >
            <Card
              header={product.product_name}
              image={product.image_front_url}
              brands={product.brands}
            />
          </Link>
        ) : (
          <Card
            key={product.id}
            header={product.product_name}
            image={product.image_front_url}
            brands={product.brands}
            isActive
          />
        )
      )}
    </Container>
  );
};
