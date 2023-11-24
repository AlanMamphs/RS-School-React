import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
import 'isomorphic-fetch';
import { beforeEach, beforeAll, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/products';
import mockRouter from 'next-router-mock';

vi.mock('next/router', () => require('next-router-mock'));

const resetRouter = () => {
  mockRouter.pathname = '';
  mockRouter.query = {};
};
beforeEach(async () => {
  localStorage.clear();
  cleanup();
  resetRouter();
  console.log(mockRouter);
});
beforeAll(() => server.listen());
afterAll(() => server.close());
