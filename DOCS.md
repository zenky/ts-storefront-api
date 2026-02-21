# Zenky Storefront API SDK (TypeScript)

Framework-agnostic SDK for integrating Zenky Storefront API into web apps (React, Vue, and others).

## Installation

```bash
# npm
npm install @zenky/storefront-api

# pnpm
pnpm add @zenky/storefront-api

# yarn
yarn add @zenky/storefront-api
```

## Quick Start

```ts
import { ZenkyStorefront } from '@zenky/storefront-api';

const bearerToken = 'eyJraWQiOiJrMSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJjdXN0b21lciJ9.VGhpcy1pcy1hLXJhbmRvbS1iZWFyZXItdG9rZW4';
const storeId = '7b7f3f8c-2d8d-4f58-9f58-4d8b8a1d6c11';

const zenky = new ZenkyStorefront({
  token: bearerToken, // raw token value (without "Bearer ")
});

const products = await zenky.products.getProducts(storeId);
console.log(products.items);
```

## ZenkyStorefront

`ZenkyStorefront` is the main entry point. It creates an API client and exposes all resources as properties.

```ts
new ZenkyStorefront(config?: ClientConfig, fetcher?: any)
```

### ClientConfig

```ts
interface ClientConfig {
  baseUrl?: string;       // default: https://storefront.zenky.io/v1
  baseAuthUrl?: string;   // default: https://auth.zenky.io/
  token?: string;         // Bearer token (without "Bearer " prefix)
  client?: string;        // sent as X-Zenky-Client, default: web
  timezone?: string;      // sent as X-Timezone, default: UTC
  fetchOptions?: any;     // merged into fetch options
}
```

### Set or clear Bearer token

```ts
const bearerToken = 'eyJraWQiOiJrMSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJjdXN0b21lciJ9.VGhpcy1pcy1hLXJhbmRvbS1iZWFyZXItdG9rZW4';
zenky.setApiToken(bearerToken);
zenky.setApiToken(null);
```

### Use custom fetch

```ts
const zenky = new ZenkyStorefront({}, fetch);
```

## Resources

After instantiation, use:

```ts
zenky.store
zenky.auth
zenky.customer
zenky.catalog
zenky.categories
zenky.products
zenky.addresses
zenky.orders
zenky.collections
zenky.offers
zenky.articles
zenky.feedback
zenky.loyalty
```

Use these exact property names (for example, `zenky.store`, not `zenky.stores`).

## Shared Request and Response Types

```ts
interface InclusionRequest {
  with?: string;
}

interface PaginationRequest {
  count?: number;
  page?: number;
}

interface SearchRequest {
  search?: string;
}

interface OrderingRequest {
  order_by?: string;
}

interface ListRequest extends PaginationRequest, InclusionRequest, SearchRequest, OrderingRequest {}

interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}
```

## Authentication and Tokens

- Global auth: set `config.token` once in `ZenkyStorefront`.
- Per-request auth: methods that include `apiToken?: string` can override the global token.
- API token fields (`config.token`, `apiToken`, `api_token`) are Bearer tokens; pass the raw token string (SDK adds `Authorization: Bearer ...`).
- `OrderCredentials.token` is an order access token used in request URL query, not an Authorization header.

### Order Credentials

```ts
type OrderCredentials =
  | string
  | {
      id: string;
      token: string;
      api_token?: string;
    };
```

Examples:

```ts
const orderId = 'f6d9f5a1-2b44-4f9c-95ae-5ec5f6dcd552';
const orderToken = 'K5f2kAGQbJqv3nP6wT9xY1zLmR8cD4uH';
const bearerToken = 'eyJraWQiOiJrMSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJjdXN0b21lciJ9.VGhpcy1pcy1hLXJhbmRvbS1iZWFyZXItdG9rZW4';

await zenky.orders.getOrder('7b7f3f8c-2d8d-4f58-9f58-4d8b8a1d6c11', {
  id: orderId,
  token: orderToken,
});

await zenky.orders.getOrder('7b7f3f8c-2d8d-4f58-9f58-4d8b8a1d6c11', {
  id: orderId,
  token: orderToken,
  api_token: bearerToken,
});
```

## Error Handling

The SDK throws `ZenkyError` for non-2xx responses.

