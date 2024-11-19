export interface ClientConfig {
  baseUrl?: string;
  token?: string;
  client?: string;
  timezone?: string;
  fetchOptions?: any;
}
export interface InclusionRequest {
  with?: string;
}
export interface PaginationRequest {
  count?: number;
  page?: number;
}
export interface SearchRequest {
  search?: string;
}
export interface OrderingRequest {
  order_by?: string;
}
export interface ListRequest extends PaginationRequest, InclusionRequest, SearchRequest, OrderingRequest {
}
export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: {
    previous?: string | null;
    next?: string | null;
  };
  has_previous_page: boolean;
  has_next_page: boolean;
  elements: {
    type: 'page' | 'placeholder';
    page: number | null;
    active: boolean;
  }[];
}
export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}
export declare class Client {
  private readonly baseUrl;
  private token;
  private readonly client;
  private readonly timezone;
  private readonly fetchFunction;
  private readonly fetchOptions;
  static build(config?: ClientConfig | null | undefined, fetcher?: any): Client;
  private constructor();
  setToken(token: string | null): Client;
  request(method: string, path: string, body?: any, apiToken?: string | null): Promise<any>;
}

export declare abstract class AbstractResource {
  protected client: Client;
  constructor(client: Client);
  protected getStoreUrl(storeId: string, path: string, query?: any): string;
  protected getUrl(path: string, query?: any): string;
  protected getPaginatedResponse<T>(response: any): PaginatedResponse<T>;
  protected getResponse<T>(response: any): T;
}
export declare class ZenkyError extends Error {
  readonly err: ApiError | null;
  constructor(message: string, error: ApiError | null);
}
export declare class ZenkyStorefront {
  protected readonly client: Client;
  readonly store: StoreResource;
  readonly auth: AuthenticationResource;
  readonly customer: CustomersResource;
  readonly categories: CategoriesResource;
  readonly products: ProductsResource;
  readonly addresses: AddressesResource;
  readonly orders: OrdersResource;
  readonly collections: CollectionsResource;
  readonly offers: OffersResource;
  readonly articles: ArticlesResource;
  readonly feedback: FeedbackResource;
  constructor(config?: ClientConfig, fetcher?: any);
  setApiToken(token: string | null): ZenkyStorefront;
}

export interface Phone {
  number: string;
  country: string;
  national: string;
}
export interface GeoLocation {
  latitude: number;
  longitude: number;
}
export interface Discount {
  difference: number;
  percentage: number;
}
export declare enum DiscountType {
  Amount = "amount",
  Percentage = "percentage"
}
export declare enum ContactType {
  Email = "email",
  Website = "website",
  Vk = "vk",
  Facebook = "facebook",
  Instagram = "instagram",
  Twitter = "twitter",
  Ok = "ok",
  Tiktok = "tiktok"
}
export interface Contact {
  type: ContactType;
  value: string;
}
export interface ScheduleDay {
  hours: string;
}
export declare enum TernaryFilter {
  Yes = "yes",
  No = "no",
  Both = "both"
}
export interface Schedule {
  is_open_now: boolean;
  opening_at: string | null;
  closing_at: string | null;
  days: {
    monday: ScheduleDay | null;
    tuesday: ScheduleDay | null;
    wednesday: ScheduleDay | null;
    thursday: ScheduleDay | null;
    friday: ScheduleDay | null;
    saturday: ScheduleDay | null;
    sunday: ScheduleDay | null;
  };
}
export interface ApiError {
  message: string;
  original_message: string;
  http_code: number;
  error_code: string;
  meta: any;
}
export declare enum OrderAuthenticationMethod {
  Disabled = "disabled",
  Preauth = "preauth",
  Confirmation = "confirmation"
}
export declare enum AddressesProvider {
  Dadata = "dadata",
  Manual = "manual"
}
export declare enum RecaptchaAction {
  Registration = "registration",
  ResendRegistrationCode = "resend_registration_code",
  ResetPassword = "reset_password",
  OrderSubmission = "order_submission",
  FeedbackRequest = "feedback_request",
  CallbackRequest = "callback_request"
}
export interface PhoneRequest {
  number: string;
  country: string;
}

