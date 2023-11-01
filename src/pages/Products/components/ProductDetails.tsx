import {
  useLoaderData,
  LoaderFunction,
  useNavigation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import ApiClient from '../../../app/ApiClient';
import { Product } from '../types';

export const ProductDetails = () => {
  const { product } = useLoaderData() as { product: Product };
  const navigation = useNavigation();
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <div className="product-details">
      <div
        className="close-button"
        onClick={() => navigator(`/products?${searchParams.toString()}`)}
      >
        &times;
      </div>

      <div className="product-details-data">
        {!product ? (
          <div>Product details are not available</div>
        ) : (
          <>
            <h3>{product.product_name} Product Details</h3>
            {navigation.state === 'loading' ? (
              'Loading...'
            ) : (
              <table>
                <tr>
                  <td className="feature-name">Countries</td>
                  <td className="feature-value">
                    {product.countries.split(',').join(', ')}
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Brands</td>
                  <td className="feature-value">{product.brands}</td>
                </tr>
                <tr>
                  <td className="feature-name">Ingredients</td>
                  <td className="feature-value">
                    {product.ingredients_text_en || product.ingredients_text}
                  </td>
                </tr>
                <tr>
                  <td className="feature-name">Macro Elements</td>
                  <td className="feature-name">
                    <ul>
                      <li>Proteins: {product.nutriments.proteins_100g}</li>
                      <li>Carbs: {product.nutriments.carbohydrates_100g}</li>
                      <li>Fats: {product.nutriments.fat_100g}</li>
                      <li>Energy: {product.nutriments['energy-kcal_100g']}</li>
                    </ul>
                  </td>
                </tr>
              </table>
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