```ts
import { ZenkyError } from '@zenky/storefront-api';

try {
  await zenky.products.getProducts('7b7f3f8c-2d8d-4f58-9f58-4d8b8a1d6c11');
} catch (error) {
  const err = error as ZenkyError;
  console.error(err.message);
  console.error(err.err); // ApiError | null
}
```

## API Reference

### Stores

#### `getStore`

```ts
zenky.store.getStore(storeId: string): Promise<Store>
```

Returns full store data for a specific store ID.

#### `getStoreByBundleId`

```ts
zenky.store.getStoreByBundleId(bundleId: string): Promise<Store>
```

Returns store data for a mobile app bundle identifier.

### Authentication

#### `checkPhone`

```ts
zenky.auth.checkPhone(storeId: string, request: CheckPhoneRequest): Promise<PhoneCheckResult>
```

Checks whether a phone number is already registered and confirmed.

#### `register`

```ts
zenky.auth.register(storeId: string, request: RegistrationRequest): Promise<AuthConfirmationStatus>
```

Starts customer registration.

#### `confirmRegistration`

```ts
zenky.auth.confirmRegistration(storeId: string, request: ConfirmRegistrationRequest): Promise<AuthResult>
```

Finishes registration with a verification code and returns a Bearer token.

#### `resendRegistrationConfirmation`

```ts
zenky.auth.resendRegistrationConfirmation(
  storeId: string,
  request: ResendAuthConfirmationRequest,
): Promise<AuthConfirmationStatus>
```

Resends the registration confirmation code.

#### `login`

```ts
zenky.auth.login(storeId: string, request: LoginRequest): Promise<AuthResult>
```

Signs in a customer and returns a Bearer token.

#### `dispatchPasswordReset`

```ts
zenky.auth.dispatchPasswordReset(
  storeId: string,
  request: DispatchPasswordResetRequest,
): Promise<AuthConfirmationStatus>
```

Sends a password reset confirmation code.

#### `resetPassword`

```ts
zenky.auth.resetPassword(storeId: string, request: ResetPasswordRequest): Promise<AuthResult>
```

Resets password with a confirmation code and returns a Bearer token.

#### `useAuthenticationModal`

```ts
zenky.auth.useAuthenticationModal(
  storeId: string,
  iframeContainer: string | HTMLElement,
  callback: (token: string, phone: PhoneRequest, storeId: string) => void,
  postmateParams: any = {},
): AuthenticationModalProvider
```

Creates an embeddable auth modal provider for browser apps.
Because it uses DOM APIs, call it only in a browser runtime.

`AuthenticationModalProvider`:

```ts
{
  initAuthenticationModal: () => Promise<boolean>;
  destroyAuthenticationModal: () => void;
}
```

### Customers

All methods below support `apiToken?: string` where shown. Use this parameter to send a specific Bearer token for that request.

### Customer Profile

#### `getProfile`

```ts
zenky.customer.getProfile(storeId: string, request?: InclusionRequest, apiToken?: string): Promise<Customer>
```

Returns the authenticated customer profile.

#### `updateProfile`

```ts
zenky.customer.updateProfile(
  storeId: string,
  request: UpdateCustomerProfileRequest,
  apiToken?: string,
): Promise<Customer>
```

Updates profile fields such as name, birth date, or password.

#### `removeProfile`

```ts
zenky.customer.removeProfile(
  storeId: string,
  request: RemoveCustomerProfileRequest,
  apiToken?: string,
): Promise<boolean>
```

Deletes the current customer profile.

### Customer Settings

#### `getSettings`

```ts
zenky.customer.getSettings(storeId: string, apiToken?: string): Promise<CustomerSettings>
```

Returns customer device/app settings.

#### `updateSettings`

```ts
zenky.customer.updateSettings(
  storeId: string,
  request: UpdateCustomerSettingsRequest,
  apiToken?: string,
): Promise<CustomerSettings>
```

Updates customer device/app settings.

### Customer Addresses

#### `getAddresses`

```ts
zenky.customer.getAddresses(
  storeId: string,
  request?: ListRequest,
  apiToken?: string,
): Promise<PaginatedResponse<DeliveryAddress>>
```

Returns saved customer delivery addresses (paginated).

#### `createAddress`

```ts
zenky.customer.createAddress(
  storeId: string,
  request: DeliveryAddressRequest,
  apiToken?: string,
): Promise<DeliveryAddress>
```

Creates a saved delivery address.

#### `updateAddress`

