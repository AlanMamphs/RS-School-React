import AbortController from 'abort-controller';

import fetch, { Headers, Request, Response } from 'node-fetch';

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
});

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RootLayout } from '@/layouts';
import { wrapper } from '@/lib/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
export default wrapper.withRedux(App);
