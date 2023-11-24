import { ProductsLayout } from '@/components/ProductsPage/ProductsLayout';
import { wrapper } from '../../lib/store';
import { fetchProducts, getRunningQueriesThunk } from '../../lib/productsApi';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchTerms = (context.query.searchTerms as string) ?? '';
    const page = Number(context.query.page ?? '1');
    const pageSize = Number(context.query.pageSize ?? DEFAULT_PAGE_SIZE);

    store.dispatch(
      fetchProducts.initiate({
        searchTerms,
        pageSize,
        page,
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default ProductsLayout;
