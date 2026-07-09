export enum CommerceEventName {
  PageViewed = 'page_viewed',
  CategoryViewed = 'category_viewed',
  ProductsCollectionViewed = 'products_collection_viewed',
  ProductViewed = 'product_viewed',
  ProductAddedToCart = 'product_added_to_cart',
  ProductRemovedFromCart = 'product_removed_from_cart',
  CartViewed = 'cart_viewed',
  CheckoutStarted = 'checkout_started',
  BannerClicked = 'banner_clicked',
}

export enum CommerceEventSource {
  Web = 'web',
  Mobile = 'mobile',
}

export enum CommerceEventStatus {
  Accepted = 'accepted',
  Duplicate = 'duplicate',
  Rejected = 'rejected',
  Failed = 'failed',
}

export enum CommerceEventErrorCode {
  NonArrayItem = 'non_array_item',
  ItemTooLarge = 'item_too_large',
  ForbiddenField = 'forbidden_field',
  MissingRequiredField = 'missing_required_field',
  UnknownSchema = 'unknown_schema',
  InactiveSchema = 'inactive_schema',
  InvalidSource = 'invalid_source',
  InvalidTimestamp = 'invalid_timestamp',
  OccurredAtTooFarFuture = 'occurred_at_too_far_future',
  OccurredAtTooOld = 'occurred_at_too_old',
  InvalidContext = 'invalid_context',
  InvalidProperties = 'invalid_properties',
  PiiDetected = 'pii_detected',
  ReferenceNotFound = 'reference_not_found',
  StorageUnavailable = 'storage_unavailable',
  ServerEmissionDisabled = 'server_emission_disabled',
  WriterFailed = 'writer_failed',
}

export interface CommerceEvent {
  event_id: string;
  event_name: CommerceEventName;
  schema_version: 1;
  occurred_at: string;
  source: CommerceEventSource;
  anonymous_id?: string;
  session_id?: string;
  order_id?: string;
  context?: Record<string, unknown>;
  properties?: Record<string, unknown>;
}

export interface CommerceEventResultItem {
  index: number;
  external_event_id: string;
  status: CommerceEventStatus;
  error_code?: CommerceEventErrorCode;
}

export interface CommerceEventsRequest {
  events: CommerceEvent[];
}

export interface CommerceEventsResult {
  accepted_count: number;
  duplicate_count: number;
  rejected_count: number;
  failed_count?: number;
  items: CommerceEventResultItem[];
}
