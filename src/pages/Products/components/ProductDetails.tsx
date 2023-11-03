import {
  useLoaderData,
  LoaderFunction,
  useNavigation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import ApiClient from '../../../app/ApiClient';
import { Table } from '../../../components';
import { Product } from '../types';
import { useMemo } from 'react';
export const ProductDetails = () => {
  const { product } = useLoaderData() as { product: Product };
  const navigation = useNavigation();
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();

  const formattedData = useMemo(() => {
    return [
      [
        { id: '1', value: 'Countries' },
        { id: '2', value: product.countries.split(',').join(', ') },
      ],
      [
        { id: 1, value: 'Brands' },
        { id: 2, value: product.brands },
      ],
      [
        { id: 1, value: 'Ingredients' },
        {
          id: 2,
          value: product.ingredients_text_en || product.ingredients_text,
        },
      ],
      [
        { id: 1, value: 'Macro Elements' },
        {
          id: 2,
          value: (
            <ul>
              <li>Prots - {product.nutriments.proteins_100g}</li>
              <li>Carbs - {product.nutriments.carbohydrates_100g}</li>
              <li>Fats - {product.nutriments.fat_100g}</li>
              <li>Energy - {product.nutriments['energy-kcal_100g']}</li>
            </ul>
          ),
        },
      ],
    ];
  }, [product]);

  return (
    <div className="flex-1">
      <div className=" text-gray-900 dark:text-white">
        {!product ? (
          <div>Product details are not available</div>
        ) : (
          <>
            <div className="flex items-start justify-between p-4 border-b rounded-t bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {product.product_name}
              </h3>
              <button
                onClick={() =>
                  navigator(`/products?${searchParams.toString()}`)
                }
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {navigation.state === 'loading' ? (
              <span className="text-gray-900 dark:text-white">
                Searching ...
              </span>
            ) : (
              <Table
                headers={['Product Properties', 'Property Values']}
                data={formattedData}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const productDetailsLoader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (!id) return;

  return ApiClient.fetchProduct(id);
};
