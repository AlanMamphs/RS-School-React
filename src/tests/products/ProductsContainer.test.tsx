import { it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { ProductsContainer } from '../../pages/Products';
import { renderWithProviders } from '../utils';

it('Product container renders error message', () => {
  const { getByText } = renderWithProviders(
    <HashRouter>
      <ProductsContainer data={[]} error={new Error('Error occurred')} />
    </HashRouter>
  );

  getByText('Error occurred');
});

it('Product container renders loader', () => {
  const { getByText } = renderWithProviders(
    <HashRouter>
      <ProductsContainer data={[]} loading />
    </HashRouter>
  );

  getByText('Loading...');
});
