import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import {
  HomePage,
  NotFoundPage,
  ProductsPage,
  ProductDetails,
  ProductsProvider,
} from './pages';

import { RootLayout } from './layouts';
import { ErrorBoundary } from './components';

export const router = createHashRouter(
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
      >
        <Route path=":id" element={<ProductDetails />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
export const App = () => <RouterProvider router={router} />;
