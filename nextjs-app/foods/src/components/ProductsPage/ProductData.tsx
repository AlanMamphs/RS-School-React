import { Table } from '..';
import { Product } from './types';

export const ProductTable = ({ product }: { product: Product }) => (
  <Table>
    <Table.Header>
      <Table.Head className="bg-gray-50 dark:bg-gray-800 ">
        Product Properties
      </Table.Head>
      <Table.Head>Property Values</Table.Head>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell className="font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
          Countries
        </Table.Cell>
        <Table.Cell>{product.countries?.split(',').join(', ')}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell className="font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
          Brands
        </Table.Cell>
        <Table.Cell>{product.brands}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell className="font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
          Ingredients
        </Table.Cell>
        <Table.Cell>
          {product.ingredients_text_en || product.ingredients_text}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell className="font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
          Macro Elements
        </Table.Cell>
        <Table.Cell>
          <ul>
            <li>Prots - {product.nutriments?.proteins_100g}</li>
            <li>Carbs - {product.nutriments?.carbohydrates_100g}</li>
            <li>Fats - {product.nutriments?.fat_100g}</li>
            <li>Energy - {product.nutriments?.['energy-kcal_100g']}</li>
          </ul>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
