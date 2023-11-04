import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import { HomePage, ProductsPage, NotFoundPage } from './pages';

import './App.css';
import { RootLayout } from './layouts';
import { ProductDetails, ProductError } from './pages/Products';
import ErrorBoundary from './components/ErrorBoundary';
import { ProductsProvider } from './pages/Products/context';

const router = createBrowserRouter(
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