```ts
zenky.customer.updateAddress(
  storeId: string,
  addressId: string,
  request: DeliveryAddressRequest,
  apiToken?: string,
): Promise<DeliveryAddress>
```

Updates a saved delivery address.

#### `deleteAddress`

```ts
zenky.customer.deleteAddress(storeId: string, addressId: string, apiToken?: string): Promise<boolean>
```

Deletes a saved delivery address.

### Customer Payment Methods

#### `getPaymentMethods`

```ts
zenky.customer.getPaymentMethods(
  storeId: string,
  request?: PaginationRequest,
  apiToken?: string,
): Promise<PaginatedResponse<CustomerPaymentMethod>>
```

Returns saved customer payment methods.

#### `deletePaymentMethod`

```ts
zenky.customer.deletePaymentMethod(storeId: string, paymentMethodId: string, apiToken?: string): Promise<boolean>
```

Deletes a saved payment method.

### Customer Loyalty

#### `getBonusesTransactions`

```ts
zenky.customer.getBonusesTransactions(
  storeId: string,
  request?: ListCustomerBonusesTransactionsRequest,
  apiToken?: string,
): Promise<PaginatedResponse<BonusesTransaction>>
```

Returns customer loyalty bonus transactions.

#### `getBonusesBalance`

```ts
zenky.customer.getBonusesBalance(storeId: string, apiToken?: string): Promise<ResolverBonusesBalance>
```

Returns the current loyalty bonus balance.

### Customer Session

#### `revokeToken`

```ts
zenky.customer.revokeToken(storeId: string, apiToken?: string): Promise<boolean>
```

Revokes the current customer token (logs out).

### Catalog

#### `getRemoteCatalog`

```ts
zenky.catalog.getRemoteCatalog(storeId: string, request?: ShowCatalogRequest): Promise<RemoteCatalog>
```

Returns remote catalog metadata (including URL and hash).

#### `getCatalogFromRemoteUrl`

```ts
zenky.catalog.getCatalogFromRemoteUrl(storeId: string, request?: ShowCatalogRequest): Promise<CatalogItem[]>
```

Fetches catalog content from the remote catalog URL.

### Categories

#### `getCategories`

```ts
zenky.categories.getCategories(storeId: string, request?: CategoriesListRequest): Promise<PaginatedResponse<Category>>
```

Returns the categories list (paginated).

#### `getCategoriesTree`

```ts
zenky.categories.getCategoriesTree(storeId: string, request?: InclusionRequest): Promise<NestedCategory[]>
```

Returns categories as a nested tree.

#### `getCategory`

```ts
zenky.categories.getCategory(storeId: string, categoryId: string, request?: InclusionRequest): Promise<Category>
```

Returns a category by ID.

#### `getFeaturesGroups`

```ts
zenky.categories.getFeaturesGroups(storeId: string, categoryId: string): Promise<FeaturesGroup[]>
```

Returns grouped feature definitions for a category.

#### `getFeatures`

```ts
zenky.categories.getFeatures(storeId: string, categoryId: string): Promise<Feature[]>
```

Returns flat feature definitions for a category.

### Products

#### `getProducts`

```ts
zenky.products.getProducts(storeId: string, request?: ListProductsRequest): Promise<PaginatedResponse<Product>>
```

Returns a product list (paginated) with filters, search, and ordering.

#### `getProduct`

```ts
zenky.products.getProduct(storeId: string, productId: string, request?: ViewProductRequest): Promise<Product>
```

Returns a product by ID, optionally with included related data.

#### `getProductVariantPrice`

```ts
zenky.products.getProductVariantPrice(
  storeId: string,
  productId: string,
  variantId: string,
  request: ProductVariantPriceCalculationRequest,
): Promise<ProductVariantPriceCalculation>
```

Calculates variant price using selected modifiers and location context.

### Addresses

#### `getAddressSuggestions`

```ts
zenky.addresses.getAddressSuggestions(
  storeId: string,
  request: AddressSuggestionsRequest,
): Promise<AddressSuggestions>
```

Returns address autocomplete suggestions for delivery forms.

### Orders

### Overview

Orders API has two auth models:

- customer Bearer token via `apiToken`/`api_token`
- order token via `OrderCredentials`

When the `credentials` argument is provided as a plain string, that string is used as the `orderId`.

### Order List and Cart Management

#### `getOrders`

```ts
zenky.orders.getOrders(
  storeId: string,
  request?: ListOrdersRequest,
  apiToken?: string | null,
): Promise<PaginatedResponse<Order>>
```

