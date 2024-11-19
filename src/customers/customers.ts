import {AbstractResource} from "../client/resource.ts";
import {
  Customer, CustomerPaymentMethod,
  CustomerSettings, DeliveryAddressRequest,
  RemoveCustomerProfileRequest, ResolverBonusesBalance,
  UpdateCustomerProfileRequest,
  UpdateCustomerSettingsRequest
} from "./types.ts";
import {InclusionRequest, ListRequest, PaginatedResponse, PaginationRequest} from "../client/types.ts";
import {DeliveryAddress} from "../addresses/types.ts";
import {BonusesTransaction, ListCustomerBonusesTransactionsRequest} from "../loyalty/types.ts";

export class CustomersResource extends AbstractResource {
  async getProfile(storeId: string, request?: InclusionRequest, apiToken?: string): Promise<Customer> {
    const url = this.getStoreUrl(storeId, '/me', request);

    return this.getResponse<Customer>(await this.client.request('GET', url, null, apiToken));
  }

  async updateProfile(storeId: string, request: UpdateCustomerProfileRequest, apiToken?: string): Promise<Customer> {
    const url = this.getStoreUrl(storeId, '/me');

    return this.getResponse<Customer>(await this.client.request('PUT', url, request, apiToken));
  }

  async removeProfile(storeId: string, request: RemoveCustomerProfileRequest, apiToken?: string): Promise<boolean> {
    const url = this.getStoreUrl(storeId, '/me');

    await this.client.request('DELETE', url, request, apiToken);

    return true;
  }

  async getSettings(storeId: string, apiToken?: string): Promise<CustomerSettings> {
    const url = this.getStoreUrl(storeId, '/me/settings');

    return this.getResponse<CustomerSettings>(await this.client.request('GET', url, null, apiToken));
  }

  async updateSettings(storeId: string, request: UpdateCustomerSettingsRequest, apiToken?: string): Promise<CustomerSettings> {
    const url = this.getStoreUrl(storeId, '/me/settings');

    return this.getResponse<CustomerSettings>(await this.client.request('PUT', url, request, apiToken));
  }

  async getAddresses(storeId: string, request?: ListRequest, apiToken?: string): Promise<PaginatedResponse<DeliveryAddress>> {
    const url = this.getStoreUrl(storeId, '/me/addresses', request);

    return this.getPaginatedResponse<DeliveryAddress>(await this.client.request('GET', url, null, apiToken));
  }

  async createAddress(storeId: string, request: DeliveryAddressRequest, apiToken?: string): Promise<DeliveryAddress> {
    const url = this.getStoreUrl(storeId, '/me/addresses');

    return this.getResponse<DeliveryAddress>(await this.client.request('POST', url, request, apiToken));
  }

  async updateAddress(storeId: string, addressId: string, request: DeliveryAddressRequest, apiToken?: string): Promise<DeliveryAddress> {
    const url = this.getStoreUrl(storeId, `/me/addresses/${addressId}`);

    return this.getResponse<DeliveryAddress>(await this.client.request('PUT', url, request, apiToken));
  }

  async deleteAddress(storeId: string, addressId: string, apiToken?: string): Promise<boolean> {
    const url = this.getStoreUrl(storeId, `/me/addresses/${addressId}`);

    await this.client.request('DELETE', url, null, apiToken);

    return true;
  }

  async getPaymentMethods(storeId: string, request?: PaginationRequest, apiToken?: string): Promise<PaginatedResponse<CustomerPaymentMethod>> {
    const url = this.getStoreUrl(storeId, '/me/payment-methods', request);

    return this.getPaginatedResponse<CustomerPaymentMethod>(await this.client.request('GET', url, null, apiToken));
  }

  async deletePaymentMethod(storeId: string, paymentMethodId: string, apiToken?: string): Promise<boolean> {
    const url = this.getStoreUrl(storeId, `/me/payment-methods/${paymentMethodId}`);

    await this.client.request('DELETE', url, null, apiToken);

    return true;
  }

  async getBonusesTransactions(storeId: string, request?: ListCustomerBonusesTransactionsRequest, apiToken?: string): Promise<PaginatedResponse<BonusesTransaction>> {
    const url = this.getStoreUrl(storeId, '/me/loyalty/transactions', request);

    return this.getPaginatedResponse<BonusesTransaction>(await this.client.request('GET', url, null, apiToken));
  }

  async getBonusesBalance(storeId: string, apiToken?: string): Promise<ResolverBonusesBalance> {
    const url = this.getStoreUrl(storeId, '/me/loyalty/balance');

    return this.getResponse<ResolverBonusesBalance>(await this.client.request('GET', url, null, apiToken));
  }

  async revokeToken(storeId: string, apiToken?: string): Promise<boolean> {
    const url = this.getStoreUrl(storeId, '/me/logout');

    await this.client.request('POST', url, null, apiToken);

    return true;
  }
}
