import {AbstractResource} from "../client/resource.ts";
import {
  CloudpaymentsTransactionReceipt,
  ConfirmOrderRequest,
  CreateOrderRequest,
  ListOrdersRequest,
  Order,
  OrderCartCheckerResult,
  OrderCheckoutBonusesPreview,
  OrderCheckoutRequest,
  OrderCheckoutResult,
  OrderCheckoutTotal,
  OrderCredentials,
  OrderProductVariantRequest,
  OrderPromotionReward,
  OrderSettings,
  SetOrderCustomerRequest,
  SetOrderDeliveryRequest,
  SetOrderPaymentsRequest
} from "./types.ts";
import {InclusionRequest, PaginatedResponse} from "../client/types.ts";
import {BonusesTransaction, ListBonusesTransactionsRequest} from "../loyalty/types.ts";

export class OrdersResource extends AbstractResource {
  protected getOrderUrl(storeId: string, credentials: OrderCredentials, path: string, request?: any): string {
    const orderId = typeof credentials === 'string' ? credentials : credentials.id;
    const orderToken = typeof credentials === 'string' ? undefined : credentials.token;

    return this.getStoreUrl(storeId, `/orders/${orderId}${path}${orderToken ? '?token=' + orderToken : ''}`, request);
  }

  protected getApiToken(credentials: OrderCredentials): undefined | string {
    if (typeof credentials === 'string' || typeof credentials.api_token === 'undefined') {
      return undefined;
    }

    return credentials.api_token;
  }

  async getOrders(storeId: string, request?: ListOrdersRequest, apiToken?: string | null): Promise<PaginatedResponse<Order>> {
    const url = this.getStoreUrl(storeId, '/orders', request);

    return this.getPaginatedResponse<Order>(await this.client.request('GET', url, undefined, apiToken));
  }

  async createOrder(storeId: string, request: CreateOrderRequest, apiToken?: string | null): Promise<Order> {
    const url = this.getStoreUrl(storeId, '/orders');

    return this.getResponse(await this.client.request('POST', url, request, apiToken));
  }

  async getOrder(storeId: string, credentials: OrderCredentials, request?: InclusionRequest): Promise<Order> {
    const url = this.getOrderUrl(storeId, credentials, '', request);

    return this.getResponse<Order>(
      await this.client.request('GET', url, undefined, this.getApiToken(credentials))
    );
  }

  async getOrderSettings(storeId: string, credentials: OrderCredentials): Promise<OrderSettings> {
    const url = this.getOrderUrl(storeId, credentials, '/settings');

    return this.getResponse<OrderSettings>(
      await this.client.request('GET', url, undefined, this.getApiToken(credentials))
    );
  }

  async addProductVariantToOrder(
    storeId: string,
    credentials: OrderCredentials,
    request: OrderProductVariantRequest
  ): Promise<Order> {
    const url = this.getOrderUrl(storeId, credentials, '/products');

    return this.getResponse<Order>(
      await this.client.request('POST', url, request, this.getApiToken(credentials))
    );
  }

  async removeProductVariantFromOrder(
    storeId: string,
    credentials: OrderCredentials,
    request: OrderProductVariantRequest
  ): Promise<Order> {
    const url = this.getOrderUrl(storeId, credentials, '/products/remove');

    return this.getResponse<Order>(
      await this.client.request('POST', url, request, this.getApiToken(credentials))
    );
  }

  async checkProducts(
    storeId: string,
    credentials: OrderCredentials,
  ): Promise<OrderCartCheckerResult> {
    const url = this.getOrderUrl(storeId, credentials, '/products/check');

    return this.getResponse<OrderCartCheckerResult>(
      await this.client.request('POST', url, undefined, this.getApiToken(credentials))
    );
  }

  async getOrderCheckoutUrl(storeId: string, credentials: OrderCredentials, redirectUrl?: string): Promise<string> {
    const url = this.getOrderUrl(storeId, credentials, '/checkout/url');

    const response = this.getResponse<{ url: string }>(
      await this.client.request('POST', url, { redirect_url: redirectUrl }, this.getApiToken(credentials))
    );

    return response.url;
  }

  async setOrderCustomer(
    storeId: string,
    credentials: OrderCredentials,
    request: SetOrderCustomerRequest
  ): Promise<boolean> {
    const url = this.getOrderUrl(storeId, credentials, '/checkout/customer');

    await this.client.request('POST', url, request, this.getApiToken(credentials));

    return true;
  }

