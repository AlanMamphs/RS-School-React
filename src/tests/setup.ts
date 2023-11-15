import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
import 'isomorphic-fetch';
import 'whatwg-fetch';

import { beforeEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/products';

beforeEach(async () => {
  localStorage.clear();
  cleanup();
});
beforeAll(() => server.listen());
afterAll(() => server.close());