export interface DeliveryAddress {
  id: string;
  resolver: AddressesProvider;
  name: string | null;
  address: string;
  coordinates: GeoLocation | null;
  country: string | null;
  city: string | null;
  settlement: string | null;
  street: string | null;
  house: string | null;
  block: string | null;
  apartment: string | null;
  entrance: string | null;
  floor: string | null;
  has_intercom: boolean;
}
export interface ExistedDeliveryAddressRequest {
  id: string;
}
export interface DadataDeliveryAddressRequest {
  name?: string;
  address: string;
  house?: string;
  block?: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  has_intercom?: boolean;
}
export interface ManualDeliveryAddressRequest {
  name?: string;
  city?: string;
  street?: string;
  house?: string;
  block?: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  has_intercom?: boolean;
}
export interface ArticleCategory {
  id: string;
  short_id: string;
  slug: string | null;
  name: string | null;
}
export interface Article {
  id: string;
  short_id: string;
  slug: string | null;
  title: string | null;
  intro: string | null;
  body: string | null;
  updated_at: string;
  cover: Media | null;
  category?: ArticleCategory | null;
}
export interface ListArticlesRequest extends ListRequest {
  category_id?: string;
}
export declare class ArticlesResource extends AbstractResource {
  getArticleCategories(storeId: string): Promise<PaginatedResponse<ArticleCategory>>;
  getArticleCategory(storeId: string, categoryId: string): Promise<ArticleCategory>;
  getArticles(storeId: string, request?: ListArticlesRequest): Promise<PaginatedResponse<ArticleCategory>>;
  getArticle(storeId: string, articleId: string, request?: InclusionRequest): Promise<ArticleCategory>;
}
export interface FeatureValue {
  id: string;
  alias: string;
  name: string | null;
  range: number | null;
}
export declare enum FeatureType {
  Select = "select",
  MutipleSelect = "mutiple_select",
  Checkboxes = "checkboxes",
  Radios = "radios",
  Range = "range",
  Text = "text"
}
export declare enum FeatureRange {
  Integer = "integer",
  Float = "float"
}
export interface Feature {
  id: string;
  alias: string;
  name: string | null;
  filterable: boolean;
  type: FeatureType;
  range: FeatureRange | null;
  values: FeatureValue[];
}
export interface FeaturesGroup {
  id: string;
  name: string | null;
  description: string | null;
  features: Feature[];
}
export declare class CategoriesResource extends AbstractResource {
  getCategories(storeId: string, request?: CategoriesListRequest): Promise<PaginatedResponse<Category>>;
  getCategoriesTree(storeId: string, request?: InclusionRequest): Promise<NestedCategory[]>;
  getCategory(storeId: string, categoryId: string, request?: InclusionRequest): Promise<Category>;
  getFeaturesGroups(storeId: string, categoryId: string): Promise<FeaturesGroup[]>;
  getFeatures(storeId: string, categoryId: string): Promise<Feature[]>;
}
export interface Category {
  id: string;
  short_id: string;
  parent_id: string | null;
  is_featured: boolean;
  slug: string | null;
  name: string | null;
  description: string | null;
  cover?: Media | null;
  seo?: Seo | null;
}
export interface NestedCategory extends Category {
  children: NestedCategory[];
}
export interface CategoriesListRequest extends ListRequest {
  featured?: boolean;
}export interface SeoMetaTagAttribute {
  attribute: string;
  value: string;
}
export interface SeoMetaTag {
  name: SeoMetaTagAttribute;
  value: SeoMetaTagAttribute;
  additional: SeoMetaTagAttribute[];
}
export interface Seo {
  title: string | null;
  description: string | null;
  meta: SeoMetaTag[];
}
export interface Image {
  url: string;
  width: number;
  height: number;
}
export interface Media {
  placeholder: Image | null;
  medium: Image | null;
  large: Image | null;
  xlarge: Image | null;
  hd: Image | null;
}
export interface ProductsCollection {
  id: string;
  name: string | null;
  description: string | null;
  cover: Media | null;
}
export interface CollectionsListRequest extends PaginationRequest, SearchRequest, OrderingRequest {
}
export declare class CollectionsResource extends AbstractResource {
  getCollections(storeId: string, request?: CollectionsListRequest): Promise<PaginatedResponse<ProductsCollection>>;
  getCollection(storeId: string, id: string): Promise<ProductsCollection>;
}
export interface BonusesLevel {
  id: string;
  name: string;
  expenses: number;
  cashback_rate: number | null;
  payment_rate: number | null;
}
export interface LoyaltyRates {
  cashback: number | null;
  payment: number | null;
}
export declare enum BonusesTransactionType {
  Increase = "increase",
  Decrease = "decrease"
}
export declare enum BonusesTransactionStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Cancelled = "cancelled",
  Rejected = "rejected",
  Refunded = "refunded",
  PartiallyRefunded = "partially_refunded"
}
export declare enum BonusesTransactionReason {
  Manual = "manual",
  Cashback = "cashback",
  ReferralReward = "referral_reward",
  RecruitReward = "recruit_reward",
  Payment = "payment",
  Cancellation = "cancellation",
  Refund = "refund",
  Adjustment = "adjustment",
  WelcomeBonuses = "welcome_bonuses",
  PromotionReward = "promotion_reward",
  External = "external"
}
export interface BonusesTransaction {
  id: string;
  order_id: string | null;
  type: BonusesTransactionType;
  status: BonusesTransactionStatus;
  reason: BonusesTransactionReason;
  amount: number;
  source_amount: number | null;
  created_at: string;
  confirmed_at: string | null;
  cancelled_at: string | null;
}
export interface ListBonusesTransactionsRequest extends PaginationRequest {
  type?: BonusesTransactionType;
  status?: BonusesTransactionStatus;
  reason?: BonusesTransactionReason;
}
export interface ListCustomerBonusesTransactionsRequest extends ListBonusesTransactionsRequest {
  order_id?: string;
}
export declare enum Gender {
  Female = "female",
  Male = "male",
  Other = "other"
}
export interface CustomerSettings {
  onesignal_id: string | null;
  device_id: string | null;
  device_token: string | null;
  device_os: string | null;
  barcode: string | null;
  qrcode: string | null;
}
export interface CustomerLoyaltyProfile {
  referral_program: {
    code: string;
    join_url: string;
    invite_url: string;
  };
  balance: number;
  bonuses_level: BonusesLevel | null;
  rates: LoyaltyRates | null;
  settings?: CustomerSettings;
  avatar?: Media | null;
}
export interface Customer {
  id: string;
  store_profile_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: Phone;
  gender: Gender;
  birth_date: string | null;
  registered_at: string;
  loyalty: CustomerLoyaltyProfile | null;
}

