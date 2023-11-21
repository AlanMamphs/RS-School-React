import { it } from 'vitest';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { ProductsContainer } from '../../pages/Products';

it('Product container renders error message', () => {
  const { getByText } = render(
    <HashRouter>
      <ProductsContainer data={[]} error={new Error('Error occurred')} />
    </HashRouter>
  );

  getByText('Error occurred');
});

it('Product container renders loader', () => {
  const { getByText } = render(
    <HashRouter>
      <ProductsContainer data={[]} loading />
    </HashRouter>
  );

  getByText('Loading...');
});
