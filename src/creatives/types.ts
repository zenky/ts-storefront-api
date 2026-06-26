export enum CreativeType {
  HorizontalBanner = 'horizontal_banner',
  VerticalBanner = 'vertical_banner',
  Story = 'story',
}

export enum CreativeSlot {
  Desktop = 'desktop',
  MobileWeb = 'mobile_web',
  Default = 'default',
}

export enum CreativeMediaType {
  Image = 'image',
  Video = 'video',
}

export enum CreativeActionType {
  OpenLink = 'open_link',
  AddProductToCart = 'add_product_to_cart',
  ApplyPromocode = 'apply_promocode',
}

export enum CreativeLinkType {
  Product = 'product',
  Category = 'category',
  ProductsCollection = 'products_collection',
  Offer = 'offer',
  Article = 'article',
  CustomUrl = 'custom_url',
}

export interface CreativeMediaFile {
  url: string;
  width?: number;
  height?: number;
  mime_type?: string;
}

export interface CreativeMediaPoster {
  url: string;
  width: number;
  height: number;
}

export interface CreativeMedia {
  type: CreativeMediaType;
  files: CreativeMediaFile[];
  poster: CreativeMediaPoster | null;
}

export interface CreativeItem {
  slot: CreativeSlot;
  media: CreativeMedia;
  header: string | null;
  description: string | null;
}

export interface CreativeResource {
  id: string;
  slug: string;
  short_id: string;
}

export interface CreativeResourceId {
  id: string;
}

export interface CreativeCartActionProduct extends CreativeResource {
  name: string;
}

export interface CreativeCartActionProductVariant {
  id: string;
  price: number;
  original_price: number | null;
}

export type CreativeLink =
  | { type: CreativeLinkType.Product; target: CreativeResource }
  | { type: CreativeLinkType.Category; target: CreativeResource }
  | { type: CreativeLinkType.Offer; target: CreativeResource }
  | { type: CreativeLinkType.Article; target: CreativeResource }
  | { type: CreativeLinkType.ProductsCollection; target: CreativeResourceId }
  | { type: CreativeLinkType.CustomUrl; target: string };

export type CreativeAction =
  | { type: CreativeActionType.OpenLink; link: CreativeLink }
  | {
    type: CreativeActionType.AddProductToCart;
    product: CreativeCartActionProduct;
    product_variant: CreativeCartActionProductVariant;
  }
  | { type: CreativeActionType.ApplyPromocode; promocode: string };

export interface CreativeStorySlide {
  id: string;
  media: CreativeMedia;
  action: CreativeAction | null;
}

export interface Creative {
  id: string;
  type: CreativeType;
  items: CreativeItem[];
  slides?: CreativeStorySlide[];
  action: CreativeAction | null;
}

export interface CreativesRequest {
  sales_channel_id: string;
  city_id?: string;
}
