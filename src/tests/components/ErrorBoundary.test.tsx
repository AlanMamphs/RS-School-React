import { it } from 'vitest';
import { render } from '@testing-library/react';

import { ErrorBoundary } from '../../components';

it('Test ErrorBoundary Thrown', () => {
  const ThrowError = () => {
    throw new Error('Test');
  };
  const { getByText } = render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  getByText(/Sorry.. there was an error/);
});

it('Test ErrorBoundary not thrown', () => {
  const ThrowError = () => {
    return <div>Hello world!</div>;
  };
  const { getByText } = render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  getByText(/Hello world!/);
});
