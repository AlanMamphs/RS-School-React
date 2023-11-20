export interface Product {
  product_name: string;
  id: string;
  code: string;
  image_front_url: string;
  brands: string;
  categories: string;
  allergens: string;
  countries: string;
  ingredients_text_en: string;
  ingredients_text: string;
  link: string;
  nutriments: Record<string, number | string>;
  nutriscore_data: Record<string, number | string>;
}

export interface SearchResults {
  products: Product[];
  page: number;
  page_count: number;
  page_size: number;
  count: number;
}
