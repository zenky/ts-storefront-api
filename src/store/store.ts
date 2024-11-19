import {AbstractResource} from "../client/resource.ts";
import {Store} from "./types.ts";

export class StoreResource extends AbstractResource {
  async getStore(storeId: string): Promise<Store> {
    const url = this.client.getUrl(`/store/${storeId}`);

    return this.getResponse<Store>(await this.client.request('GET', url));
  }

  async getStoreByBundleId(bundleId: string): Promise<Store> {
    const url = this.client.getUrl(`/store/by-bundle/${bundleId}`);

    return this.getResponse<Store>(await this.client.request('GET', url));
  }
}
