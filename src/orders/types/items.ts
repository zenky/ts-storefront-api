import { Discount } from "../../types.ts";
import { EvaluatedRestriction, Product, ProductModifiersRequest, ProductVariant } from "../../products/types.ts";
import { BasicModifiersGroup, Modifier } from "../../modifiers/types.ts";

export interface OrderProductVariantModifier {
  id: string;
  modifiers_group_id: string | null;
  quantity: number;
  total_price: number | null;
  unit_price: number | null;
  original_price: number | null;
  original_unit_price: number | null;
  modifier?: Modifier | null;
  modifiers_group?: BasicModifiersGroup | null;
}

export interface OrderProductVariant {
  id: string;
  product_id: string;
  product_variant_id: string;
  stock_id: string | null;
  promotion: {
    id: string;
    reward_id: string;
  } | null;
  is_reward: boolean;
  is_promocode_reward: boolean;
  quantity: number;
  has_measured_quantity: boolean;
  measured_quantity: number | null;
  total_price: number;
  original_total_price: number | null;
  unit_price: number;
  original_unit_price: number | null;
  discount: Discount | null;
  modifiers_hash: string | null;
  product?: Product;
  variant?: ProductVariant;
  modifiers?: OrderProductVariantModifier[];
  restrictions?: EvaluatedRestriction[];
}

export interface OrderPackage {
  id: string;
  name: string;
  quantity: number;
  total_price: number;
}

export enum OrderCartCheckerResultReason {
  PriceMismatch = 'price_mismatch',
  OutOfStock = 'out_of_stock',
  Unavailable = 'unavailable',
}

export enum OrderCartCheckerResultAction {
  None = 'none',
  Cleanup = 'cleanup',
}

export interface OrderCartCheckerResult {
  order_variants: {
    id: string;
    product_variant_id: string;
    quantity: number;
    reasons: OrderCartCheckerResultReason[];
  }[];
  action: OrderCartCheckerResultAction;
}

export enum RecommendationsBlock {
  ProductCard = 'product_card',
  Cart = 'cart',
}

export interface OrderProductVariantRequest {
  product_variant_id: string;
  quantity: number;
  promotion_id?: string;
  promotion_reward_id?: string;
  modifiers?: ProductModifiersRequest[];
  recommendations_block?: RecommendationsBlock;
}
