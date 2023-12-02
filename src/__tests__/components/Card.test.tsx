import { it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { Card } from '../../components';

it('Test Card Render via Props', () => {
  const { getByText, getByRole } = render(
    <Card
      header="Header"
      image="https://example.com"
      description="Description"
      active
    />
  );

  getByText('Header', { selector: 'h3' });
  getByText('Description', { selector: 'p' });
  expect(getByRole('img').getAttribute('src')).toBe(
    '/_next/image?url=https%3A%2F%2Fexample.com&w=256&q=75'
  );
});

it('Test Card Render via Children', () => {
  const { getByText, getByRole } = render(
    <Card>
      <Card.CardHeader>Header</Card.CardHeader>
      <Card.CardImage image="https://example.com" />
      <Card.CardDescription>Description</Card.CardDescription>
    </Card>
  );
  getByText('Header', { selector: 'h3' });
  getByText('Description', { selector: 'p' });
  expect(getByRole('img').getAttribute('src')).toBe(
    '/_next/image?url=https%3A%2F%2Fexample.com&w=256&q=75'
  );
});
