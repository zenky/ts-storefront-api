import { AbstractResource } from "../client/resource.ts";
import { Store, LegalProfile, LegalDocument, MultiBrand } from "./types.ts";

export class StoreResource extends AbstractResource {
  async getStore(storeId: string): Promise<Store> {
    const url = this.client.getUrl(`/store/${storeId}`);

    return this.getResponse<Store>(await this.client.request('GET', url));
  }

  async getStoreByBundleId(bundleId: string): Promise<Store> {
    const url = this.client.getUrl(`/store/by-bundle/${bundleId}`);

    return this.getResponse<Store>(await this.client.request('GET', url));
  }

  async getMultiBrand(storeId: string): Promise<MultiBrand> {
    const url = this.getStoreUrl(storeId, '/multi-brand');

    return this.getResponse<MultiBrand>(await this.client.request('GET', url));
  }

  async getMultiBrandByBundleId(bundleId: string): Promise<MultiBrand> {
    const url = this.client.getUrl(`/store/by-bundle/${bundleId}/multi-brand`);

    return this.getResponse<MultiBrand>(await this.client.request('GET', url));
  }

  async getLegalProfile(storeId: string): Promise<LegalProfile> {
    const url = this.getStoreUrl(storeId, '/legal/profile');

    return this.getResponse<LegalProfile>(await this.client.request('GET', url));
  }

  async getPrivacyPolicy(storeId: string): Promise<LegalDocument> {
    const url = this.getStoreUrl(storeId, '/legal/documents/privacy-policy');

    return this.getResponse<LegalDocument>(await this.client.request('GET', url));
  }

  async getPersonalDataPolicy(storeId: string): Promise<LegalDocument> {
    const url = this.getStoreUrl(storeId, '/legal/documents/personal-data-policy');

    return this.getResponse<LegalDocument>(await this.client.request('GET', url));
  }

  async getEula(storeId: string): Promise<LegalDocument> {
    const url = this.getStoreUrl(storeId, '/legal/documents/eula');

    return this.getResponse<LegalDocument>(await this.client.request('GET', url));
  }

  async getTerms(storeId: string): Promise<LegalDocument> {
    const url = this.getStoreUrl(storeId, '/legal/documents/terms');

    return this.getResponse<LegalDocument>(await this.client.request('GET', url));
  }

  async getPersonalDataAgreement(storeId: string): Promise<LegalDocument> {
    const url = this.getStoreUrl(storeId, '/legal/documents/personal-data-agreement');

    return this.getResponse<LegalDocument>(await this.client.request('GET', url));
  }

  async getLoyaltyRules(storeId: string): Promise<LegalDocument> {
    const url = this.getStoreUrl(storeId, '/legal/documents/loyalty-rules');

    return this.getResponse<LegalDocument>(await this.client.request('GET', url));
  }
}
