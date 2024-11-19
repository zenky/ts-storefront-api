import {Category} from "../categories/types.ts";
import {Media} from "../media/types.ts";
import {Feature, FeaturesGroup} from "../features/types.ts";
import {Seo} from "../seo/types.ts";
import {ProductModifier, ProductModifiersGroup} from "../modifiers/types.ts";
import {Discount, TernaryFilter} from "../types.ts";
import {InclusionRequest, ListRequest} from "../client/types.ts";

export enum UnitType {
  Piece = 'piece',
  Gram = 'gram',
  Kilogram = 'kilogram',
  Meter = 'meter',
}

export enum Dimension {
  Weight = 'weight',
  Width = 'width',
  Height = 'height',
  Length = 'length',
}

export enum DimensionType {
  Netto = 'netto',
  Brutto = 'brutto',
}

export enum VariantOptionType {
  Color = 'color',
}

export enum ProductContextType {
  Category = 'category',
  Group = 'group',
  VariantOption = 'variant_option',
  VariantOptionValue = 'variant_option_value',
}

export interface ProductVariantPrice {
  stock_id: string | null;
  price: number;
  original_price: number | null;
  discount: Discount | null;
}

export interface ProductVariantDimension {
  dimension: Dimension;
  type: DimensionType;
  value: number;
}

export interface ProductVariantRemainder {
  stock_id: string;
  quantity: number;
  label: string | null;
}

export interface ProductVariantOptionValue {
  id: string;
  name: string | null;
  color: string | null;
}

export interface ProductVariantOption {
  id: string;
  name: string | null;
  type: VariantOptionType | null;
  value: ProductVariantOptionValue;
}

export interface ProductVariant {
  id: string;
  sku: string | null;
  barcode: string | null;
  name: string | null;
  price: number;
  original_price: number | null;
  discount: Discount | null;
  default_modifiers?: {
    modifiers: {
      modifier_id: string;
      modifiers_group_id: string | null;
      quantity: number;
    }[];
    hash: string | null;
  } | null;
  prices?: ProductVariantPrice[];
  dimensions?: ProductVariantDimension[];
  remainders?: ProductVariantRemainder[];
  options?: ProductVariantOption[];
}

export interface Product {
  id: string;
  short_id: string;
  slug: string | null;
  name: string | null;
  description: string | null;
  unit_type: UnitType;
  weight: number | null;
  quantity_step: number | null;
  is_promotion_reward: boolean;
  categories: Category[];
  images: Media[];
  variants?: ProductVariant[];
  features?: Feature[];
  features_groups: FeaturesGroup[];
  modifiers?: ProductModifier[];
  modifiers_groups?: ProductModifiersGroup[];
  seo?: Seo;
}

export interface ListProductsRequest extends ListRequest {
  category_id?: string;
  features?: {
    [key: string]: string;
  };
  f?: {
    [key: string]: string;
  };
  city_id?: string;
  stock_id?: string;
  collection_id?: string;
  min_price?: number | string;
  max_price?: number | string;
  featured_categories?: boolean;
  promotion_reward?: TernaryFilter;
  context_type?: ProductContextType;
  context_id?: string;
}

export interface ViewProductRequest extends InclusionRequest {
  stock_id?: string;
}

export interface ProductVariantPriceCalculation {
  price: number;
  original_price: number | null;
  discount: Discount | null;
  modifiers_hash: string | null;
}

export interface ProductModifiersRequest {
  modifier_id: string;
  modifiers_group_id?: string | null;
  quantity: number;
}

export interface ProductVariantPriceCalculationRequest {
  city_id?: string;
  stock_id?: string;
  modifiers?: ProductModifiersRequest[];
}
