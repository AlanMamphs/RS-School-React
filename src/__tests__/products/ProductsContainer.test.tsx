import { it, vi, expect } from 'vitest';
import { ProductsContainer } from '../../components/ProductsPage';
import { renderWithProviders } from '../utils';
import { products } from '../mocks/products';
import userEvent from '@testing-library/user-event';

it('Product container renders error message', () => {
  const { getByText } = renderWithProviders(
    <ProductsContainer
      data={[]}
      error={new Error('Error occurred')}
      onCardClick={vi.fn()}
    />
  );

  getByText('Error occurred');
});

it('Product container renders loader', () => {
  const { getByText } = renderWithProviders(
    <ProductsContainer data={[]} loading onCardClick={vi.fn()} />
  );

  getByText('Loading...');
});

it('Product container triggers onClick method', async () => {
  const onClick = vi.fn();
  const { getByText } = renderWithProviders(
    <ProductsContainer data={products({})} onCardClick={onClick} />
  );
  const user = userEvent.setup();
  await user.click(getByText('Product 1'));
  expect(onClick).toHaveBeenCalledTimes(1);
});
