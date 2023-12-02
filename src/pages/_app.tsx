import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RootLayout } from '@/layouts';
import { wrapper } from '@/lib/store';
import { Provider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <RootLayout>
        <Component {...props} />
      </RootLayout>
    </Provider>
  );
}
export default App;
