import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import { HomePage, ProductsPage, productsLoader, NotFoundPage } from './pages';

import './App.css';
import { RootLayout } from './layouts';
import {
  ProductDetails,
  productDetailsLoader,
  ProductError,
} from './pages/Products';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} ErrorBoundary={ErrorBoundary}>
      <Route index element={<HomePage />} />
      <Route
        path="products"
        element={<ProductsPage />}
        loader={productsLoader}
        errorElement={<ProductError />}
      >
        <Route
          path=":id"
          element={<ProductDetails />}
          loader={productDetailsLoader}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
export const App = () => <RouterProvider router={router} />;

export default App;
