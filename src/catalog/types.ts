import { Category } from '../categories/types.ts';
import { ProductsCollection } from '../collections/types.ts';
import { Product } from '../products/types.ts';

export interface ShowCatalogRequest {
  city_id?: string;
  stock_id?: string;
}

export interface CatalogItem {
  type: 'category' | 'products_collection' | 'collection';
  products_count: number;
  category?: Category | null;
  products_collection?: ProductsCollection | null;
  /** @deprecated Never populated by the API — read `products_collection`. */
  collection?: ProductsCollection | null;
  products: Product[];
}

export interface RemoteCatalog {
  /** Null for automatic catalogs, filled for manual ones bound to a website. */
  catalog_id?: string | null;
  hash: string | null;
  city_id: string | null;
  stock_id: string | null;
  url: string;
}