Returns the customer orders list.

#### `createOrder`

```ts
zenky.orders.createOrder(
  storeId: string,
  request: CreateOrderRequest,
  apiToken?: string | null,
): Promise<Order>
```

Creates a new order in a specific city.

#### `getOrder`

```ts
zenky.orders.getOrder(storeId: string, credentials: OrderCredentials, request?: InclusionRequest): Promise<Order>
```

Returns full order data by credentials.

#### `addProductVariantToOrder`

```ts
zenky.orders.addProductVariantToOrder(
  storeId: string,
  credentials: OrderCredentials,
  request: OrderProductVariantRequest,
): Promise<Order>
```

Adds a product variant to the order cart.

#### `removeProductVariantFromOrder`

```ts
zenky.orders.removeProductVariantFromOrder(
  storeId: string,
  credentials: OrderCredentials,
  request: OrderProductVariantRequest,
): Promise<Order>
```

Removes a product variant from the cart (or decreases quantity).

#### `checkProducts`

```ts
zenky.orders.checkProducts(storeId: string, credentials: OrderCredentials): Promise<OrderCartCheckerResult>
```

Validates cart items for availability and price consistency.

#### `cancelOrder`

```ts
zenky.orders.cancelOrder(storeId: string, credentials: OrderCredentials): Promise<boolean>
```

Cancels an order.

#### `resendOrderConfirmationCode`

```ts
zenky.orders.resendOrderConfirmationCode(storeId: string, credentials: OrderCredentials): Promise<boolean>
```

Resends the order confirmation code.

#### `confirmOrder`

```ts
zenky.orders.confirmOrder(
  storeId: string,
  credentials: OrderCredentials,
  request: ConfirmOrderRequest,
): Promise<boolean>
```

Confirms order submission with a code.

### Checkout Preparation: Customer

#### `setOrderCustomer`

```ts
zenky.orders.setOrderCustomer(
  storeId: string,
  credentials: OrderCredentials,
  request: SetOrderCustomerRequest,
): Promise<boolean>
```

Sets customer identity and contact details for checkout.

### Checkout Preparation: Address / Delivery

#### `setOrderDeliveryMethod`

```ts
zenky.orders.setOrderDeliveryMethod(
  storeId: string,
  credentials: OrderCredentials,
  request: SetOrderDeliveryRequest,
): Promise<Order>
```

Sets delivery mode (delivery, pickup, on-premise) and delivery details.

### Checkout Preparation: Payments

#### `setOrderPayments`

```ts
zenky.orders.setOrderPayments(
  storeId: string,
  credentials: OrderCredentials,
  request: SetOrderPaymentsRequest,
): Promise<Order>
```

Sets one or multiple payment parts for the order.

### Checkout Preparation: Promocode

#### `getOrderPromocode`

```ts
zenky.orders.getOrderPromocode(
  storeId: string,
  credentials: OrderCredentials,
  request: SetOrderPromocodeRequest,
): Promise<OrderPromocode | null>
```

Returns current promocode details for the order.

#### `setOrderPromocode`

```ts
zenky.orders.setOrderPromocode(
  storeId: string,
  credentials: OrderCredentials,
  request: SetOrderPromocodeRequest,
): Promise<OrderPromocode>
```

Applies a promocode to the order.

#### `removeOrderPromocode`

```ts
zenky.orders.removeOrderPromocode(storeId: string, credentials: OrderCredentials): Promise<boolean>
```

Removes the currently applied promocode.

### Checkout Preparation: Options

#### `getOrderSettings`

```ts
zenky.orders.getOrderSettings(storeId: string, credentials: OrderCredentials): Promise<OrderSettings>
```

Returns available checkout options (delivery methods, payment methods, and option metadata).

### Checkout and Redirects

#### `checkoutOrder`

```ts
zenky.orders.checkoutOrder(
  storeId: string,
  credentials: OrderCredentials,
  request: OrderCheckoutRequest,
): Promise<OrderCheckoutResult>
```

Submits the order and returns confirmation and online-payment requirements.

#### `getOrderCheckoutUrl`

```ts
zenky.orders.getOrderCheckoutUrl(
  storeId: string,
  credentials: OrderCredentials,
  redirectUrl?: string,
): Promise<string>
```

Returns checkout page URL for redirect-based flow.

#### `getOnlinePaymentRedirect`

