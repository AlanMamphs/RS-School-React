import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
import 'isomorphic-fetch';
import { beforeEach, beforeAll, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/products';

vi.mock('next/router', () => require('next-router-mock'));

beforeEach(async () => {
  localStorage.clear();
  cleanup();
});
beforeAll(() => server.listen());
afterAll(() => server.close());