export interface UpdateCustomerProfileRequest {
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  birth_date?: string;
  password?: string;
  current_password?: string;
}

export interface RemoveCustomerProfileRequest {
  password: string;
}

export interface UpdateCustomerSettingsRequest {
  onesignal_id?: string;
  device_id?: string;
  device_token?: string;
  device_os?: string;
  barcode?: string;
  qrcode?: string;
}

export interface DeliveryAddressRequest {
  delivery_address: DadataDeliveryAddressRequest | ManualDeliveryAddressRequest;
}

export enum AcquiringType {
  CloudPayments = 'cloudpayments',
}

export enum PaymentSystemType {
  Visa = 'visa',
  MasterCard = 'master-card',
  MIR = 'mir',
  Maestro = 'maestro',
  AmericanExpress = 'american-express',
  DinersClub = 'diners-club',
  Discover = 'discover',
  JCB = 'jcb',
  UnionPay = 'union-pay',
}

export interface PaymentSystem {
  id: PaymentSystemType;
  name: string;
  logos: {
    black: string | null;
    white: string | null;
    colored: string | null;
  };
}

export interface BankInfo {
  id: string;
  name: string;
  url: string;
  background_colors: string[];
  primary_background_color: string;
  background_style: 'dark' | 'white';
  logo_style: 'dark' | 'white';
  text_color: string;
  logos: {
    png: string | null;
    svg: string | null;
  };
  payment_system: PaymentSystem;
}

export interface CustomerPaymentMethod {
  id: string;
  acquiring_type: AcquiringType;
  card_type: PaymentSystemType;
  card_first_six: string;
  card_last_four: string;
  name: string;
  bank: BankInfo | null;
}

