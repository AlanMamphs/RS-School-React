import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';
import { createStore } from '../app/store';
import { render } from '@testing-library/react';

export function renderWithProviders(
  ui: React.ReactElement,
  { store = createStore() } = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
