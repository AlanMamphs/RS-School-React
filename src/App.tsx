import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import {
  HomePage,
  NotFoundPage,
  ProductsPage,
  ProductDetails,
  ProductError,
  ProductsProvider,
} from './pages';

import { RootLayout } from './layouts';
import ErrorBoundary from './components/ErrorBoundary';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} ErrorBoundary={ErrorBoundary}>
      <Route index element={<HomePage />} />
      <Route
        path="products"
        element={
          <ProductsProvider>
            <ProductsPage />
          </ProductsProvider>
        }
        errorElement={<ProductError />}
      >
        <Route path=":id" element={<ProductDetails />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
export const App = () => <RouterProvider router={router} />;

export default App;