export declare class CustomersResource extends AbstractResource {
  getProfile(storeId: string, request?: InclusionRequest, apiToken?: string): Promise<Customer>;
  updateProfile(storeId: string, request: UpdateCustomerProfileRequest, apiToken?: string): Promise<Customer>;
  removeProfile(storeId: string, request: RemoveCustomerProfileRequest, apiToken?: string): Promise<boolean>;
  getSettings(storeId: string, apiToken?: string): Promise<CustomerSettings>;
  updateSettings(storeId: string, request: UpdateCustomerSettingsRequest, apiToken?: string): Promise<CustomerSettings>;
  getAddresses(storeId: string, request?: ListRequest, apiToken?: string): Promise<PaginatedResponse<DeliveryAddress>>;
  createAddress(storeId: string, request: DeliveryAddressRequest, apiToken?: string): Promise<DeliveryAddress>;
  updateAddress(storeId: string, addressId: string, request: DeliveryAddressRequest, apiToken?: string): Promise<DeliveryAddress>;
  deleteAddress(storeId: string, addressId: string, apiToken?: string): Promise<boolean>;
  getPaymentMethods(storeId: string, request?: PaginationRequest, apiToken?: string): Promise<PaginatedResponse<CustomerPaymentMethod>>;
  deletePaymentMethod(storeId: string, paymentMethodId: string, apiToken?: string): Promise<boolean>;
  getBonusesTransactions(storeId: string, request?: ListCustomerBonusesTransactionsRequest, apiToken?: string): Promise<PaginatedResponse<BonusesTransaction>>;
}
export interface Feedback {
  id: string;
  name: string | null;
  email: string | null;
  phone: Phone | null;
  comment: string | null;
  created_at: string;
}
export interface FeedbackRequest {
  name?: string;
  email?: string;
  phone?: PhoneRequest;
  comment?: string;
}
export interface CallbackRequest {
  phone: PhoneRequest;
}
export declare class FeedbackResource extends AbstractResource {
  createFeedback(storeId: string, request: FeedbackRequest): Promise<Feedback>;
  createCallback(storeId: string, request: CallbackRequest): Promise<boolean>;
}
export interface Modifier {
  id: string;
  sku: string | null;
  name: string | null;
  price: number | null;
}
export interface BasicModifiersGroup {
  id: string;
  name: string | null;
}
export interface ModifiersGroup extends BasicModifiersGroup {
  modifiers: Modifier[];
}
export interface ProductModifier {
  modifier: Modifier;
  is_required: boolean;
  min_quantity: number | null;
  max_quantity: number | null;
}
export interface ProductModifiersGroup {
  group: ModifiersGroup;
  is_required: boolean;
  min_quantity: number | null;
  max_quantity: number | null;
}
export interface OfferBanner {
  title: string | null;
  description: string | null;
  image: Media | null;
}
export interface OfferArticle {
  title: string | null;
  intro: string | null;
  body: string | null;
  cover: Media | null;
}
export interface Offer {
  id: string;
  short_id: string;
  slug: string | null;
  banners: {
    desktop: OfferBanner | null;
    mobile: OfferBanner | null;
  };
  article?: OfferArticle | null;
}
export declare class OffersResource extends AbstractResource {
  getOffers(storeId: string, request?: ListRequest): Promise<PaginatedResponse<Offer>>;
  getOffer(storeId: string, offerId: string, request?: InclusionRequest): Promise<Offer>;
}
export declare enum UnitType {
  Piece = "piece",
  Gram = "gram",
  Kilogram = "kilogram",
  Meter = "meter"
}
export declare enum Dimension {
  Weight = "weight",
  Width = "width",
  Height = "height",
  Length = "length"
}
export declare enum DimensionType {
  Netto = "netto",
  Brutto = "brutto"
}
export declare enum VariantOptionType {
  Color = "color"
}
export declare enum ProductContextType {
  Category = "category",
  Group = "group",
  VariantOption = "variant_option",
  VariantOptionValue = "variant_option_value"
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
export declare class ProductsResource extends AbstractResource {
  getProducts(storeId: string, request?: ListProductsRequest): Promise<PaginatedResponse<Product>>;
  getProduct(storeId: string, productId: string, request?: ViewProductRequest): Promise<Product>;
  getProductVariantPrice(storeId: string, productId: string, variantId: string, request: ProductVariantPriceCalculationRequest): Promise<ProductVariantPriceCalculation>;
}
export interface Stock {
  id: string;
  name: string | null;
  description: string | null;
  address: string | null;
  coordinates: GeoLocation | null;
  links: Contact[];
  phones: Phone[];
  schedule: Schedule | null;
}
export interface DeliveryZone {
  id: string;
  name: string | null;
  coordinates: GeoLocation[];
  description: string | null;
  color: string | null;
  min_price: number | null;
  free_delivery_price: number | null;
  delivery_price: number | null;
  delivery_time: string | null;
}
export interface City {
  id: string;
  is_default: boolean;
  name: string | null;
  timezone: string;
  coordinates: GeoLocation | null;
  stocks: Stock[];
  delivery_zones: DeliveryZone[];
}
export interface StoreSettings {
  country: string;
  currency: string;
  orders: {
    authentication_method: OrderAuthenticationMethod;
    use_early_delivery: boolean;
    addresses_provider: AddressesProvider;
  };
  products: {
    use_stock_filter: boolean;
  };
  loyalty: {
    enabled: boolean;
  };
  recaptcha: {
    actions: RecaptchaAction[];
    key: string;
  } | null;
  websockets: {
    app_id: string;
    app_key: string;
    options: {
      host: string;
      port: number;
    };
  } | null;
}
export interface Store {
  id: string;
  name: string;
  domain: string | null;
  app_store_url: string | null;
  google_play_url: string | null;
  logo: Media | null;
  square_logo: Media | null;
  links: Contact[];
  phones: Phone[];
  cities: City[];
  settings: StoreSettings;
}
export declare class StoreResource extends AbstractResource {
  getStore(storeId: string): Promise<Store>;
  getStoreByBundleId(bundleId: string): Promise<Store>;
}
export type OrderCredentials = string | {
  id: string;
  token: string;
  api_token?: string;
};
export declare enum DeliveryMethod {
  Delivery = "delivery",
  Pickup = "pickup",
  OnPremise = "on_premise"
}
export interface OrderStatusKind {
  Pending: 'pending';
  AwaitingPayment: 'awaiting_payment';
  Submitted: 'submitted';
  Exported: 'exported';
  Packing: 'packing';
  Ready: 'ready';
  AwaitingDelivery: 'awaiting_delivery';
  Delivering: 'delivering';
  Delivered: 'delivered';
  Rejected: 'rejected';
  Cancelled: 'cancelled';
  Completed: 'completed';
  Custom: 'custom';
}
export declare enum OrderPaymentTransactionType {
  Payment = "payment",
  Refund = "refund"
}
export declare enum PaymentMethod {
  Cash = "cash",
  CreditCard = "credit-card",
  CloudPayments = "cloudpayments",
  CardToken = "card_token",
  Bonuses = "bonuses"
}
export declare enum OrderPaymentTransactionStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Cancelled = "cancelled",
  PendingRefund = "pending_refund",
  Refunding = "refunding",
  Refunded = "refunded"
}
export interface OrderStatus {
  id: string;
  kind: OrderStatusKind;
  name: string | null;
}
export interface OrderStatusChange extends OrderStatus {
  transitioned_at: string;
}
export interface OrderStatusProgress extends OrderStatus {
  transitioned_at: string | null;
}
export interface CashPaymentMeta {
  change?: number | null;
  bill?: number | null;
}
export declare enum CloudpaymentsChargeType {
  Auth = "auth",
  Charge = "charge"
}
export interface CloudpaymentsPaymentMeta {
  widget: {
    publicId: string;
    description: string;
    amount: number;
    currency: string;
    invoiceId: string;
    accountId?: string;
    skin: string;
  };
  payment_page_url: string;
  charge_type: CloudpaymentsChargeType;
  charged_as: CloudpaymentsChargeType | null;
}
export interface OrderPaymentTransaction {
  id: string;
  type: OrderPaymentTransactionType;
  status: OrderPaymentTransactionStatus;
  method: PaymentMethod;
  amount: number;
  created_at: string;
  confirmed_at: string | null;
  authorization_confirmed_at: string | null;
  cancelled_at: string | null;
  refunded_at: string | null;
  refund_failed_at: string | null;
  transaction_meta: CashPaymentMeta | CloudpaymentsPaymentMeta | null;
}
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
}
export interface Order {
  id: string;
  token: string;
  number: string | null;
  delivery_method: DeliveryMethod | null;
  total_price: number;
  original_total_price: number | null;
  discount: Discount | null;
  notes: string | null;
  created_at: string;
  submitted_at: string | null;
  deliver_at: string | null;
  meta_data: {
    deliver_at?: string | null;
    on_premise?: {
      table: string | null;
    } | null;
  } | null;
  status: OrderStatusChange | null;
  variants: OrderProductVariant[];
  city: City | null;
  stock: Stock | null;
  customer?: Customer | null;
  delivery_address?: DeliveryAddress | null;
  delivery_zone?: DeliveryZone;
  statuses?: OrderStatus[];
  progress?: OrderStatusProgress[];
  payments?: OrderPaymentTransaction[];
}
export interface OrderPaymentMethod {
  id: PaymentMethod;
  name: string;
  meta?: {
    payment_page_url?: string;
  };
  token?: {
    id: string;
    type: string;
    first_six: string;
    last_four: string;
  };
}
export interface OrderDeliveryMethod {
  id: DeliveryMethod;
  name: string;
  min_price: number | null;
  delivery_price: number | null;
  discount: {
    type: DiscountType;
    value: number;
  } | null;
}
export declare enum OrderOptionKind {
  PersonsCount = "persons_count",
  DeliveryTime = "delivery_time"
}
export interface OrderOption {
  id: string;
  kind: OrderOptionKind;
  meta: any;
}
export interface OrderSettings {
  payment_methods: OrderPaymentMethod[];
  delivery_methods: OrderDeliveryMethod[];
  options: OrderOption[];
}
export declare enum OrderCartCheckerResultReason {
  PriceMismatch = "price_mismatch",
  OutOfStock = "out_of_stock",
  Unavailable = "unavailable"
}
export declare enum OrderCartCheckerResultAction {
  None = "none",
  Cleanup = "cleanup"
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
export interface ListOrdersRequest extends ListRequest {
  submitted_from?: string;
  submitted_till?: string;
  order_status_id?: string;
  city_id?: string;
  submission_period?: string;
}
export interface CreateOrderRequest {
  city_id: string;
}
export interface OrderProductVariantRequest {
  product_variant_id: string;
  quantity: number;
  promotion_id?: string;
  promotion_reward_id?: string;
  modifiers?: ProductModifiersRequest[];
}
export interface SetOrderCustomerRequest {
  phone?: PhoneRequest;
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  birth_date?: string;
}
export interface SetOrderDeliveryRequest {
  delivery_method: DeliveryMethod;
  delivery_address?: ExistedDeliveryAddressRequest | DadataDeliveryAddressRequest | ManualDeliveryAddressRequest;
  stock_id?: string;
  on_premise?: {
    table: string;
  };
  deliver_at?: string;
}
export interface OrderPaymentMethodRequest {
  method: PaymentMethod;
  amount?: number | string;
  bill?: number | string;
  save_card?: boolean;
  card_token_id?: string;
}
export interface SetOrderPaymentsRequest {
  payments: OrderPaymentMethodRequest[];
}
export interface OrderCheckoutBonusesPreview {
  bonuses: number;
  unpaid: number;
}
export interface OrderCheckoutTotalPayment {
  id: string;
  method: PaymentMethod;
  amount: number;
  bill?: number;
  change?: number;
  save_card?: boolean;
  card_token_id?: string;
}
export interface OrderCheckoutTotal {
  min_price: number | null;
  subtotal: number;
  original_subtotal: number | null;
  delivery_price: number | null;
  delivery_discount: number | null;
  discount: Discount | null;
  total: number;
  original_total: number | null;
  max_bonuses_payment: number | null;
  cashback: number | null;
  payments: OrderCheckoutTotalPayment[];
}
export interface OrderCheckoutRequest {
  notes?: string;
  persons_count?: string | number;
}
export declare enum ConfirmationMethod {
  Sms = "sms",
  Call = "call"
}
export interface OrderCheckoutResult {
  confirmation: {
    required: boolean;
    method: ConfirmationMethod | null;
    phone: Phone | null;
  };
  online_payment: {
    required: boolean;
    payment_page_url: string | null;
  };
  order: Order;
}
export interface ConfirmOrderRequest {
  code: string | number;
}
export interface OrderPromotionReward {
  id: string;
  promotion_id: string;
  promotion_reward_id: string;
  item_id: string | null;
  amount: number | null;
  total_amount: number | null;
  count: number;
}
export declare class OrdersResource extends AbstractResource {
  protected getOrderUrl(storeId: string, credentials: OrderCredentials, path: string, request?: any): string;
  protected getApiToken(credentials: OrderCredentials): undefined | string;
  getOrders(storeId: string, request?: ListOrdersRequest, apiToken?: string | null): Promise<PaginatedResponse<Order>>;
  createOrder(storeId: string, request: CreateOrderRequest, apiToken?: string | null): Promise<Order>;
  getOrder(storeId: string, credentials: OrderCredentials, request?: InclusionRequest): Promise<Order>;
  getOrderSettings(storeId: string, credentials: OrderCredentials): Promise<OrderSettings>;
  addProductVariantToOrder(storeId: string, credentials: OrderCredentials, request: OrderProductVariantRequest): Promise<Order>;
  removeProductVariantFromOrder(storeId: string, credentials: OrderCredentials, request: OrderProductVariantRequest): Promise<Order>;
  checkProducts(storeId: string, credentials: OrderCredentials): Promise<OrderCartCheckerResult>;
  setOrderCustomer(storeId: string, credentials: OrderCredentials, request: SetOrderCustomerRequest): Promise<boolean>;
  setOrderDeliveryMethod(storeId: string, credentials: OrderCredentials, request: SetOrderDeliveryRequest): Promise<Order>;
  setOrderPayments(storeId: string, credentials: OrderCredentials, request: SetOrderPaymentsRequest): Promise<Order>;
  getOrderBonusesPreview(storeId: string, credentials: OrderCredentials, amount: number | string): Promise<OrderCheckoutBonusesPreview>;
  getOrderTotal(storeId: string, credentials: OrderCredentials): Promise<OrderCheckoutTotal>;
  checkoutOrder(storeId: string, credentials: OrderCredentials, request: OrderCheckoutRequest): Promise<OrderCheckoutResult>;
  confirmOrder(storeId: string, credentials: OrderCredentials, request: ConfirmOrderRequest): Promise<boolean>;
  resendOrderConfirmationCode(storeId: string, credentials: OrderCredentials): Promise<boolean>;
  getOrderBonusesTransactions(storeId: string, credentials: OrderCredentials, request?: ListBonusesTransactionsRequest): Promise<PaginatedResponse<BonusesTransaction>>;
  getOrderCashbackTransaction(storeId: string, credentials: OrderCredentials): Promise<BonusesTransaction>;
  dispatchPromotionsChecker(storeId: string, credentials: OrderCredentials): Promise<boolean>;
  getOrderPromotionRewards(storeId: string, credentials: OrderCredentials): Promise<OrderPromotionReward>;
}
export enum AddressSuggestionsProvider {
  DADATA = 'dadata',
}
export interface DadataAddressSuggestion {
  value: string | null;
  unrestricted_value: string | null;
  data: {
    postal_code: string | null;
    country: string | null;
    country_code: string | null;
    federal_district: string | null;
    region_fias_id: string | null;
    region_kladr_id: string | null;
    region_iso_code: string | null;
    region_with_type: string | null;
    region_type: string | null;
    region_type_full: string | null;
    region: string | null;
    area_fias_id: string | null;
    area_kladr_id: string | null;
    area_with_type: string | null;
    area_type: string | null;
    area_type_full: string | null;
    area: string | null;
    city_fias_id: string | null;
    city_kladr_id: string | null;
    city_with_type: string | null;
    city_type: string | null;
    city_type_full: string | null;
    city: string | null;
    city_area: string | null;
    city_district_fias_id: string | null;
    city_district_with_type: string | null;
    city_district_type: string | null;
    city_district_type_full: string | null;
    city_district: string | null;
    settlement_fias_id: string | null;
    settlement_kladr_id: string | null;
    settlement_with_type: string | null;
    settlement_type: string | null;
    settlement_type_full: string | null;
    settlement: string | null;
    street_fias_id: string | null;
    street_kladr_id: string | null;
    street_with_type: string | null;
    street_type: string | null;
    street_type_full: string | null;
    street: string | null;
    stead_fias_id: string | null;
    stead_cadnum: string | null;
    stead_type: string | null;
    stead_type_full: string | null;
    stead: string | null;
    house_fias_id: string | null;
    house_kladr_id: string | null;
    house_cadnum: string | null;
    house_type: string | null;
    house_type_full: string | null;
    house: string | null;
    block_type: string | null;
    block_type_full: string | null;
    block: string | null;
    flat_fias_id: string | null;
    flat_cadnum: string | null;
    flat_type: string | null;
    flat_type_full: string | null;
    flat: string | null;
    flat_area: string | null;
    square_meter_price: string | null;
    flat_price: string | null;
    room_fias_id: string | null;
    room_cadnum: string | null;
    room_type: string | null;
    room_type_full: string | null;
    postal_box: string | null;
    fias_id: string | null;
    fias_level: string | null;
    fias_actuality_state: string | null;
    kladr_id: string | null;
    geoname_id: string | null;
    capital_marker: string | null;
    okato: string | null;
    oktmo: string | null;
    tax_office: string | null;
    tax_office_legal: string | null;
    timezone: string | null;
    geo_lat: string | null;
    geo_lon: string | null;
    qc_geo: string | null;
    beltway_hit: string | null;
    beltway_distance: string | null;
    metro?: {
      name: string | null;
      line: string | null;
      distance: string | null;
    }[] | null;
  };
}
export interface AddressSuggestions {
  provider: AddressSuggestionsProvider;
  suggestions: DadataAddressSuggestion[];
}
export interface AddressSuggestionsRequest {
  query: string;
  city_id?: string;
  count?: number;
}
export declare class AddressesResource extends AbstractResource {
  getAddressSuggestions(storeId: string, request: AddressSuggestionsRequest): Promise<AddressSuggestions>;
}
export interface AbstractRegistrationRequest {
  phone: PhoneRequest;
  password?: string;
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  birth_date?: string;
}

export interface RegistrationRequest extends AbstractRegistrationRequest {
  referrer_code?: string;
  referrer_id?: string;
}

export interface ConfirmRegistrationRequest extends AbstractRegistrationRequest {
  code: string | number;
}

export interface AuthConfirmationStatus {
  confirmation_required: boolean;
  queued_to: string;
  method: ConfirmationMethod;
}

export interface AuthResult {
  token: string;
}

export interface ResendAuthConfirmationRequest {
  phone: PhoneRequest;
}

export interface DispatchPasswordResetRequest {
  phone: PhoneRequest;
}

export interface ResetPasswordRequest {
  phone: PhoneRequest;
  code: string | number;
  password: string;
}

export interface LoginRequest {
  phone: PhoneRequest;
  password: string;
}

export interface CheckPhoneRequest {
  phone: PhoneRequest;
}

export interface PhoneCheckResult {
  registered: boolean;
  confirmed: boolean;
}

export declare class AuthenticationResource extends AbstractResource {
  checkPhone(storeId: string, request: CheckPhoneRequest): Promise<PhoneCheckResult>;
  register(storeId: string, request: RegistrationRequest): Promise<AuthConfirmationStatus>;
  confirmRegistration(storeId: string, request: ConfirmRegistrationRequest): Promise<AuthResult>;
  resendRegistrationConfirmation(storeId: string, request: ResendAuthConfirmationRequest): Promise<AuthConfirmationStatus>;
  login(storeId: string, request: LoginRequest): Promise<AuthResult>;
  dispatchPasswordReset(storeId: string, request: DispatchPasswordResetRequest): Promise<AuthConfirmationStatus>;
  resetPassword(storeId: string, request: ResetPasswordRequest): Promise<AuthResult>;
}
