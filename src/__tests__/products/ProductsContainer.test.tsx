import { it } from 'vitest';
import { ProductsContainer } from '../../components/ProductsPage';
import { renderWithProviders } from '../utils';

it('Product container renders error message', () => {
  const { getByText } = renderWithProviders(
    <ProductsContainer data={[]} error={new Error('Error occurred')} />
  );

  getByText('Error occurred');
});

it('Product container renders loader', () => {
  const { getByText } = renderWithProviders(
    <ProductsContainer data={[]} loading />
  );

  getByText('Loading...');
});
