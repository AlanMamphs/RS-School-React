import { describe, beforeEach, it, expect } from 'vitest';
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App, router as Router } from '../App';

import { within, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import 'isomorphic-fetch';
import { server } from './mocks/products';
import { PropsWithChildren } from 'react';
import { createStore } from '../app/store';

export function renderWithProviders(
  ui: React.ReactElement,
  { store = createStore() } = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
const setup = async () => {
  server.resetHandlers();
  const screen = renderWithProviders(<App />);
  const user = userEvent.setup();

  const brand = within(screen.getByRole('heading', { level: 1 })).getByText(
    /Open Food Facts/
  );
  await user.click(brand);

  await waitFor(() => screen.getByText(/Go To Search Page/));
  await user.click(screen.getByText(/Go To Search Page/));

  screen.getByTestId('products-page');

  return { ...screen, user };
};

describe('App & Router tests', () => {
  beforeEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('Smoke test', async () => {
    const { getByRole } = await setup();

    expect(
      getByRole('link', { name: 'Open Food Facts' }).getAttribute('href')
    ).toBe('#/');
  });

  it('Verify that the component renders the specified number of cards', async () => {
    const { getByTestId, queryAllByRole, getByRole, user } = await setup();

    expect(getByTestId('products-page')).toBeVisible();
    expect(queryAllByRole('card').length).toBe(35);

    await user.type(getByRole('search-input'), 'number_of_products-5');
    await user.click(getByRole('search-button'));

    expect(queryAllByRole('card').length).toBe(5);
  });
  it('Check that an appropriate message is displayed if no cards are present', async () => {
    const { getByText, queryAllByRole, getByRole, user } = await setup();

    await user.type(getByRole('search-input'), 'number_of_products-0');
    await user.click(getByRole('search-button'));

    expect(queryAllByRole('card').length).toBe(0);
    getByText(/No results/);
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    const { queryAllByRole } = await setup();

    const card = within(queryAllByRole('card')[0]);
    expect(
      within(card.getByRole('card-image')).getByRole('img').getAttribute('src')
    ).toBeTruthy();
    within(card.getByRole('card-header')).getByText(/Product 1/);
    within(card.getByRole('card-description')).getByText(/Brands for 1/);
  });
  it('Check that clicking on a card opens a detailed card component', async () => {
    const { queryAllByRole, getByRole, user } = await setup();
    expect(queryAllByRole('card').length).toBe(35);
    expect(queryAllByRole('table').length).toBe(0);
    await user.click(queryAllByRole('card')[0]);
    expect(queryAllByRole('table').length).toBe(1);
    getByRole('product-details');
  });
  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const { queryAllByRole, user } = await setup();
    const requestUrls: URL[] = [];
    server.events.on('request:start', (request) => {
      requestUrls.push(request.url);
    });

    expect(requestUrls.length).toBe(0);

    await user.click(queryAllByRole('card')[20]);
    expect(requestUrls.length).toBe(1);
    expect(requestUrls[0].pathname).toBe('/api/v2/product/20');

    await user.click(queryAllByRole('card')[21]);
    expect(requestUrls.length).toBe(2);
    expect(requestUrls[1].pathname).toBe('/api/v2/product/21');
  });

  it('Ensure that the detailed card component correctly displays the detailed card data', async () => {
    const { queryAllByRole, getByRole, user } = await setup();

    await user.click(queryAllByRole('card')[0]);

    const productDetails = getByRole('product-details');

    within(productDetails).getByRole('heading', { name: 'Product 1' });
    within(productDetails).getByRole('close-button');
    within(productDetails).getByText(/Product Properties/);
    within(productDetails).getByText(/Property Values/);
    within(productDetails).getByText('Brands');
    within(productDetails).getByText(/Brands for 1/);
    within(productDetails).getByText(/Countries/);
    within(productDetails).getByText(/Ingredients/);
    within(productDetails).getByText(/Macro Elements/);
    within(productDetails).getByText(/Prots -/);
    within(productDetails).getByText(/Carbs -/);
    within(productDetails).getByText(/Fats -/);
    within(productDetails).getByText(/Energy -/);
  });
  it('Ensure that clicking the close button hides the component', async () => {
    const { queryAllByRole, getByRole, user, getByText } = await setup();

    expect(queryAllByRole('product-details').length).toBe(0);
    await user.click(getByText('Product 24'));
    await waitFor(() => getByRole('product-details'));
    expect(getByRole('product-details')).toBeVisible();
    await user.click(getByRole('close-button'));
    expect(queryAllByRole('product-details').length).toBe(0);
  });

  it('Ensure that the pagination component correctly displays the pagination data', async () => {
    const { queryAllByRole, getAllByRole, queryAllByText, getByRole, user } =
      await setup();

    const requestUrls: URL[] = [];
    server.events.on('request:start', (request) => {
      requestUrls.push(request.url);
    });
    expect(requestUrls.length).toBe(0);

    expect(queryAllByRole('card').length).toBe(35);

    expect(queryAllByText('Product 1')).toHaveLength(1);
    expect(queryAllByText('Product 36')).toHaveLength(0);

    await user.click(within(getByRole('pagination')).getByText(2));

    expect(requestUrls.length).toBe(1);
    expect(requestUrls[0].searchParams.get('page')).toBe('2');
    expect(requestUrls[0].searchParams.get('page_size')).toBe('35');

    expect(queryAllByText('Product 1')).toHaveLength(0);
    expect(queryAllByText('Product 36')).toHaveLength(1);

    await user.click(within(getByRole('pagination')).getByText(/Next/));

    expect(requestUrls.length).toBe(2);
    expect(requestUrls[1].searchParams.get('page')).toBe('3');
    expect(requestUrls[1].searchParams.get('page_size')).toBe('35');

    expect(queryAllByText('Product 1')).toHaveLength(0);
    expect(queryAllByText('Product 36')).toHaveLength(0);
    expect(queryAllByText('Product 72')).toHaveLength(1);

    const options = getAllByRole('page_size_value') as HTMLOptionElement[];
    act(() => {
      fireEvent.change(getByRole('page_size'), {
        target: { value: options[0].value },
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(requestUrls.length).toBe(3);
    expect(requestUrls[2].searchParams.get('page')).toBe('1');
    expect(requestUrls[2].searchParams.get('page_size')).toBe('14');

    expect(queryAllByText('Product 1')).toHaveLength(1);
    expect(queryAllByText('Product 36')).toHaveLength(0);

    await user.type(getByRole('search-input'), 'number-of-products-80');
    await user.click(getByRole('search-button'));

    expect(requestUrls[3].searchParams.get('page')).toBe('1');
    expect(requestUrls[3].searchParams.get('page_size')).toBe('14');
    expect(requestUrls[3].searchParams.get('search_terms')).toBe(
      'number-of-products-80'
    );
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const { getByRole, user } = await setup();

    expect(localStorage.getItem('search-term')).toBe(null);

    await user.type(getByRole('search-input'), 'Some value');
    expect(localStorage.getItem('search-term')).toBe(null);

    await user.click(getByRole('search-button'));

    expect(localStorage.getItem('search-term')).toBe('Some value');
    await user.type(getByRole('search-input'), ' and some more');
    await user.click(getByRole('search-button'));

    expect(localStorage.getItem('search-term')).toBe(
      'Some value and some more'
    );
  });

  it('Verify that hitting Enter works as Search Button', async () => {
    const { getByRole, user } = await setup();

    expect(localStorage.getItem('search-term')).toBe(null);

    await user.type(getByRole('search-input'), 'Some value');
    expect(localStorage.getItem('search-term')).toBe(null);

    act(() => {
      fireEvent.keyDown(getByRole('search-input'), {
        key: 'Enter',
      });
    });
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(localStorage.getItem('search-term')).toBe('Some value');
    await user.type(getByRole('search-input'), ' and some more');
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem('search-term', 'Some value');
    const requestUrls: URL[] = [];
    server.events.on('request:start', (request) => {
      requestUrls.push(request.url);
    });
    expect(requestUrls.length).toBe(0);
    await setup();
    expect(requestUrls.length).toBe(1);
    expect(requestUrls[0].searchParams.get('search_terms')).toBe('Some value');
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const { getByText } = renderWithProviders(<App />);
    Router.navigate('/invalid/href');
    await new Promise((resolve) => setTimeout(resolve, 100));
    getByText("Page at '/invalid/href' is not found");
  });
});