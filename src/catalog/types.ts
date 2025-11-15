import { Category } from '../categories/types.ts';
import { ProductsCollection } from '../collections/types.ts';
import { Product } from '../products/types.ts';

export interface CatalogItem {
  type: 'category' | 'collection';
  products_count: number;
  category?: Category | null;
  collection?: ProductsCollection | null;
  products: Product[];
}