  async setOrderDeliveryMethod(
    storeId: string,
    credentials: OrderCredentials,
    request: SetOrderDeliveryRequest
  ): Promise<Order> {
    const url = this.getOrderUrl(storeId, credentials, '/checkout/delivery');

    return this.getResponse<Order>(
      await this.client.request('POST', url, request, this.getApiToken(credentials))
    );
  }

  async setOrderPayments(
    storeId: string,
    credentials: OrderCredentials,
    request: SetOrderPaymentsRequest
  ): Promise<Order> {
    const url = this.getOrderUrl(storeId, credentials, '/checkout/payments');

    return this.getResponse<Order>(
      await this.client.request('POST', url, request, this.getApiToken(credentials))
    );
  }

  async getOrderBonusesPreview(
    storeId: string,
    credentials: OrderCredentials,
    amount: number | string
  ): Promise<OrderCheckoutBonusesPreview> {
    const url = this.getOrderUrl(storeId, credentials, `/checkout/payments/bonuses`, { amount });

    return this.getResponse<OrderCheckoutBonusesPreview>(
      await this.client.request('GET', url, undefined, this.getApiToken(credentials))
    );
  }

  async getOrderTotal(
    storeId: string,
    credentials: OrderCredentials,
  ): Promise<OrderCheckoutTotal> {
    const url = this.getOrderUrl(storeId, credentials, `/checkout/total`);

    return this.getResponse<OrderCheckoutTotal>(
      await this.client.request('GET', url, undefined, this.getApiToken(credentials))
    );
  }

  async checkoutOrder(
    storeId: string,
    credentials: OrderCredentials,
    request: OrderCheckoutRequest,
  ): Promise<OrderCheckoutResult> {
    const url = this.getOrderUrl(storeId, credentials, `/checkout`);

    return this.getResponse<OrderCheckoutResult>(
      await this.client.request('POST', url, request, this.getApiToken(credentials))
    );
  }

  async confirmOrder(
    storeId: string,
    credentials: OrderCredentials,
    request: ConfirmOrderRequest
  ): Promise<boolean> {
    const url = this.getOrderUrl(storeId, credentials, `/confirm`);

    await this.client.request('POST', url, request, this.getApiToken(credentials));

    return true;
  }

  async resendOrderConfirmationCode(
    storeId: string,
    credentials: OrderCredentials,
  ): Promise<boolean> {
    const url = this.getOrderUrl(storeId, credentials, `/confirm/resend`);

    await this.client.request('POST', url, undefined, this.getApiToken(credentials));

    return true;
  }

  async getOrderBonusesTransactions(
    storeId: string,
    credentials: OrderCredentials,
    request?: ListBonusesTransactionsRequest
  ): Promise<PaginatedResponse<BonusesTransaction>> {
    const url = this.getOrderUrl(storeId, credentials, `/loyalty/transactions`, request);

    return this.getPaginatedResponse<BonusesTransaction>(
      await this.client.request('GET', url, undefined, this.getApiToken(credentials))
    );
  }

  async getOrderCashbackTransaction(
    storeId: string,
    credentials: OrderCredentials
  ): Promise<BonusesTransaction> {
    const url = this.getOrderUrl(storeId, credentials, `/loyalty/transactions/cashback`);

    return this.getResponse<BonusesTransaction>(
      await this.client.request('GET', url, undefined, this.getApiToken(credentials))
    );
  }

  async dispatchPromotionsChecker(
    storeId: string,
    credentials: OrderCredentials,
  ) {
    const url = this.getOrderUrl(storeId, credentials, `/loyalty/promotions/check`);

    return this.getResponse<{ dispatched: boolean }>(
      await this.client.request('POST', url, undefined, this.getApiToken(credentials))
    ).dispatched;
  }

  async getOrderPromotionRewards(
    storeId: string,
    credentials: OrderCredentials
  ): Promise<OrderPromotionReward> {
    const url = this.getOrderUrl(storeId, credentials, `/loyalty/promotions/rewards`);

    return this.getResponse<OrderPromotionReward>(
      await this.client.request('GET', url, undefined, this.getApiToken(credentials))
    );
  }

  async getCloudpaymentsReceipt(
    storeId: string,
    credentials: OrderCredentials,
    transactionId: string,
  ): Promise<CloudpaymentsTransactionReceipt> {
    const url = this.getOrderUrl(storeId, credentials, `/payments/${transactionId}/receipt`);

    return this.getResponse<CloudpaymentsTransactionReceipt>(
      await this.client.request('GET', url, undefined, this.getApiToken(credentials))
    );
  }
}
