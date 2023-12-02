import { ProductsLayout } from '@/components/ProductsPage/ProductsLayout';
import { ProductDetails } from '@/components/ProductsPage/ProductDetails';
import { wrapper } from '../../lib/store';
import {
  fetchProduct,
  fetchProducts,
  getRunningQueriesThunk,
} from '../../lib/productsApi';
import { ViewMode, setViewMode } from '@/lib/productsSlice';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';

const PageDetails = () => {
  return (
    <ProductsLayout>
      <ProductDetails />
    </ProductsLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.query.id;
    const searchTerms = (context.query.searchTerms as string) ?? '';
    const page = Number(context.query.page ?? '1');
    const pageSize = Number(context.query.pageSize ?? DEFAULT_PAGE_SIZE);
    store.dispatch(setViewMode(ViewMode.productDetails));
    store.dispatch(
      fetchProducts.initiate({
        searchTerms,
        pageSize,
        page,
      })
    );

    store.dispatch(fetchProduct.initiate(id as string));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default PageDetails;
