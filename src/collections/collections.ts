import {AbstractResource} from "../client/resource.ts";
import {PaginatedResponse} from "../client/types.ts";
import {CollectionsListRequest, ProductsCollection} from "./types.ts";

export class CollectionsResource extends AbstractResource {
  async getCollections(storeId: string, request?: CollectionsListRequest): Promise<PaginatedResponse<ProductsCollection>> {
    const url = this.getStoreUrl(storeId, '/collections', request);

    return this.getPaginatedResponse<ProductsCollection>(await this.client.request('GET', url));
  }

  async getCollection(storeId: string, id: string): Promise<ProductsCollection> {
    const url = this.getStoreUrl(storeId, `/collections/${id}`);

    return this.getResponse<ProductsCollection>(await this.client.request('GET', url));
  }
}