```ts
zenky.orders.getOnlinePaymentRedirect(
  storeId: string,
  credentials: OrderCredentials,
  transactionId: string,
  request?: OnlinePaymentRedirectRequest,
): Promise<OnlinePaymentRedirect | null>
```

Returns a redirect URL for an online payment transaction (if available).

### Totals and Loyalty Calculations

#### `getOrderBonusesPreview`

```ts
zenky.orders.getOrderBonusesPreview(
  storeId: string,
  credentials: OrderCredentials,
  amount: number | string,
): Promise<OrderCheckoutBonusesPreview>
```

Calculates how many bonuses can be applied and what amount remains unpaid.

#### `getOrderTotal`

```ts
zenky.orders.getOrderTotal(storeId: string, credentials: OrderCredentials): Promise<OrderCheckoutTotal>
```

Returns full checkout totals, including discounts, delivery, bonuses, and payments.

### Loyalty Transactions and Rewards

#### `getOrderBonusesTransactions`

```ts
zenky.orders.getOrderBonusesTransactions(
  storeId: string,
  credentials: OrderCredentials,
  request?: ListBonusesTransactionsRequest,
): Promise<PaginatedResponse<BonusesTransaction>>
```

Returns bonus transactions linked to this order.

#### `getOrderCashbackTransaction`

```ts
zenky.orders.getOrderCashbackTransaction(storeId: string, credentials: OrderCredentials): Promise<BonusesTransaction>
```

Returns cashback transaction data for the order.

#### `dispatchPromotionsChecker`

```ts
zenky.orders.dispatchPromotionsChecker(storeId: string, credentials: OrderCredentials): Promise<boolean>
```

Triggers a promotions re-check for the order.

#### `getOrderPromotionRewards`

```ts
zenky.orders.getOrderPromotionRewards(storeId: string, credentials: OrderCredentials): Promise<OrderPromotionReward>
```

Returns calculated promotion rewards for the order.

### Payment Receipts

#### `getCloudpaymentsReceipt`

```ts
zenky.orders.getCloudpaymentsReceipt(
  storeId: string,
  credentials: OrderCredentials,
  transactionId: string,
): Promise<CloudpaymentsTransactionReceipt>
```

Returns CloudPayments receipt data for a transaction.

### Collections

#### `getCollections`

```ts
zenky.collections.getCollections(
  storeId: string,
  request?: CollectionsListRequest,
): Promise<PaginatedResponse<ProductsCollection>>
```

Returns product collections with pagination, search, and ordering.

#### `getCollection`

```ts
zenky.collections.getCollection(storeId: string, id: string): Promise<ProductsCollection>
```

Returns a product collection by ID.

### Offers

#### `getOffers`

```ts
zenky.offers.getOffers(storeId: string, request?: ListRequest): Promise<PaginatedResponse<Offer>>
```

Returns offers list with pagination, search, and optional includes.

#### `getOffer`

```ts
zenky.offers.getOffer(storeId: string, offerId: string, request?: InclusionRequest): Promise<Offer>
```

Returns an offer by ID.

### Articles

#### `getArticleCategories`

```ts
zenky.articles.getArticleCategories(storeId: string): Promise<PaginatedResponse<ArticleCategory>>
```

Returns article categories.

#### `getArticleCategory`

```ts
zenky.articles.getArticleCategory(storeId: string, categoryId: string): Promise<ArticleCategory>
```

Returns an article category by ID.

#### `getArticles`

```ts
zenky.articles.getArticles(storeId: string, request?: ListArticlesRequest): Promise<PaginatedResponse<Article>>
```

Returns articles list (supports filters and pagination).

#### `getArticle`

```ts
zenky.articles.getArticle(storeId: string, articleId: string, request?: InclusionRequest): Promise<Article>
```

Returns an article by ID.

### Feedback

#### `createFeedback`

```ts
zenky.feedback.createFeedback(storeId: string, request: FeedbackRequest): Promise<Feedback>
```

Submits customer feedback.

#### `createCallback`

```ts
zenky.feedback.createCallback(storeId: string, request: CallbackRequest): Promise<boolean>
```

Creates a callback request.

### Loyalty

#### `getBonusesLevels`

```ts
zenky.loyalty.getBonusesLevels(storeId: string): Promise<BonusesLevel[]>
```

Returns available loyalty bonus levels for the store.

## Example IDs Used in This Document

