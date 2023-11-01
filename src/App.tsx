import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import { ProductsPage, productsLoader, NotFoundPage } from './pages';

import './App.css';
import { RootLayout } from './layouts';
import {
  ProductDetails,
  productDetailsLoader,
} from './pages/Products/components/ProductDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="products" element={<ProductsPage />} loader={productsLoader}>
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
