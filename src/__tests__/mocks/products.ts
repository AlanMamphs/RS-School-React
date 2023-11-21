import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { API_BASE_URL } from '../../lib/configs';

const products = ({
  page = 1,
  pageSize = 24,
}: {
  page: number;
  pageSize?: number;
}) =>
  Array.from(Array(pageSize).keys()).map((idx) => ({
    product_name: `Product ${idx + 1 + (page - 1) * pageSize}`,
    code: idx.toString(),
    id: idx.toString(),
    image_front_url: '../assets/react.svg',
    brands: 'Brands for ' + (idx + 1 + (page - 1) * pageSize),
    categories: 'Categories for ' + (idx + 1 + (page - 1) * pageSize),
    countries: 'USA,Ukraine,Israel,Kyrgyzstan',
    nutriments: {
      carbohydrates_100g: '100',
      fat_100g: '100',
      proteins_100g: '100',
      'energy-kcal_100g': '100',
    },
  }));

export const server = setupServer(
  rest.get(`${API_BASE_URL}/cgi/search.pl`, (_req, res, ctx) => {
    const searchParams = new URL(_req.url).searchParams;
    const page = Number(searchParams.get('page') ?? 1);
    const pageSize = Number(searchParams.get('page_size') ?? 35);
    const search = (searchParams.get('search_terms') as string) ?? '';
    let numberOfProducts = 150;

    if (search.startsWith('number_of_products-')) {
      numberOfProducts = Number(search.split('-')[1]);
    }

    return res(
      ctx.json({
        products: products({ page, pageSize }).slice(0, numberOfProducts),
        page: page,
        page_count: pageSize,
        count: numberOfProducts,
        page_size: pageSize,
        numberOfProducts,
        search,
      })
    );
  }),
  rest.get(`${API_BASE_URL}/api/v2/product/:code`, (_req, res, ctx) => {
    const { code } = _req.params;
    return res(
      ctx.json({
        code,
        product:
          products({ page: 1 }).find((product) => product.code === code) ??
          null,
      })
    );
  })
);