- `storeId`: `7b7f3f8c-2d8d-4f58-9f58-4d8b8a1d6c11`
- `orderId`: `f6d9f5a1-2b44-4f9c-95ae-5ec5f6dcd552`
- `cityId`: `bf6a0ce3-4d99-4c0e-90ec-b8f31fd8bf2f`
- `productId`: `fa2c7082-f4cc-4ff3-b2b8-e8af8fdfebf9`
- `variantId`: `5ad8f329-2c9f-4fef-bc16-c7cbcf9f1fd6`
- `categoryId`: `24fb0e5b-4c8a-4c8d-8051-f4c0703812a0`
- `collectionId`: `cbf21213-81de-4f4a-85d1-6a5af47ecf7e`
- `offerId`: `36bbf4b9-f4bb-4222-9a6e-52df0db5a8db`
- `articleId`: `2f53be16-5a53-4f6f-97c7-4dd182d4c876`
- `articleCategoryId`: `8e160fbf-fef5-4e6b-ac96-7f3480fd9a5e`
- `addressId`: `9dbfe5b7-c9ac-4a97-a2e6-8353eca656f0`
- `paymentMethodId`: `4f8c5fa7-1f5d-4383-b2cc-d909f86f72f9`
- `transactionId`: `3c7ad2d8-0d8e-4259-a7de-c706d2f6f66d`

## Type Index

In the source repository, payload and response types are organized in these files:

- `client/types.ts`
- `types.ts`
- `products/types.ts`
- `orders/types.ts`
- `customers/types.ts`
- `authentication/types.ts`
- `categories/types.ts`
- `collections/types.ts`
- `offers/types.ts`
- `articles/types.ts`
- `feedback/types.ts`
- `loyalty/types.ts`
- `store/types.ts`
- `addresses/types.ts`

Root export note: `src/index.ts` re-exports most public modules, but authentication files are not currently re-exported from the package root. In practice, you can still use authentication methods through `zenky.auth`.

## Appendix: Common Interfaces

These are shared SDK contracts used across multiple resources.

#### `ZenkyError`

Used when an API request fails (non-2xx response).

```ts
class ZenkyError extends Error {
  public readonly err: ApiError | null;
}
```

#### `ApiError`

Used as structured error payload returned by backend APIs.

```ts
interface ApiError {
  message: string;
  original_message: string;
  http_code: number;
  error_code: string;
  meta: any;
}
```

#### `ClientConfig`

Used when creating `new ZenkyStorefront(config)` to control client behavior.

```ts
interface ClientConfig {
  baseUrl?: string;
  baseAuthUrl?: string;
  token?: string;
  client?: string;
  timezone?: string;
  fetchOptions?: any;
}
```

#### `InclusionRequest`

Used in endpoints that support including related entities via `with`.

```ts
interface InclusionRequest {
  with?: string;
}
```

#### `PaginationRequest`

Used for paginated list endpoints to select page and page size.

```ts
interface PaginationRequest {
  count?: number;
  page?: number;
}
```

#### `SearchRequest`

Used in list endpoints that support text search.

```ts
interface SearchRequest {
  search?: string;
}
```

#### `OrderingRequest`

Used in list endpoints that support sorting.

```ts
interface OrderingRequest {
  order_by?: string;
}
```

#### `ListRequest`

Used as a combined base request type for many list endpoints.

```ts
interface ListRequest extends PaginationRequest, InclusionRequest, SearchRequest, OrderingRequest {
  //
}
```

#### `Pagination`

Used in paginated responses to describe current paging state and navigation.

```ts
interface Pagination {
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
```

#### `PaginatedResponse<T>`

Used as the standard return shape for list methods.

```ts
interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}
```

#### `Phone`

Used in response models where a normalized phone object is returned.

```ts
interface Phone {
  number: string;
  country: string;
  national: string;
}
```

#### `PhoneRequest`

Used in request payloads where a phone number is sent to API methods.

```ts
interface PhoneRequest {
  number: string;
  country: string;
}
```

#### `RecaptchaRequest`

Used in request payloads for endpoints protected by reCAPTCHA.

```ts
interface RecaptchaRequest {
  recaptcha?: {
    token: string;
  };
}
```

#### `OrderCredentials`

Used in Orders methods that can be authorized by order ID/token and optionally by customer Bearer token.

```ts
type OrderCredentials =
  | string
  | {
      id: string;
      token: string;
      api_token?: string;
    };
```
