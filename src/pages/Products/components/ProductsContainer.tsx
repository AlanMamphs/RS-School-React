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
    return <div>Loading...</div>;
  }

  if (props.error) {
    return <div>{props.error}</div>;
  }

  return (
    <Container>
      {!props.data.length && <div>No results</div>}
      {props.data.map((product) => (
        <Link
          to={`${product.id ?? product.code}?${searchParams.toString()}`}
          key={product.id}
        >
          <Card
            header={product.product_name}
            image={product.image_front_url}
            brands={product.brands}
            isActive={String(product.id) === id}
          />
        </Link>
      ))}
    </Container>
  );
};
