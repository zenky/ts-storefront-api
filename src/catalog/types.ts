import { Category } from '../categories/types.ts';
import { ProductsCollection } from '../collections/types.ts';
import { Product } from '../products/types.ts';

export interface ShowCatalogRequest {
  city_id?: string;
  stock_id?: string;
}

export interface CatalogItem {
  type: 'category' | 'collection';
  products_count: number;
  category?: Category | null;
  collection?: ProductsCollection | null;
  products: Product[];
}

export interface RemoteCatalog {
  hash: string | null;
  city_id: string | null;
  stock_id: string | null;
  url: string;
}
